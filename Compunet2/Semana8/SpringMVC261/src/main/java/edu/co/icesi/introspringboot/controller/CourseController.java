package edu.co.icesi.introspringboot.controller;


import edu.co.icesi.introspringboot.entity.Course;
import edu.co.icesi.introspringboot.entity.Professor;
import edu.co.icesi.introspringboot.service.CourseService;
import edu.co.icesi.introspringboot.service.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/course") // -> Solo tiene que ver con la URL
public class CourseController {

    private CourseService courseService;
    private ProfessorService professorService;

    public CourseController(CourseService courseService, ProfessorService professorService) {
        this.courseService = courseService;
        this.professorService = professorService;
    }

    // http://localhost:8080/course/list
    @GetMapping("/list")
    public String list(Model model) {
        List<Course> courses = courseService.getAllCourses();
        List<Professor> professors = professorService.findAll();

        model.addAttribute(
                "professors",
                professors
        );
        model.addAttribute(
                "courses",
                courses
        );

        model.addAttribute(
                "newcourse",
                new Course()
        );
        return "course/courselist";
    }

    @PostMapping("/save")
    public String save(@ModelAttribute Course course){
        courseService.save(course);
        return "redirect:/course/list";
    }


    @GetMapping("/{id}")
    public String studentDetail(@PathVariable("id") Integer courseId, Model model) {
        Course course = courseService.getCourseById(courseId);
        model.addAttribute("course", course);
        return "course/course-detail";
    }


}
