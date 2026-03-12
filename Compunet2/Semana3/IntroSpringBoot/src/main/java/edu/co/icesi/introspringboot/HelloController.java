package edu.co.icesi.introspringboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello1")
    public String index1() {
        return "Hello World!";
    }
    @GetMapping("/hello2")
    public String index2() {
        return "Hello World!";
    }
    @GetMapping("/hello3")
    public String index3() {
        return "Hello World!";
    }
}
