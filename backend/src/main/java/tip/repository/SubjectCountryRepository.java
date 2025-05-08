package tip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tip.model.SubjectCountry;

public interface SubjectCountryRepository extends JpaRepository<SubjectCountry, Integer> {
    @Query("SELECT COUNT(sc) FROM SubjectCountry sc " +
            "WHERE sc.subject.id = :subj_id")
    int countBySubject(@Param("subj_id") int subj_id);
}
