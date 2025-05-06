package tip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tip.model.CountryAdjacent;

@Repository
public interface CountryAdjacentRepository extends JpaRepository<CountryAdjacent, Integer> {

}
