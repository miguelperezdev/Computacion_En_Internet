package edu.co.icesi.entity;

import java.util.List;

public class Student {

    private String code;
    //Example: A00123456
    private String name;
    private String program;
    private List<Course> courses;

    //Constructors

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProgram() {
        return program;
    }

    public void setProgram(String program) {
        this.program = program;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }

    //Getters y setters

}
