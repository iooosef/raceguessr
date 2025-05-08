package tip.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tip.model.Country;
import tip.model.ErrorResponse;
import tip.model.User;
import tip.model.dto.LoginRequest;
import tip.model.dto.RegisterRequest;
import tip.repository.CountryRepository;
import tip.repository.UserRepository;

import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CountryRepository countryRepository;

    @RequestMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest model,
                                              HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse();
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            model.getEmail(),
                            model.getPassword()
                    )
            );
            SecurityContext securityContext = SecurityContextHolder.getContext();
            securityContext.setAuthentication(authentication);

            HttpSession session = request.getSession(true);
            session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, securityContext);

            String role = authentication.getAuthorities().stream().findFirst().get().getAuthority();
            String loginTimeStamp = java.time.LocalDateTime.now().toString();

            HashMap<String, String> response = new HashMap<>();
            response.put("email", model.getEmail());
            response.put("role", role);
            response.put("displayName", userRepository.findByEmail(model.getEmail()).get().getDisplayName());
            response.put("loginTimeStamp", loginTimeStamp);
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            errorResponse.setType(HttpStatus.BAD_REQUEST.name());
            errorResponse.setMessage("Invalid email or password");
            errorResponse.setTarget("model");
        } catch (AuthenticationException e) {
            errorResponse.setType(HttpStatus.BAD_REQUEST.name());
            errorResponse.setMessage("Authentication failed");
            errorResponse.setTarget("model");
        } catch (Exception e) {
            errorResponse.setType(HttpStatus.INTERNAL_SERVER_ERROR.name());
            errorResponse.setMessage("An unexpected error occurred");
            errorResponse.setTarget("model");
        }
        HttpStatus status = HttpStatus.valueOf(errorResponse.getType());
        return ResponseEntity.status(status).body(errorResponse);
    }

    @RequestMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest model) {
        HashMap<String, String> response = new HashMap<>();
        ErrorResponse errorResponse = new ErrorResponse();
        boolean isUserExisting = userRepository.findByEmail(model.getEmail()).isPresent();

        if (isUserExisting) {
            errorResponse.setType(HttpStatus.CONFLICT.name());
            errorResponse.setMessage("User already exists");
            errorResponse.setTarget("model");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        }
        Optional<Country> country = countryRepository.findById(model.getCountry());

        User user = new User();
        user.setEmail(model.getEmail());
        user.setDisplayName(model.getDisplayName());
        user.setPassword(passwordEncoder.encode(model.getPassword()));
        user.setRole("USER");
        user.setGender(model.getGender());
        user.setCountry(country.isPresent() ? country.get() : countryRepository.findById(85).get());

        // Save the user to the database
        userRepository.save(user);

        response.put("email", user.getEmail());
        response.put("displayName", user.getDisplayName());
        response.put("role", user.getRole());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
