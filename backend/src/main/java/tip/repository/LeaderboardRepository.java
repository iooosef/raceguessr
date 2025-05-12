package tip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import tip.model.User;
import tip.model.dto.LeaderboardEntry;

import java.util.List;

public interface LeaderboardRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT * FROM leaderboards", nativeQuery = true)
    List<LeaderboardEntry> getAllLeaderboard();

    @Query(value = "SELECT * FROM leaderboards WHERE display_name = :displayName", nativeQuery = true)
    LeaderboardEntry getLeaderboardByDisplayName(@Param("displayName") String displayName);
}

