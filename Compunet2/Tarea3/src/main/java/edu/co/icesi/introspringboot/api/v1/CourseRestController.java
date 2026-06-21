package edu.co.icesi.introspringboot.api.v1;

import edu.co.icesi.introspringboot.api.v1.dto.CourseRequest;
import edu.co.icesi.introspringboot.api.v1.dto.CourseResponse;
import edu.co.icesi.introspringboot.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


//GET, POST, PUT, PATCH, DELETE
@RestController
@RequestMapping("/api/v1/courses")
public class CourseRestController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    public ResponseEntity<?> getCourses() {
        List<CourseResponse> courses = courseService.getAllCoursesAPI();
        return ResponseEntity
                .status(200)
                .header(
                        "CalderonHeader",
                        "RestEsLoMejor"
                )
                .body(courses);
    }

    @GetMapping("/{publicId}")
    public ResponseEntity<CourseResponse> getCourseByPublicId(@PathVariable UUID publicId) {
        CourseResponse response = courseService.getCourseByPublicIdAPI(publicId);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    //POST
    // http://localhost:8081/api/v1/courses
    /*
    Body:
    {
        "name":"Nueva Materia Espectacular",
        "credits":6,
        "professorPublicId":"550e8400-e29b-41d4-a716-446655440000"
    }
    */
    @PostMapping
    public ResponseEntity<?> saveCourse(
            @RequestBody CourseRequest course
    ) {
        try{
            CourseResponse saved = courseService.saveAPI(course);
            return ResponseEntity.status(201).body(saved);
        }catch (Exception e){
            return ResponseEntity.status(400).build();
        }
    }




}
