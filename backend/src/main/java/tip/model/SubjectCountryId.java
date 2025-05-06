package tip.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class SubjectCountryId implements Serializable {
    private Long subject;
    private Long country;
}
