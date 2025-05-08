package tip.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class SubjectCountryId implements Serializable {
    private Subject subject;
    private Country country;
}
