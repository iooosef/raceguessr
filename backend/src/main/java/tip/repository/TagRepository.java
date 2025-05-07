package tip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tip.model.Tag;

public interface TagRepository extends JpaRepository<Tag, Integer> {
}
