package tip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tip.model.Guess;
import tip.model.Subject;
import tip.model.User;

import java.util.Optional;

public interface GuessRepository extends JpaRepository<Guess, Integer> {
    Optional<Guess> findByUserAndSubject(User user, Subject subject);
}
