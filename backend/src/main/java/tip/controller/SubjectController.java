package tip.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tip.model.ErrorResponse;
import tip.model.Subject;
import tip.repository.SubjectCountryRepository;
import tip.repository.SubjectRepository;

import java.util.Optional;

@RestController
@RequestMapping("/subjects")
public class SubjectController {
    @Autowired
    SubjectRepository subjectRepository;
    @Autowired
    SubjectCountryRepository subjectCountryRepository;

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getSubjectById(@RequestParam Integer id) {
        ErrorResponse errorResponse = new ErrorResponse();
        Optional<Subject> subject = subjectRepository.findById(id);
        if (!subject.isPresent()) {
            errorResponse.setMessage(HttpStatus.NOT_FOUND.name());
            errorResponse.setMessage("Subject not found");
            errorResponse.setTarget("model");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
        return ResponseEntity.ok(subject.get());
    }

    @GetMapping(value = "/country-count", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCountryCountOfSubjectById(@RequestParam Integer id) {
        ErrorResponse errorResponse = new ErrorResponse();
        Optional<Subject> subject = subjectRepository.findById(id);
        if (!subject.isPresent()) {
            errorResponse.setMessage(HttpStatus.NOT_FOUND.name());
            errorResponse.setMessage("Subject not found");
            errorResponse.setTarget("model");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
        int count = subjectCountryRepository.countBySubject(id);
        return ResponseEntity.ok(count);
    }
}
