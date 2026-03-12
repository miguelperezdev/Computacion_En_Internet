package edu.co.icesi.servlets;

import edu.co.icesi.service.ArtistService;
import edu.co.icesi.util.SpringApplicationContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/searchArtist")
public class SearchArtistServlet extends HttpServlet {
    private ArtistService artistService;

    @Override
    public void init() {
        artistService = SpringApplicationContext.getApplicationContext().getBean(ArtistService.class);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/WEB-INF/views/searchArtist.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String name = req.getParameter("name");
        artistService.getArtistWithTracks(name).ifPresentOrElse(
                artist -> {
                    req.setAttribute("artist", artist);
                    try {
                        req.getRequestDispatcher("/WEB-INF/views/artistDetail.jsp").forward(req, resp);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                },
                () -> {
                    try {
                        resp.sendRedirect(req.getContextPath() + "/searchArtist?error=notfound");
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
        );
    }
}