package tip.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import tip.model.ErrorResponse;
import tip.model.User;

import java.util.ArrayList;
import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class HomeController {
    @GetMapping(name = "/test", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<?> test() {
        return ResponseEntity.ok("Hello World");
    }

    @GetMapping(name = "/me", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMe(Authentication authentication) {
        if (authentication != null) {
            User user = new User();
            user.setEmail(authentication.getName());
            user.setRole(authentication.getAuthorities().toString());
            return ResponseEntity.ok(user);
        }

        List<ErrorResponse> errors = new ArrayList<>();
        ErrorResponse error = new ErrorResponse();
        error.setType("authentication_error");
        error.setMessage("User not authenticated");
        error.setType("model");
        errors.add(error);
        return ResponseEntity.status(401).body(errors);
    }
}
