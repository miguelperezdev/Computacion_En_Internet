package edu.co.icesi.introspringboot.api.v1.mappers;

import edu.co.icesi.introspringboot.api.v1.dto.CourseRequest;
import edu.co.icesi.introspringboot.api.v1.dto.CourseResponse;
import edu.co.icesi.introspringboot.entity.Course;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CourseMapper {

    @Mapping(source = "professor.name", target = "professorName")
    @Mapping(source = "professor.publicId", target = "professorPublicId")
    CourseResponse toDTO(Course course);

    @Mapping(target = "professor", ignore = true)
    Course toEntity(CourseRequest dto);
}
