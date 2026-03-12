package edu.co.icesi.servlets;

import edu.co.icesi.service.TrackService;
import edu.co.icesi.util.SpringApplicationContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/deleteTrack")
public class DeleteTrackServlet extends HttpServlet {
    private TrackService trackService;

    @Override
    public void init() {
        trackService = SpringApplicationContext.getApplicationContext().getBean(TrackService.class);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/WEB-INF/views/deleteTrack.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Long id = Long.parseLong(req.getParameter("id"));
        if (trackService.deleteTrack(id)) {
            resp.sendRedirect(req.getContextPath() + "/listTracks");
        } else {
            resp.sendRedirect(req.getContextPath() + "/deleteTrack?error=invalid");
        }
    }
}