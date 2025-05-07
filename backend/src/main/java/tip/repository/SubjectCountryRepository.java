package tip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tip.model.SubjectCountry;

public interface SubjectCountryRepository extends JpaRepository<SubjectCountry, Integer> {
}
