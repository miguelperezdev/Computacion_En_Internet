package edu.co.icesi.introspringboot.service;

import edu.co.icesi.introspringboot.api.v1.dto.CourseRequest;
import edu.co.icesi.introspringboot.api.v1.dto.CourseResponse;
import edu.co.icesi.introspringboot.entity.Course;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CourseService {

    // Lesson 15: Pagination
    Page<Course> getCoursesByProfessor(String professorName, int page, int size);

    // Lesson 18: Used in Mockito tests
    List<Course> getAllCourses();

    Course getCourseById(Integer id);

    Optional<Course> findByPublicId(UUID publicId);

    List<Course> getCoursesByCredits(int credits, int page, int quantity);

    Course save(Course course);

    void deleteById(Integer id);


    //API
    List<CourseResponse> getAllCoursesAPI();
    CourseResponse getCourseByPublicIdAPI(UUID publicId);
    CourseResponse saveAPI(CourseRequest course);

}
