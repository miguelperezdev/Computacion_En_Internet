package edu.co.icesi.introspringboot.repository;

import edu.co.icesi.introspringboot.entity.Course;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface CourseRepository extends CrudRepository<Course, Long> {
    List<Course> findByName(String name);

    List<Course> getCoursesByCredits(int credits);

    Optional<Course> findCourseByNameIgnoreCase(String name);

    List<Course> findCoursesByProfessor_NameOrderByNameAsc(String professorName);

    List<Course> getCoursesByCreditsBetween(int creditsAfter, int creditsBefore);


}
