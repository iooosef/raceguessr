package tip.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tip.model.*;
import tip.model.dto.GuessRequest;
import tip.model.dto.GuessResponse;
import tip.repository.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/guess")
public class GuessController {
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private SubjectCountryRepository subjectCountryRepository;
    @Autowired
    private GuessRepository guessRepository;
    @Autowired
    private CountryRepository countryRepository;
    private final Integer FULL_SCORE = 5000;
    private final Integer REGION_SCORE = 1250;
    private final Integer CONTINENT_SCORE = 625;
    @Autowired
    private UserRepository userRepository;

    @PostMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> checkGuess(@RequestBody GuessRequest guess,
                                        Authentication authentication) {
        ErrorResponse errRes = new ErrorResponse();
        // validate subject_id
        if (guess.getSubject_id() == null) {
            errRes.setType(HttpStatus.BAD_REQUEST.name());
            errRes.setMessage("Subject id is required");
            errRes.setTarget("model");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errRes);
        }
        Optional<Subject> subject = subjectRepository.findById(guess.getSubject_id());
        if (!subject.isPresent()) {
            errRes.setType(HttpStatus.NOT_FOUND.name());
            errRes.setMessage("Subject does not exist");
            errRes.setTarget("model");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errRes);
        }
        // check if guesses is correct
        List<SubjectCountry> correctCountries = subjectCountryRepository.findBySubject_Id(guess.getSubject_id().longValue());
        List<Country> correctCountriesONLY = correctCountries.stream()
                .map(SubjectCountry::getCountry)
                .toList();
        List<Integer> correctCountryIds = correctCountries.stream()
                .map(sc -> sc.getCountry().getId().intValue())
                .collect(Collectors.toList());
        int answersCount = correctCountryIds.size();
        // validate guess if guesses count match the answers count
        if (guess.getCountry_ids().size() != answersCount) {
            errRes.setType(HttpStatus.BAD_REQUEST.name());
            errRes.setMessage("Number of guesses doesn't match the number of correct answers.");
            errRes.setTarget("model");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errRes);
        }
        boolean isEqual = new HashSet<Integer>(correctCountryIds).equals(new HashSet<>(guess.getCountry_ids()));

        Integer score = isEqual ? FULL_SCORE : 0;
        if (!isEqual) {
            for (var guessID : guess.getCountry_ids()) {
                for (var answerID : correctCountryIds) {
                    if (guessID.equals(answerID)) {
                        score += FULL_SCORE / answersCount;
                    } else if (countryRepository.isSameRegion(guessID.longValue(), answerID.longValue())) {
                        score += REGION_SCORE / answersCount;
                        score += CONTINENT_SCORE / answersCount;
                    } else if (countryRepository.isSameContinent(guessID.longValue(), answerID.longValue())) {
                        score += CONTINENT_SCORE / answersCount;
                    }
                }
            }
        }

        // save to DB Guess before returning response
        Guess guessAttempt = new Guess();
        User user = userRepository.findByEmail(authentication.getName()).get();
        guessAttempt.setUser(user);
        guessAttempt.setSubject(subject.get());
        guessAttempt.setScore(score);
        String timestamp = java.time.LocalDateTime.now().toString();
        guessAttempt.setLastUpdateOn(timestamp);
        saveOrUpdateGuess(guessAttempt);

        // response
        GuessResponse response = new GuessResponse();
        response.setIsCorrect(isEqual);
        response.setScore(score > 5000 ? 5000 : score);
        response.setCorrect_countries(correctCountriesONLY);
        return ResponseEntity.ok(response);
    }

    private Guess saveOrUpdateGuess(Guess guess) {
        Optional<Guess> existing = guessRepository.findByUserAndSubject(guess.getUser(), guess.getSubject());
        String timestamp = java.time.LocalDateTime.now().toString();
        if (existing.isPresent()) {
            Guess existingGuess = existing.get();
            int higherScore = existingGuess.getScore() > guess.getScore() ? existingGuess.getScore() : guess.getScore();
            existingGuess.setScore(guess.getScore());
            existingGuess.setLastUpdateOn(timestamp);
            return guessRepository.save(existingGuess);
        }
        return guessRepository.save(guess);
    }
}
