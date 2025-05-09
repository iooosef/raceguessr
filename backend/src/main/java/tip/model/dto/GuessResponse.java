package tip.model.dto;

import lombok.Getter;
import lombok.Setter;
import tip.model.Country;

import java.util.List;

@Getter
@Setter
public class GuessResponse {
    private Boolean isCorrect;
    private Integer score;
    private List<Country> correct_countries;
}
