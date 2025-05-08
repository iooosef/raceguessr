package tip.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubjectDifficulty {
    private Integer id;
    private Integer difficulty;

    public SubjectDifficulty(Integer id, Integer difficulty) {
        this.id = id;
        this.difficulty = difficulty;
    }
}
