package tip.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GuessRequest {
    private List<Integer> country_ids;
    private Integer subject_id;
}
