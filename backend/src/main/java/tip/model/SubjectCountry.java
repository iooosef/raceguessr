package tip.model;

import jakarta.persistence.*;

@Entity
@IdClass(SubjectCountryId.class)
public class SubjectCountry {
    @Id
    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @Id
    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;
}
