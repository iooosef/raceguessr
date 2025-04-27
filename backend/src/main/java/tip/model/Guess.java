package tip.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Data
public class Guess {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer gss_ID;

    @ManyToOne
    @JoinColumn(name = "subj_ID", nullable = false)
    private Subject subject;

    @ManyToOne
    @JoinColumn(name = "usr_ID", nullable = false)
    private User user;

    @Column(nullable = false)
    private Integer gss_score;

    @Column(nullable = false)
    private String gss_last_updated;
}
