package edu.co.icesi.introspringboot.api.v1;

import edu.co.icesi.introspringboot.api.v1.dto.ProfessorRequest;
import edu.co.icesi.introspringboot.api.v1.dto.ProfessorResponse;
import edu.co.icesi.introspringboot.service.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/professors")
public class ProfessorRestController {

    @Autowired
    private ProfessorService professorService;

    @GetMapping
    public ResponseEntity<List<ProfessorResponse>> getAllProfessors() {
        return ResponseEntity.ok(professorService.findAllAPI());
    }

    @GetMapping("/{publicId}")
    public ResponseEntity<ProfessorResponse> getProfessorByPublicId(@PathVariable UUID publicId) {
        ProfessorResponse response = professorService.findByPublicIdAPI(publicId);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ProfessorResponse> createProfessor(@RequestBody ProfessorRequest request) {
        return ResponseEntity.status(201).body(professorService.saveAPI(request));
    }

    @PutMapping("/{publicId}")
    public ResponseEntity<ProfessorResponse> updateProfessor(@PathVariable UUID publicId, @RequestBody ProfessorRequest request) {
        ProfessorResponse response = professorService.updateAPI(publicId, request);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{publicId}")
    public ResponseEntity<Void> deleteProfessor(@PathVariable UUID publicId) {
        if (professorService.findByPublicId(publicId).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        professorService.deleteByPublicId(publicId);
        return ResponseEntity.noContent().build();
    }
}
