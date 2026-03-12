package edu.co.icesi.introspringboot.repository;

import edu.co.icesi.introspringboot.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository
        extends JpaRepository<Student, Integer> {

    // 1 estudiante por su code
    Optional<Student> findByCode(String code);

    // 4 estudiantes de un programa
    List<Student> findByProgram(String program);

    //7  estudiantes de un programa que codigo empiece por un prefijo dado.
    List<Student> getStudentsByCodeStartingWith(String code);

    //9 estudiantes que cursan materias con un profesor.
    List<Student> findByEnrollments_Course_Professor_Name(String name);


}