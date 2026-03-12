package edu.co.icesi.servlets;

import edu.co.icesi.service.ArtistService;
import edu.co.icesi.service.TrackService;
import edu.co.icesi.util.SpringApplicationContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/createTrack")
public class CreateTrackServlet extends HttpServlet {
    private TrackService trackService;
    private ArtistService artistService;

    @Override
    public void init() {
        trackService = SpringApplicationContext.getApplicationContext().getBean(TrackService.class);
        artistService = SpringApplicationContext.getApplicationContext().getBean(ArtistService.class);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setAttribute("artists", artistService.getAllArtists());
        req.getRequestDispatcher("/WEB-INF/views/createTrack.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String title = req.getParameter("title");
        String genre = req.getParameter("genre");
        int duration = Integer.parseInt(req.getParameter("duration"));
        String album = req.getParameter("album");
        String[] artistIds = req.getParameterValues("artists");
        List<Long> ids = artistIds != null ?
                java.util.Arrays.stream(artistIds).map(Long::parseLong).toList() :
                List.of();
        trackService.createTrack(title, genre, duration, album, ids);
        resp.sendRedirect(req.getContextPath() + "/listTracks");
    }
}