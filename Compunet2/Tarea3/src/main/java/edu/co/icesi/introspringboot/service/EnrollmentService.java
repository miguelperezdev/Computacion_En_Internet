package edu.co.icesi.introspringboot.service;

import edu.co.icesi.introspringboot.entity.Enrollment;
import edu.co.icesi.introspringboot.entity.keys.StudentCourseId;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EnrollmentService {

    Enrollment enroll(Integer courseId, Integer studentId);

    void enrollWithFailure(Integer studentId, Integer courseId);

    void createCourseWithNewProfessor(String courseName);

    Enrollment save(Enrollment enrollment);

    List<Enrollment> findAll();

    Optional<Enrollment> findById(StudentCourseId id);

    Optional<Enrollment> findByPublicId(UUID publicId);

    void deleteById(StudentCourseId id);
}
