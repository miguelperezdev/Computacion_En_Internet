package edu.co.icesi.introspringboot.api.v1.mappers;

import edu.co.icesi.introspringboot.api.v1.dto.ProfessorRequest;
import edu.co.icesi.introspringboot.api.v1.dto.ProfessorResponse;
import edu.co.icesi.introspringboot.entity.Professor;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProfessorMapper {

    ProfessorResponse toDTO(Professor professor);

    Professor toEntity(ProfessorRequest dto);
}
