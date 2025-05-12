package tip.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import tip.model.User;
import tip.model.dto.LeaderboardEntry;
import tip.repository.GuessRepository;
import tip.repository.LeaderboardRepository;
import tip.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/leaderboards")
public class LeaderboardsController {
    @Autowired
    GuessRepository guessRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    LeaderboardRepository leaderboardRepository;

    // url usage: localhost:8080/leaderboards?page=0&size=10
    @RequestMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllLeaderboards() {
        // Fetch the paginated UserScores from the repository
        List<LeaderboardEntry> leaderboards = leaderboardRepository.getAllLeaderboard();

        // Return the processed UserScores with proper rank and currentUser flag
        return new ResponseEntity<>(leaderboards, HttpStatus.OK);
    }

    @RequestMapping(value = "/me", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCurrentLeaderboard(Authentication authentication) {
        // Fetch the current user from the authentication
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        LeaderboardEntry lbCurrent = leaderboardRepository.getLeaderboardByDisplayName(authentication.getName());
        return lbCurrent == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(lbCurrent);
    }
}
