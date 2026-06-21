package edu.co.icesi.introspringboot.service;

import edu.co.icesi.introspringboot.api.v1.dto.ProfessorRequest;
import edu.co.icesi.introspringboot.api.v1.dto.ProfessorResponse;
import edu.co.icesi.introspringboot.entity.Professor;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProfessorService {

    Professor saveProfessor(Professor professor);

    List<Professor> findAll();

    Optional<Professor> findById(Integer id);

    Optional<Professor> findByPublicId(UUID publicId);

    void deleteById(Integer id);

    void deleteByPublicId(UUID publicId);

    // API methods
    List<ProfessorResponse> findAllAPI();
    ProfessorResponse findByPublicIdAPI(UUID publicId);
    ProfessorResponse saveAPI(ProfessorRequest request);
    ProfessorResponse updateAPI(UUID publicId, ProfessorRequest request);
}
