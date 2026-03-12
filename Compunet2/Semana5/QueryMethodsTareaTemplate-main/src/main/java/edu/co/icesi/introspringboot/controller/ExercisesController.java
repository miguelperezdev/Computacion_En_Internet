package edu.co.icesi.introspringboot.controller;

import edu.co.icesi.introspringboot.entity.Course;
import edu.co.icesi.introspringboot.entity.Permission;
import edu.co.icesi.introspringboot.entity.Professor;
import edu.co.icesi.introspringboot.entity.Student;
import edu.co.icesi.introspringboot.repository.CourseRepository;
import edu.co.icesi.introspringboot.repository.PermissionRepository;
import edu.co.icesi.introspringboot.repository.ProfessorRepository;
import edu.co.icesi.introspringboot.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class ExercisesController {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private ProfessorRepository professorRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private PermissionRepository permissionRepository;

    // http://localhost:8080/exercise1
    @GetMapping("/exercise1")
    public Student example1 (){
        Optional<Student> student = studentRepository.findByCode("2021102001");
        if (student.isPresent()) {
            return student.get();
        }else{
            return null;
        }

    }

    // http://localhost:8080/exercise2
    @GetMapping("/exercise2")
    public List<Professor> example2 (){
        List<Professor> professorList = professorRepository.findByNameContainingIgnoreCase("ez");
        return professorList;
    }

    // http://localhost:8080/exercise2
    @GetMapping("/exercise3")
    public List<Course> example3 (){
        List<Course> courses = courseRepository.findByProfessor_NameOrderByName("name");
        return courses;
    }

    // http://localhost:8080/exercise15
    @GetMapping("/exercise15")
    public List<Permission> example15 (){
        List<Permission> permissions = permissionRepository.findByRolePermissions_UserRoles_User_Username("ana");
        return permissions;
    }


}
