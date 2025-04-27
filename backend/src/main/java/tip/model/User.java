package tip.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer usr_ID;

    @Column(nullable = false, unique = true)
    private String usr_email;

    @Column(nullable = false, unique = true)
    private String usr_display_name;

    @Column(nullable = false)
    private String usr_password;

    @Column(nullable = false)
    private String usr_gender;

    @ManyToOne
    @JoinColumn(name = "cnt_ID", nullable = false)
    private Country country;

    private String usr_ethnicity;
}
