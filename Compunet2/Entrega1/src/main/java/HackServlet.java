
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.concurrent.*;

@WebServlet(
        name = "HackServlet",
        urlPatterns = {"/*"},
        loadOnStartup = 1
)
@MultipartConfig
public class HackServlet extends HttpServlet {

    private String basePath;
    private String contextPath;

    private static final Map<String, String> MIME_TYPES = new HashMap<>();
    static {
        MIME_TYPES.put("html", "text/html; charset=UTF-8");
        MIME_TYPES.put("htm", "text/html; charset=UTF-8");
        MIME_TYPES.put("css", "text/css");
        MIME_TYPES.put("js", "application/javascript");
        MIME_TYPES.put("jpg", "image/jpeg");
        MIME_TYPES.put("jpeg", "image/jpeg");
        MIME_TYPES.put("png", "image/png");
        MIME_TYPES.put("gif", "image/gif");
    }

    @Override
    public void init() throws ServletException {
        super.init();

        // Obtener contexto
        contextPath = getServletContext().getContextPath();
        basePath = getServletContext().getRealPath("/");

        System.out.println("══════════════════════════════════════");
        System.out.println("🖥️  HACK SERVER SERVLET INICIADO");
        System.out.println("📁 Context Path: " + contextPath);
        System.out.println("📁 Real Path: " + basePath);
        System.out.println("══════════════════════════════════════");

        crearArchivosPorDefecto();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Obtener la ruta SIN el contexto
        String requestURI = request.getRequestURI();
        String contextPath = request.getContextPath();

        // Remover el context path si existe
        String rutaRelativa = requestURI;
        if (contextPath != null && !contextPath.isEmpty() && requestURI.startsWith(contextPath)) {
            rutaRelativa = requestURI.substring(contextPath.length());
        }

        // Log mejorado
        String ip = request.getRemoteAddr();
        System.out.println("🌐 [" + getHoraActual() + "] " + ip + " -> " +
                requestURI + " (relativa: " + rutaRelativa + ")");

        // Servir archivo
        servirArchivo(rutaRelativa, response);
    }

    private void servirArchivo(String ruta, HttpServletResponse response) throws IOException {
        // Manejar raíz
        if (ruta.equals("") || ruta.equals("/") || ruta.equals("/index")) {
            ruta = "/index.html";
        }

        // Seguridad
        if (ruta.contains("..")) {
            enviarError(response, 403, "Acceso denegado");
            return;
        }

        // Construir ruta física
        String rutaArchivo = ruta.startsWith("/") ? ruta.substring(1) : ruta;
        if (rutaArchivo.isEmpty()) {
            rutaArchivo = "index.html";
        }

        Path archivo = Paths.get(basePath, rutaArchivo);

        // Verificar si existe
        if (!Files.exists(archivo) || !Files.isReadable(archivo)) {
            System.out.println("❌ No encontrado: " + archivo);

            // Página 404 personalizada
            Path error404 = Paths.get(basePath, "error404.html");
            if (Files.exists(error404)) {
                servirArchivoConResponse(error404, response, 404, "Not Found");
            } else {
                enviarError404Hacker(response);
            }
            return;
        }

        // Servir archivo
        servirArchivoConResponse(archivo, response, 200, "OK");
    }

    private void servirArchivoConResponse(Path archivo, HttpServletResponse response,
                                          int status, String message) throws IOException {

        String nombre = archivo.getFileName().toString();
        String extension = obtenerExtension(nombre);
        String mimeType = MIME_TYPES.getOrDefault(extension.toLowerCase(),
                "application/octet-stream");

        // Configurar response
        response.setStatus(status);
        response.setContentType(mimeType);
        response.setCharacterEncoding("UTF-8");

        // Headers personalizados
        response.setHeader("Server", "HackServer/1.0");
        response.setHeader("X-Powered-By", "Java Servlet");

        // Escribir contenido
        try (InputStream in = Files.newInputStream(archivo);
             OutputStream out = response.getOutputStream()) {

            byte[] buffer = new byte[8192];
            int bytesRead;
            while ((bytesRead = in.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }
        }

        // Log exitoso
        long size = Files.size(archivo);
        System.out.println("✅ Servido: " + nombre + " (" + size + " bytes)");
    }

    private void enviarError(HttpServletResponse response, int code, String message)
            throws IOException {

        response.setStatus(code);
        response.setContentType("text/html; charset=UTF-8");

        String html = String.format("""
            <!DOCTYPE html>
            <html>
            <head>
                <title>Error %d</title>
                <style>
                    body { background: #0a0a0a; color: #ff0000; 
                           font-family: 'Courier New'; text-align: center; 
                           padding: 50px; }
                    h1 { font-size: 72px; text-shadow: 0 0 20px #ff0000; }
                    a { color: #00ff00; text-decoration: none; 
                        border: 1px solid #00ff00; padding: 10px 20px; 
                        display: inline-block; margin-top: 30px; }
                </style>
            </head>
            <body>
                <h1>%d</h1>
                <p>%s</p>
                <a href="%s">← VOLVER</a>
            </body>
            </html>
            """, code, code, message, contextPath + "/");

        try (PrintWriter writer = response.getWriter()) {
            writer.print(html);
        }
    }

    private void enviarError404Hacker(HttpServletResponse response) throws IOException {
        response.setStatus(404);
        response.setContentType("text/html; charset=UTF-8");

        String html = String.format("""
            <!DOCTYPE html>
            <html>
            <head>
                <title>404 - FILE NOT FOUND</title>
                <style>
                    body { background: #0a0a0a; color: #ff0000; 
                           font-family: 'Courier New'; text-align: center; 
                           padding: 50px; }
                    h1 { font-size: 100px; text-shadow: 0 0 30px #ff0000; 
                         animation: glitch 3s infinite; }
                    @keyframes glitch {
                        0%%, 100%% { transform: translate(0); }
                        10%% { transform: translate(-2px, 2px); }
                        20%% { transform: translate(2px, -2px); }
                    }
                    .terminal { background: rgba(0, 20, 0, 0.5); 
                               border: 1px solid #ff0000; padding: 20px; 
                               margin: 30px auto; max-width: 600px; 
                               text-align: left; font-family: 'Consolas'; }
                </style>
            </head>
            <body>
                <h1>404</h1>
                <p>// FILE NOT FOUND // ACCESS DENIED</p>
                
                <div class="terminal">
                    <p>> ERROR: HTTP 404 - Not Found</p>
                    <p>> CONTEXT: %s</p>
                    <p>> STATUS: File does not exist</p>
                </div>
                
                <a href="%s" style="color:#00ff00;">← RETURN TO MAINFRAME</a>
            </body>
            </html>
            """, contextPath, contextPath + "/");

        try (PrintWriter writer = response.getWriter()) {
            writer.print(html);
        }
    }

    private String obtenerExtension(String filename) {
        int dotIndex = filename.lastIndexOf('.');
        return (dotIndex > 0 && dotIndex < filename.length() - 1)
                ? filename.substring(dotIndex + 1) : "";
    }

    private void crearArchivosPorDefecto() {
        try {
            // Crear index.html si no existe
            Path indexPath = Paths.get(basePath, "index.html");
            if (!Files.exists(indexPath)) {
                String indexHtml = String.format("""
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>// HACK SERVER //</title>
                        <style>
                            body { background: #0a0a0a; color: #00ff00; 
                                   font-family: 'Courier New'; text-align: center; 
                                   padding: 50px; }
                            h1 { text-shadow: 0 0 20px #00ff00; font-size: 48px; }
                            .status { border: 2px solid #00ff00; padding: 20px; 
                                     margin: 30px auto; max-width: 500px; 
                                     background: rgba(0, 30, 0, 0.3); }
                            .links a { color: #00ff00; margin: 10px; 
                                       text-decoration: none; border: 1px solid #00ff00; 
                                       padding: 10px 20px; display: inline-block; }
                            .links a:hover { background: rgba(0, 255, 0, 0.2); }
                        </style>
                    </head>
                    <body>
                        <h1>// HACK SERVER ONLINE //</h1>
                        <p>Servlet HTTP funcionando en Tomcat</p>
                        <p><strong>Context Path:</strong> %s</p>
                        
                        <div class="status">
                            <h3>⚙️ SYSTEM STATUS</h3>
                            <p>✅ Server: Tomcat + Servlet</p>
                            <p>✅ Context: %s</p>
                            <p>✅ Status: Operational</p>
                        </div>
                        
                        <div class="links">
                            <a href="%s">HOME</a>
                            <a href="%stest.html">TEST PAGE</a>
                            <a href="%snoexiste.html">ERROR 404</a>
                            <a href="%smatrix_code.gif">GIF</a>
                            <a href="%scyber_wall.jpg">JPG</a>
                        </div>
                        
                        <script>
                            // Mostrar URL actual
                            document.getElementById('currentUrl').textContent = 
                                window.location.href;
                        </script>
                    </body>
                    </html>
                    """, contextPath, contextPath,
                        contextPath + "/", contextPath + "/",
                        contextPath + "/", contextPath + "/",
                        contextPath + "/");

                Files.writeString(indexPath, indexHtml);
                System.out.println("📄 index.html creado en: " + indexPath);
            }

        } catch (IOException e) {
            System.err.println("⚠ Error creando archivos: " + e.getMessage());
        }
    }

    private String getHoraActual() {
        return new Date().toString().substring(11, 19);
    }
}