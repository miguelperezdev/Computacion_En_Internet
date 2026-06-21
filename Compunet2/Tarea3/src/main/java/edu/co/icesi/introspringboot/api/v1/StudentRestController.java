package edu.co.icesi.introspringboot.api.v1;

import edu.co.icesi.introspringboot.api.v1.dto.StudentRequest;
import edu.co.icesi.introspringboot.api.v1.dto.StudentResponse;
import edu.co.icesi.introspringboot.api.v1.mappers.StudentMapper;
import edu.co.icesi.introspringboot.entity.Student;
import edu.co.icesi.introspringboot.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/students")
public class StudentRestController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private StudentMapper studentMapper;

    @GetMapping
    @PreAuthorize("hasAuthority('READ_STUDENT')")
    public ResponseEntity<List<StudentResponse>> getAllStudents() {
        List<StudentResponse> responses = studentService.findAll().stream()
                .map(studentMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{publicId}")
    @PreAuthorize("hasAuthority('READ_STUDENT')")
    public ResponseEntity<StudentResponse> getStudentByPublicId(@PathVariable UUID publicId) {
        return studentService.findByPublicId(publicId)
                .map(studentMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('CREATE_STUDENT')")
    public ResponseEntity<StudentResponse> createStudent(@RequestBody StudentRequest request) {
        Student student = studentMapper.toEntity(request);
        Student saved = studentService.save(student);
        return ResponseEntity.status(201).body(studentMapper.toDTO(saved));
    }

    @PutMapping("/{publicId}")
    @PreAuthorize("hasAuthority('CREATE_STUDENT')")
    public ResponseEntity<StudentResponse> updateStudent(@PathVariable UUID publicId, @RequestBody StudentRequest request) {
        return studentService.findByPublicId(publicId)
                .map(existing -> {
                    existing.setName(request.getName());
                    existing.setCode(request.getCode());
                    existing.setProgram(request.getProgram());
                    Student updated = studentService.save(existing);
                    return ResponseEntity.ok(studentMapper.toDTO(updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{publicId}")
    @PreAuthorize("hasAuthority('DELETE_STUDENT')")
    public ResponseEntity<Void> deleteStudent(@PathVariable UUID publicId) {
        if (studentService.findByPublicId(publicId).isPresent()) {
            studentService.deleteByPublicId(publicId);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
