package edu.co.icesi.introspringboot.controller;


import edu.co.icesi.introspringboot.entity.Course;
import edu.co.icesi.introspringboot.entity.Student;
import edu.co.icesi.introspringboot.service.CourseService;
import edu.co.icesi.introspringboot.service.StudentService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/student") // -> Solo tiene que ver con la URL
public class StudentController {

    private StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // http://localhost:8080/course/list
    @GetMapping("/list")
    public String list(Model model) {
        List<Student> students = studentService.findAll();
        model.addAttribute(
                "students",
                students
        );
        model.addAttribute(
                "newstudent",
                new Student()
        );
        return "student/studentList";
    }

    @PostMapping("/save")
    public String save(@ModelAttribute Student student) {
        studentService.save(student);
        return "redirect:/student/list";
    }

}
