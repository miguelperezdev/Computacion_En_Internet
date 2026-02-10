package servients;

import context.AppContext;
import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.ApplicationContext;
import repository.MessagesRepository;

import java.io.IOException;

@WebServlet("/messages")
// Esta anotación define la URL del servlet.
// Cuando en el navegador o en un formulario se accede a /messages,
// Tomcat sabe que debe ejecutar esta clase.
public class MessagesServlet extends HttpServlet {

    ApplicationContext applicationContext;
    MessagesRepository messageRepository;

    @Override
    public void init(ServletConfig config) throws ServletException {
        applicationContext = AppContext.getContext();
        messageRepository = (MessagesRepository) applicationContext.getBean("messageRepository");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        // doGet se ejecuta cuando el usuario entra por la URL directamente
        // Ej: http://localhost:8080/IntroBeans/messages

        resp.setContentType("text/html");
        // Indicamos que la respuesta será HTML

        resp.getWriter().println("<h1>🚀 Servlet funcionando correctamente</h1>");
        // Mensaje simple para comprobar que el servlet está activo
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String message = req.getParameter("message");

        System.out.println("*****");
        System.out.println(message);
        messagesRepository.addMessage(name);
        System.out.println(messageRepository.getMessages().size());
        // Redirige de nuevo al index.html
        resp.sendRedirect("index.html");
    }

}
