package edu.co.icesi.introspringboot.repository;

import edu.co.icesi.introspringboot.entity.Professor;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProfessorRepository extends CrudRepository<Professor, Integer> {

    Optional<Professor> findByPublicId(UUID publicId);

    boolean existsByPublicId(UUID publicId);

    List<Professor> findByNameContainingIgnoreCase(String segment);

}
