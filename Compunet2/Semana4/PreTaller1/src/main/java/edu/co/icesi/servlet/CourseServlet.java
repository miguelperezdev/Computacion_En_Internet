package edu.co.icesi.servlet;

import edu.co.icesi.context.AppContext;
import edu.co.icesi.entity.Course;
import edu.co.icesi.service.CourseService;
import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/courses")
public class CourseServlet extends HttpServlet {

    private CourseService courseService;




    @Override
    public void init(ServletConfig config) throws ServletException {
       courseService = (CourseService) AppContext.getContext().getBean(CourseService.class);
    }
    //recibir la info para insertar el curso
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Course course = new Course();
        course.setName(req.getParameter("name"));
        course.setId(req.getParameter("String"));
        course.setProfessorName(req.getParameter("String"));
        course.setSchedule(req.getParameter("String"));
    }

    //le debo dar al cliente el formulario para que este pueda insertar el curso
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
    }
}
