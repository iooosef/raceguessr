package tip.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorResponse {
    private String type;
    private String message;
    private String target;
}
