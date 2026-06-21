package edu.co.icesi.introspringboot.service.impl;

import edu.co.icesi.introspringboot.api.v1.dto.ProfessorRequest;
import edu.co.icesi.introspringboot.api.v1.dto.ProfessorResponse;
import edu.co.icesi.introspringboot.api.v1.mappers.ProfessorMapper;
import edu.co.icesi.introspringboot.entity.Professor;
import edu.co.icesi.introspringboot.repository.ProfessorRepository;
import edu.co.icesi.introspringboot.service.ProfessorService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProfessorServiceImpl implements ProfessorService {

    private final ProfessorRepository professorRepository;
    private final ProfessorMapper professorMapper;

    public ProfessorServiceImpl(ProfessorRepository professorRepository, ProfessorMapper professorMapper) {
        this.professorRepository = professorRepository;
        this.professorMapper = professorMapper;
    }

    @Override
    @PreAuthorize("hasAuthority('CREATE_PROFESSOR')")
    public Professor saveProfessor(Professor professor) {
        return professorRepository.save(professor);
    }

    @Override
    @PreAuthorize("hasAuthority('READ_PROFESSOR')")
    public List<Professor> findAll() {
        List<Professor> result = new ArrayList<>();
        professorRepository.findAll().forEach(result::add);
        return result;
    }

    @Override
    @PreAuthorize("hasAuthority('READ_PROFESSOR')")
    public Optional<Professor> findById(Integer id) {
        return professorRepository.findById(id);
    }

    @Override
    @PreAuthorize("hasAuthority('READ_PROFESSOR')")
    public Optional<Professor> findByPublicId(UUID publicId) {
        return professorRepository.findByPublicId(publicId);
    }

    @Override
    @PreAuthorize("hasAuthority('DELETE_PROFESSOR')")
    public void deleteById(Integer id) {
        professorRepository.deleteById(id);
    }

    @Override
    @PreAuthorize("hasAuthority('DELETE_PROFESSOR')")
    public void deleteByPublicId(UUID publicId) {
        professorRepository.findByPublicId(publicId).ifPresent(professorRepository::delete);
    }

    @Override
    public List<ProfessorResponse> findAllAPI() {
        return findAll().stream()
                .map(professorMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProfessorResponse findByPublicIdAPI(UUID publicId) {
        return findByPublicId(publicId)
                .map(professorMapper::toDTO)
                .orElse(null);
    }

    @Override
    public ProfessorResponse saveAPI(ProfessorRequest request) {
        Professor professor = professorMapper.toEntity(request);
        return professorMapper.toDTO(saveProfessor(professor));
    }

    @Override
    public ProfessorResponse updateAPI(UUID publicId, ProfessorRequest request) {
        return professorRepository.findByPublicId(publicId)
                .map(professor -> {
                    professor.setName(request.getName());
                    return professorMapper.toDTO(professorRepository.save(professor));
                })
                .orElse(null);
    }
}
