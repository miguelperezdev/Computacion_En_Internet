package edu.co.icesi.introspringboot.api.v1.dto;

import lombok.*;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseResponse {
    private UUID publicId;
    private String name;
    private int credits;
    private String professorName;
    private UUID professorPublicId;
}
