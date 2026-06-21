package edu.co.icesi.introspringboot.repository;

import edu.co.icesi.introspringboot.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CourseRepository extends JpaRepository<Course, Integer> {
    Optional<Course> findByName(String name);

    Optional<Course> findByPublicId(UUID publicId);

    boolean existsByPublicId(UUID publicId);

    boolean existsByName(String name);

    List<Course> findByProfessor_NameOrderByName(String name);

    Page<Course> findByProfessor_Name(String name, Pageable pageable);

    List<Course> findByCreditsEquals(int credits, Pageable pageable);
    //List, o Page
}
