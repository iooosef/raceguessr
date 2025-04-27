package tip.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Data
@IdClass(CountryAdjacentId.class)
public class CountryAdjacent {
    @Id
    private Integer cnt_ID_1;

    @Id
    private Integer cnt_ID_2;

    @ManyToOne
    @JoinColumn(name = "cnt_ID_1", insertable = false, updatable = false)
    private Country country1;

    @ManyToOne
    @JoinColumn(name = "cnt_ID_2", insertable = false, updatable = false)
    private Country country2;
}
