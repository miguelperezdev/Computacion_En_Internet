package edu.co.icesi.introspringboot.controller;


import edu.co.icesi.introspringboot.entity.User;
import edu.co.icesi.introspringboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class AuthController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String login() {
        return "login"; // login.html
    }

    @GetMapping("/signup")
    public String signup(Model model) {
        model.addAttribute("user", new User());
        return "auth/singup";
    }

    @PostMapping("/signup")
    public String signup(@ModelAttribute User user) {
        userService.save(user);
        return "redirect:/auth/login";
    }
}
