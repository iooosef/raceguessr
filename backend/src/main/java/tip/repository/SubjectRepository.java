package tip.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tip.model.Subject;
import tip.model.Tag;

import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject, Integer> {
    @Query("SELECT s FROM Subject s " +
            "WHERE s.id NOT IN (" +
            "SELECT g.subject.id FROM Guess g WHERE g.user.id = :user_id) " +
            "ORDER BY RANDOM()")
    List<Subject> findRandomSubjectsUnansweredBy(@Param("user_id") Long userId, Pageable pageable);

    @Query("SELECT s FROM Subject s " +
            "WHERE s.id IN (" +
            "SELECT g.subject.id FROM Guess g WHERE g.user.id = :user_id) " +
            "ORDER BY RANDOM()")
    List<Subject> findRandomSubjectsAnsweredBy(@Param("user_id") Long userId, Pageable pageable);

    List<Subject> findSubjectByTag(Tag tag);
}
