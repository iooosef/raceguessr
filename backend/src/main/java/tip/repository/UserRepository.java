package tip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tip.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String usr_email);
}
