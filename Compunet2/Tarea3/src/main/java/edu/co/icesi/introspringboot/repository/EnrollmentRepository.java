package edu.co.icesi.introspringboot.repository;

import edu.co.icesi.introspringboot.entity.Course;
import edu.co.icesi.introspringboot.entity.Enrollment;
import edu.co.icesi.introspringboot.entity.Student;
import edu.co.icesi.introspringboot.entity.keys.StudentCourseId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface EnrollmentRepository extends JpaRepository<Enrollment, StudentCourseId> {

    boolean existsByStudentAndCourse(Student student, Course course);

    Optional<Enrollment> findByPublicId(UUID publicId);

    boolean existsByPublicId(UUID publicId);

    Optional<Enrollment> findByStudentAndCourse(Student student, Course course);
}
