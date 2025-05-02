package tip.model;
import java.io.Serializable;
import lombok.Data;

@Data
public class CountryAdjacentId implements Serializable {
    private Integer id1;
    private Integer id2;
}
