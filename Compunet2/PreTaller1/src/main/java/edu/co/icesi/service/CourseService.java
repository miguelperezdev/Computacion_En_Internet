package edu.co.icesi.service;

import edu.co.icesi.entity.Course;
import edu.co.icesi.repository.CourseRepository;

//Logica de negocio
public class CourseService {

    private CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
    this.courseRepository = courseRepository;
    }

    //CRUD
    public void saveCourse(Course courses) {
        //Primero pregunto si ya eciste ese elemento y no lo insero a mis datos
        if(!courseRepository.exists(course)) {
        courseRepository.save(course);
    }

}3
