package edu.co.icesi.introspringboot.service.impl;

import edu.co.icesi.introspringboot.api.v1.dto.CourseRequest;
import edu.co.icesi.introspringboot.api.v1.dto.CourseResponse;
import edu.co.icesi.introspringboot.api.v1.mappers.CourseMapper;
import edu.co.icesi.introspringboot.entity.Course;
import edu.co.icesi.introspringboot.entity.Professor;
import edu.co.icesi.introspringboot.repository.CourseRepository;
import edu.co.icesi.introspringboot.repository.ProfessorRepository;
import edu.co.icesi.introspringboot.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseMapper courseMapper;

    private final CourseRepository courseRepository;
    private final ProfessorRepository professorRepository;

    public CourseServiceImpl(CourseRepository courseRepository, ProfessorRepository professorRepository) {
        this.courseRepository = courseRepository;
        this.professorRepository = professorRepository;
    }

    @Override
    @PreAuthorize("hasAuthority('READ_COURSE')")
    public Page<Course> getCoursesByProfessor(String professorName, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return courseRepository.findByProfessor_Name(professorName, pageable);
    }

    @Override
    @PreAuthorize("hasAuthority('READ_COURSE')")
    public List<Course> getAllCourses() {
        List<Course> result = new ArrayList<>();
        courseRepository.findAll().forEach(result::add);
        return result;
    }

    @Override
    @PreAuthorize("hasAuthority('READ_COURSE')")
    public Course getCourseById(Integer id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado con id: " + id));
    }

    @Override
    @PreAuthorize("hasAuthority('READ_COURSE')")
    public Optional<Course> findByPublicId(UUID publicId) {
        return courseRepository.findByPublicId(publicId);
    }

    @Override
    @PreAuthorize("hasAuthority('READ_COURSE')")
    public List<Course> getCoursesByCredits(int credits, int page, int quantity) {
        Pageable pageable = PageRequest.of(page, quantity);
        return courseRepository.findByCreditsEquals(credits, pageable);
    }

    @Override
    @PreAuthorize("hasAuthority('CREATE_COURSE')")
    public Course save(Course course) {
        return courseRepository.save(course);
    }

    @Override
    @PreAuthorize("hasAuthority('DELETE_COURSE')")
    public void deleteById(Integer id) {
        courseRepository.deleteById(id);
    }

    @Override
    @PreAuthorize("hasAnyAuthority('READ_COURSE')")
    public List<CourseResponse> getAllCoursesAPI() {
        //Entity -> DTO
        List<CourseResponse> output =  courseRepository.findAll().stream().map(
                entity -> courseMapper.toDTO(entity)
        ).toList();
        return output;
    }

    @Override
    public CourseResponse getCourseByPublicIdAPI(UUID publicId) {
        return findByPublicId(publicId)
                .map(courseMapper::toDTO)
                .orElse(null);
    }

    @Override
    public CourseResponse saveAPI(CourseRequest course) {
        Course entity = courseMapper.toEntity(course);
        Professor professor = professorRepository.findByPublicId(course.getProfessorPublicId())
                .orElseThrow(() -> new RuntimeException("Profesor no encontrado con publicId: " + course.getProfessorPublicId()));
        entity.setProfessor(professor);
        return courseMapper.toDTO(courseRepository.save(entity));
    }
}
