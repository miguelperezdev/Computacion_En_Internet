package edu.co.icesi.servlets;

import edu.co.icesi.service.TrackService;
import edu.co.icesi.util.SpringApplicationContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/listTracks")
public class ListTracksServlet extends HttpServlet {
    private TrackService trackService;

    @Override
    public void init() {
        trackService = SpringApplicationContext.getApplicationContext().getBean(TrackService.class);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setAttribute("tracks", trackService.getAllTracks());
        req.getRequestDispatcher("/WEB-INF/views/listTracks.jsp").forward(req, resp);
    }
}