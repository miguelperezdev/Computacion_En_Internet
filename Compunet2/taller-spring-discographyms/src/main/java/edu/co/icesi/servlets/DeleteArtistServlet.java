package edu.co.icesi.servlets;

import edu.co.icesi.service.ArtistService;
import edu.co.icesi.util.SpringApplicationContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/deleteArtist")
public class DeleteArtistServlet extends HttpServlet {
    private ArtistService artistService;

    @Override
    public void init() {
        artistService = SpringApplicationContext.getApplicationContext().getBean(ArtistService.class);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Mostrar formulario para ingresar ID
        req.getRequestDispatcher("/WEB-INF/views/deleteArtist.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Long id = Long.parseLong(req.getParameter("id"));
        if (artistService.deleteArtist(id)) {
            resp.sendRedirect(req.getContextPath() + "/listArtists");
        } else {
            resp.sendRedirect(req.getContextPath() + "/deleteArtist?error=invalid");
        }
    }
}