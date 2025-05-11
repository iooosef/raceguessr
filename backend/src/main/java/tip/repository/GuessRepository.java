package tip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tip.model.Guess;
import tip.model.Subject;
import tip.model.User;

import java.util.Optional;

public interface GuessRepository extends JpaRepository<Guess, Integer> {
    Optional<Guess> findByUserAndSubject(User user, Subject subject);

    @Query(value = "SELECT SUM(g.score) FROM Guess g " +
            "WHERE g.user.id = :user_id")
    Integer getTotalScoreByUserId(@Param("user_id") Integer user_id);
}
