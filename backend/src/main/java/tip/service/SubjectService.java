package tip.service;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import tip.model.Subject;
import tip.model.dto.SubjectDifficulty;
import tip.repository.SubjectRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubjectService {
    private final SubjectRepository subjectRepository;

    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    public List<SubjectDifficulty> getTenSubjectIDs(Integer user_Id) {
        List<Subject> undone = subjectRepository
            .findRandomSubjectsUnansweredBy(user_Id, PageRequest.of(0, 10));
        int remaining = 10 - undone.size();
        if (remaining > 0) {
            List<Subject> done = subjectRepository
                    .findRandomSubjectsAnsweredBy(user_Id, PageRequest.of(0, remaining));
            undone.addAll(done);
        }
        // only the id and difficulty
        return undone.stream()
                .map(s -> new SubjectDifficulty(s.getId(), s.getDifficulty()))
                .collect(Collectors.toList());
    }
}
