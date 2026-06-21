package edu.co.icesi.introspringboot.controller;


import edu.co.icesi.introspringboot.entity.Course;
import edu.co.icesi.introspringboot.entity.Professor;
import edu.co.icesi.introspringboot.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class HelloController {
    // htto://localhost:8080/
    @GetMapping("/")
    public String index(Model model) {  // -> Devuelve el nombre del archivo de plantilla
        model.addAttribute(
                "helloMessage",
                "Hola desde el servidor"
        );
        return "index";
    }

    @GetMapping("/object/detail")
    public String passAnObject(Model model) {  // -> Devuelve el nombre del archivo de plantilla

        Professor professor = new Professor();
        professor.setName("Nicolás Salazar");

        Course course = new Course();
        course.setProfessor(professor);
        course.setCredits(3);
        course.setName("Computación en internet 1");

        model.addAttribute(
                "course",
                course
        );
        return "object";
    }

}


