package tip.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Subject")
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Lob
    @Column(nullable = false)
    private byte[] image;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String sourceUrl;

    @Column(nullable = false)
    private Integer difficulty;

    @Column(nullable = false)
    private String addedBy;
}
