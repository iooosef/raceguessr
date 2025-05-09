package tip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tip.model.Country;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface CountryRepository extends JpaRepository<Country, Integer> {
    Optional<Country> findByName(String name);

    @Query("SELECT CASE WHEN c1.continent = c2.continent THEN true ELSE false END " +
            "FROM Country c1, Country c2 " +
            "WHERE c1.id = :id1 AND c2.id = :id2")
    Boolean isSameContinent(@Param("id1") Long id1, @Param("id2") Long id2);

    @Query("SELECT CASE WHEN c1.region = c2.region THEN true ELSE false END " +
            "FROM Country c1, Country c2 " +
            "WHERE c1.id = :id1 AND c2.id = :id2")
    Boolean isSameRegion(@Param("id1") Long id1, @Param("id2") Long id2);
}
