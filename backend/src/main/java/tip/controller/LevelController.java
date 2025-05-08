package tip.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tip.model.User;
import tip.model.dto.SubjectDifficulty;
import tip.repository.SubjectRepository;
import tip.repository.TagRepository;
import tip.repository.UserRepository;
import tip.service.SortService;
import tip.service.SubjectService;

import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/levels")
public class LevelController {
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    SubjectRepository subjectRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    SubjectService subjectService;
    @Autowired
    SortService sortService;

    @RequestMapping(value = "/data/tags", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllTags() {
        return ResponseEntity.ok(tagRepository.findAll());
    }

    @RequestMapping(value = "/quickplay", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getQuickPlay(Sort sort) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).get();
        int user_Id = user.getId();

        List<SubjectDifficulty> quickplayRounds = subjectService.getTenSubjectIDs((long) user_Id);
        sortService.mergeSort(quickplayRounds, Comparator.comparingInt(SubjectDifficulty::getDifficulty));
        return ResponseEntity.ok(quickplayRounds);
    }

}
