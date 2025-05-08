package tip.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tip.repository.SubjectRepository;
import tip.repository.TagRepository;

@RestController
@RequestMapping("/levels")
public class LevelController {
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    SubjectRepository subjectRepository;

    @RequestMapping(value = "/data/tags", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllTags() {
        return ResponseEntity.ok(tagRepository.findAll());
    }
}
