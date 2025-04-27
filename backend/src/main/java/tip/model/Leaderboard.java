package tip.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Data
public class Leaderboard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer lb_ID;

    @Column(nullable = false)
    private String lb_category;

    @Column(nullable = false)
    private Integer lb_rank;

    @ManyToOne
    @JoinColumn(name = "usr_ID", nullable = false)
    private User user;
}

