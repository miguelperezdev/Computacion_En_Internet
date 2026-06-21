package edu.co.icesi.introspringboot.service.impl;

import edu.co.icesi.introspringboot.entity.Course;
import edu.co.icesi.introspringboot.entity.Enrollment;
import edu.co.icesi.introspringboot.entity.Student;
import edu.co.icesi.introspringboot.entity.keys.StudentCourseId;
import edu.co.icesi.introspringboot.repository.CourseRepository;
import edu.co.icesi.introspringboot.repository.EnrollmentRepository;
import edu.co.icesi.introspringboot.repository.StudentRepository;
import edu.co.icesi.introspringboot.service.StudentService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    public StudentServiceImpl(StudentRepository studentRepository,
                              CourseRepository courseRepository,
                              EnrollmentRepository enrollmentRepository) {
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    @Override
    @PreAuthorize("hasAuthority('READ_STUDENT')")
    public Student findStudentByCode(String code) {
        if (code == null || code.isBlank()) {
            throw new IllegalArgumentException("El código no puede ser nulo o vacío");
        }
        return studentRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Estudiante no encontrado: " + code));
    }

    @Override
    @PreAuthorize("hasAuthority('READ_STUDENT')")
    public List<Student> getStudentsByCourseName(String courseName) {
        if (!courseRepository.existsByName(courseName)) {
            throw new RuntimeException("Curso no encontrado: " + courseName);
        }
        return studentRepository.findByStudentCourses_Course_Name(courseName);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAnyAuthority('DELETE_STUDENT')")
    public void deleteStudentByCode(String code) {
        Student student = studentRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Estudiante no encontrado: " + code));
        studentRepository.delete(student);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CREATE_ENROLLMENT')")
    public Enrollment enrollStudentInCourse(String studentCode, String courseName) {
        Student student = studentRepository.findByCode(studentCode)
                .orElseThrow(() -> new RuntimeException("Estudiante no encontrado: " + studentCode));
        Course course = courseRepository.findByName(courseName)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado: " + courseName));
        if (enrollmentRepository.existsByStudentAndCourse(student, course)) {
            throw new IllegalStateException("El estudiante ya está inscrito en este curso");
        }
        StudentCourseId id = new StudentCourseId();
        id.setStudentId(student.getId());
        id.setCourseId(course.getId());
        Enrollment enrollment = new Enrollment();
        enrollment.setId(id);
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        return enrollmentRepository.save(enrollment);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('DELETE_ENROLLMENT')")
    public void unenrollStudentFromCourse(String studentCode, String courseName) {
        Student student = studentRepository.findByCode(studentCode)
                .orElseThrow(() -> new RuntimeException("Estudiante no encontrado: " + studentCode));
        Course course = courseRepository.findByName(courseName)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado: " + courseName));
        Enrollment enrollment = enrollmentRepository.findByStudentAndCourse(student, course)
                .orElseThrow(() -> new RuntimeException("El estudiante no está inscrito en este curso"));
        enrollmentRepository.delete(enrollment);
    }

    @Override
    @PreAuthorize("hasAuthority('CREATE_STUDENT')")
    public Student save(Student student) {
        return studentRepository.save(student);
    }

    @Override
    @PreAuthorize("hasAuthority('READ_STUDENT')")
    public List<Student> findAll() {
        List<Student> result = new ArrayList<>();
        studentRepository.findAll().forEach(result::add);
        return result;
    }

    @Override
    @PreAuthorize("hasAuthority('READ_STUDENT')")
    public Optional<Student> findById(Integer id) {
        return studentRepository.findById(id);
    }

    @Override
    @PreAuthorize("hasAuthority('READ_STUDENT')")
    public Optional<Student> findByPublicId(UUID publicId) {
        return studentRepository.findByPublicId(publicId);
    }

    @Override
    @PreAuthorize("hasAuthority('DELETE_STUDENT')")
    public void deleteById(Integer id) {
        studentRepository.deleteById(id);
    }

    @Override
    @PreAuthorize("hasAuthority('DELETE_STUDENT')")
    public void deleteByPublicId(UUID publicId) {
        studentRepository.findByPublicId(publicId).ifPresent(studentRepository::delete);
    }
}
