package tip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tip.model.Guess;

public interface GuessRepository extends JpaRepository<Guess, Integer> {
}
