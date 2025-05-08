package tip.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tip.model.ErrorResponse;
import tip.model.dto.LoginRequest;
import tip.repository.UserRepository;

import java.util.HashMap;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

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
            response.put("loginTimeStamp", loginTimeStamp);
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            errorResponse.setType("authentication_error");
            errorResponse.setMessage("Invalid email or password");
            errorResponse.setTarget("model");
        } catch (AuthenticationException e) {
            errorResponse.setType("authentication_error");
            errorResponse.setMessage("Authentication failed");
            errorResponse.setTarget("model");
        } catch (Exception e) {
            errorResponse.setType("server_error");
            errorResponse.setMessage("An unexpected error occurred");
            errorResponse.setTarget("model");
        }
        HttpStatus status = HttpStatus.valueOf(errorResponse.getType());
        return ResponseEntity.status(status).body(errorResponse);
    }

//    @RequestMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
}
