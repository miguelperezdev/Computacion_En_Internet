package edu.co.icesi.introspringboot.entity;

import edu.co.icesi.introspringboot.entity.keys.StudentCourseId;
import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "student_course")
public class Enrollment {

    @EmbeddedId
    private StudentCourseId id;

    @Column(name = "public_id", nullable = false, unique = true, columnDefinition = "UUID DEFAULT RANDOM_UUID()")
    private UUID publicId;

    @ManyToOne
    @MapsId("studentId")
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @MapsId("courseId")
    @JoinColumn(name = "course_id")
    private Course course;

    @PrePersist
    public void ensurePublicId() {
        if (publicId == null) {
            publicId = UUID.randomUUID();
        }
    }

    public StudentCourseId getId() { return id; }
    public void setId(StudentCourseId id) { this.id = id; }
    public UUID getPublicId() { return publicId; }
    public void setPublicId(UUID publicId) { this.publicId = publicId; }
    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
}
