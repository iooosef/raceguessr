package tip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tip.model.Subject;

public interface SubjectRepository extends JpaRepository<Subject, Integer> {
}
