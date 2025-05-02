package tip.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@IdClass(CountryAdjacentId.class)
@Table(name = "CountryAdjacent")
public class CountryAdjacent {
    @Id
    private Integer id1;

    @Id
    private Integer id2;

    @ManyToOne
    @JoinColumn(name = "id1", insertable = false, updatable = false)
    private Country country1;

    @ManyToOne
    @JoinColumn(name = "id2", insertable = false, updatable = false)
    private Country country2;
}
