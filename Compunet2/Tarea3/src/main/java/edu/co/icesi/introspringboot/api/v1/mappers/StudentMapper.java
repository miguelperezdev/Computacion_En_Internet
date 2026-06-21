package edu.co.icesi.introspringboot.api.v1.mappers;

import edu.co.icesi.introspringboot.api.v1.dto.StudentRequest;
import edu.co.icesi.introspringboot.api.v1.dto.StudentResponse;
import edu.co.icesi.introspringboot.entity.Student;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StudentMapper {

    StudentResponse toDTO(Student student);

    Student toEntity(StudentRequest dto);
}
