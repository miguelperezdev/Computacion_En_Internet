package edu.co.icesi.repository;

import edu.co.icesi.entity.Student;

import java.util.ArrayList;

public class StudentRepository {
    private ArrayList<Student> students = new ArrayList<>();

    public void save(Student student) {
        students.add(student);
    }

    public ArrayList<Student> getStudents() {
        return students;
    }


}
