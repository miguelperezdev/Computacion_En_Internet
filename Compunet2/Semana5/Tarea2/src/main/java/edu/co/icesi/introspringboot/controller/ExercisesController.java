package edu.co.icesi.introspringboot.controller;

import edu.co.icesi.introspringboot.entity.*;
import edu.co.icesi.introspringboot.repository.*;
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
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    //http://localhost:8080/exercise1
    @GetMapping("/exercise1")
    public Student exercise1() {
        Optional<Student> student = studentRepository.findByCode("2021102001");
        return student.orElse(null);
    }

    //http://localhost:8080/exercise2
    @GetMapping("/exercise2")
    public List<Professor> exercise2() {
        return professorRepository.findByNameContainingIgnoreCase("ez");
    }

    //  http://localhost:8080/exercise3
    @GetMapping("/exercise3")
    public List<Course> exercise3() {
        return courseRepository.getCoursesByCredits(3);
    }

    //http://localhost:8080/exercise4
    @GetMapping("/exercise4")
    public List<Student> exercise4() {
        return studentRepository.findByProgram("Ingenieria de Sistemas");
    }

    //http://localhost:8080/exercise5
    @GetMapping("/exercise5")
    public Course exercise5() {
        Optional<Course> course = courseRepository.findCourseByNameIgnoreCase("Historia del Arte");
        return course.orElse(null);
    }

    // http://localhost:8080/exercise6
    @GetMapping("/exercise6")
    public List<Course> exercise6() {
        return courseRepository.findCoursesByProfessor_NameOrderByNameAsc("Juan Perez");
    }



    // http://localhost:8080/exercise7
    @GetMapping("/exercise7")
    public List<Student> exercise7() {
        return studentRepository.getStudentsByCodeStartingWith("2021");
    }

    // http://localhost:8080/exercise8
    @GetMapping("/exercise8")
    public List<Course> exercise8() {
        return courseRepository.getCoursesByCreditsBetween(3, 4);
    }

    //http://localhost:8080/exercise9
    @GetMapping("/exercise9")
    public List<Student> exercise9() {
        return studentRepository.findByEnrollments_Course_Professor_Name("Juan Perez");
    }



    //http://localhost:8080/exercise10
    @GetMapping("/exercise10")
    public List<Professor> exercise10() {
        return professorRepository.findByCourses_Enrollments_Student_Program("Medicina");
    }

    //http://localhost:8080/exercise11
    @GetMapping("/exercise11")
    public User exercise11() {
        Optional<User> user = userRepository.findUserByUsername("juan");
        return user.orElse(null);
    }


    //http://localhost:8080/exercise12
    @GetMapping("/exercise12")
    public List<User> exercise12() {
        return userRepository.findByUserRoles_Role_Name("ADMIN");
    }


    //http://localhost:8080/exercise13
    @GetMapping("/exercise13")
    public List<Role> exercise13() {
        return roleRepository.findRoleByNameContainingIgnoreCase("admin");
    }

    //http://localhost:8080/exercise14
    @GetMapping("/exercise14")
    public List<User> exercise14() {
        return userRepository.findByUserRoles_Role_RolePermissions_Permission_Name("READ_STUDENT");
    }

    //http://localhost:8080/exercise15
    @GetMapping("/exercise15")
    public List<Permission> exercise15() {
        return permissionRepository.findByRolePermissions_Role_UserRoles_User_Username("carlos");
    }
}
