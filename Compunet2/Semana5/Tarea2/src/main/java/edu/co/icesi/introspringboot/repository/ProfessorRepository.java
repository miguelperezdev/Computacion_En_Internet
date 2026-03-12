package edu.co.icesi.introspringboot.repository;

import edu.co.icesi.introspringboot.entity.Professor;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProfessorRepository extends CrudRepository<Professor, Long> {

    //2profesores  nombre contenga cadena
    List<Professor> findByNameContainingIgnoreCase(String segment);

    //10Encontrar  todos los profesores
    List<Professor> findByCourses_Enrollments_Student_Program(String program);



}
