package edu.co.icesi.introspringboot.service;

import edu.co.icesi.introspringboot.entity.Enrollment;
import edu.co.icesi.introspringboot.entity.Student;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface StudentService {

    Student findStudentByCode(String code);

    List<Student> getStudentsByCourseName(String courseName);

    void deleteStudentByCode(String code);

    Enrollment enrollStudentInCourse(String studentCode, String courseName);

    void unenrollStudentFromCourse(String studentCode, String courseName);

    Student save(Student student);

    List<Student> findAll();

    Optional<Student> findById(Integer id);

    Optional<Student> findByPublicId(UUID publicId);

    void deleteById(Integer id);

    void deleteByPublicId(UUID publicId);
}
