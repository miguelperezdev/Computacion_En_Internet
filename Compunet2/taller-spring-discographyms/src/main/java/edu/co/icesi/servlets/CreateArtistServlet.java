package edu.co.icesi.servlets;

import edu.co.icesi.service.ArtistService;
import edu.co.icesi.util.SpringApplicationContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/createArtist")
public class CreateArtistServlet extends HttpServlet {
    private ArtistService artistService;

    @Override
    public void init() {
        artistService = SpringApplicationContext.getApplicationContext().getBean(ArtistService.class);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/WEB-INF/views/createArtist.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String name = req.getParameter("name");
        String nationality = req.getParameter("nationality");
        artistService.createArtist(name, nationality);
        resp.sendRedirect(req.getContextPath() + "/listArtists");
    }
}