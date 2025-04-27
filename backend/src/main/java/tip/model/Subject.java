package tip.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Data
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer subj_ID;

    @Lob
    @Column(nullable = false)
    private byte[] subj_image;

    @Column(nullable = false)
    private String subj_category;

    @Column(nullable = false)
    private String subj_source;

    @Column(nullable = false)
    private Integer subj_difficulty;

    @Column(nullable = false)
    private String subj_added_by;
}
