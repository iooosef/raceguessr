package tip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tip.model.Subject;
import tip.model.SubjectCountry;

import java.util.List;

public interface SubjectCountryRepository extends JpaRepository<SubjectCountry, Integer> {
    @Query(value = "SELECT COUNT(sc) FROM SubjectCountry sc " +
            "WHERE sc.subject.id = :subj_id")
    int countBySubject(@Param("subj_id") int subj_id);

    @Query(value = "SELECT sc FROM SubjectCountry sc " +
            "WHERE sc.subject.id = :id")
    List<SubjectCountry> getAnswers(@Param("id") int id);

    List<SubjectCountry> findBySubject_Id(Long subjectId);
}
