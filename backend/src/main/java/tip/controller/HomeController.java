package tip.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import tip.model.ErrorResponse;
import tip.model.User;
import tip.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Controller
public class HomeController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{path:[^\\.]*}")
    public String forward() {
        return "forward:/index.html";
    }

    @GetMapping({"/", "/login", "/register"})
    public String home() {
        return "forward:/index.html";
    }

    @GetMapping(value = "/test", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<?> test() {
        return ResponseEntity.ok("Hello World");
    }

    @GetMapping(value = "/me")
    public ResponseEntity<?> getMe(Authentication authentication) {
        if (authentication != null) {
            User user = new User();
            user.setEmail(authentication.getName());
            user.setDisplayName(userRepository.findByEmail(user.getEmail()).get().getDisplayName());
            user.setRole(authentication.getAuthorities().toString());
            return ResponseEntity.ok(user);
        }

        List<ErrorResponse> errors = new ArrayList<>();
        ErrorResponse error = new ErrorResponse();
        error.setType(HttpStatus.UNAUTHORIZED.name());
        error.setMessage("User not authenticated");
        error.setType("model");
        errors.add(error);
        return ResponseEntity.status(401).body(errors);
    }
}