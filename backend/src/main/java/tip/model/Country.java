package tip.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Data
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cnt_ID;

    @Column(nullable = false)
    private String cnt_name;

    @Column(nullable = false)
    private String cnt_region;

    @Column(nullable = false)
    private String cnt_continent;
}
