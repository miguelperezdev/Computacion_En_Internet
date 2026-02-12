package edu.co.icesi.entity;

public class Course {

    private String id;
    //Example: 35
    private String name;
    private String professorName;
    private String schedule;
    //Example: "MI 07:00 08:59, VI 15:00 16:59"


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProfessorName() {
        return professorName;
    }

    public void setProfessorName(String professorName) {
        this.professorName = professorName;
    }

    public String getSchedule() {
        return schedule;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }



    @Override
    public boolean equals(Object obj) {
        //comparamos this con obj
        if(obj instanceof Course){
            Course other = (Course) obj;
            return
                    other.getId() == this.getId() &&
                    other.getName().equals(this.getName());
        }else {
            return false;
        }
    }

}
