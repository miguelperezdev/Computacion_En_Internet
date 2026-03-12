package edu.co.icesi.repository;

import edu.co.icesi.entity.Course;

import java.util.ArrayList;

public class CourseRepository {

    private ArrayList<Course> courses;

    public void save(Course course){
        courses.add(course);
        ,
    }

    public boolean exists(Course courses){
        //FUnciona con el equals del objeto
        return courses.contains(course);
    }

    public ArrayList<Course> getCourses() {
        return courses;
    }
}

