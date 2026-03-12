package edu.co.icesi.servlets;

import edu.co.icesi.model.Artist;
import edu.co.icesi.service.ArtistService;
import edu.co.icesi.util.SpringApplicationContext;
import edu.co.icesi.util.SpringApplicationContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/listArtists")
public class ListArtistsServlet extends HttpServlet {
    private ArtistService artistService;

    @Override
    public void init() throws ServletException {
        // Obtener el servicio del contexto de Spring
        SpringApplicationContext SpringApplicationContext = new SpringApplicationContext();
        artistService = SpringApplicationContext.getApplicationContext().getBean(ArtistService.class);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<Artist> artists = artistService.getAllArtists();
        req.setAttribute("artists", artists);
        req.getRequestDispatcher("/WEB-INF/views/listArtists.jsp").forward(req, resp);
    }
}
