package tip.model;
import java.io.Serializable;
import lombok.Data;

@Data
public class CountryAdjacentId implements Serializable {
    private Integer cnt_ID_1;
    private Integer cnt_ID_2;
}
