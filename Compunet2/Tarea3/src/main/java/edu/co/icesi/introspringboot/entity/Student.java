package edu.co.icesi.introspringboot.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "public_id", nullable = false, unique = true, columnDefinition = "UUID DEFAULT RANDOM_UUID()")
    private UUID publicId;

    private String name;

    private String code;

    private String program;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Enrollment> studentCourses;

    public Student() {}

    @PrePersist
    public void ensurePublicId() {
        if (publicId == null) {
            publicId = UUID.randomUUID();
        }
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public UUID getPublicId() { return publicId; }
    public void setPublicId(UUID publicId) { this.publicId = publicId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getProgram() { return program; }
    public void setProgram(String program) { this.program = program; }
    public List<Enrollment> getStudentCourses() { return studentCourses; }
    public void setStudentCourses(List<Enrollment> studentCourses) { this.studentCourses = studentCourses; }
}
