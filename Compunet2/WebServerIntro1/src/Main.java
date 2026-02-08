import java.io.*;
import java.net.*;
import java.util.*;
import java.util.concurrent.*;
import java.nio.file.*;

/**
 * Servidor HTTP/1.0 multihilo en Java
 * Cumple con todos los requisitos del enunciado
 */
public class Main {
    private static int PORT = 8080; // Puerto configurable mayor a 1024
    private static final String BASE_DIR = "www"; // Directorio base para archivos
    private static final String ERROR_404_PAGE = "error404.html";
    private static boolean running = true;

    public static void main(String[] args) {
        try {
            // Verificar si se especificó un puerto diferente
            if (args.length > 0) {
                PORT = Integer.parseInt(args[0]);
                if (PORT <= 1024) {
                    System.out.println("Error: El puerto debe ser mayor a 1024");
                    System.exit(1);
                }
            }

            new Main();
        } catch (IOException e) {
            System.err.println("Error al iniciar el servidor: " + e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * Constructor del servidor
     */
    public Main() throws IOException {
        // Crear directorio base si no existe
        Files.createDirectories(Paths.get(BASE_DIR));

        // Crear página de error 404 por defecto si no existe
        createDefaultErrorPage();

        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            System.out.println("==========================================");
            System.out.println("Servidor HTTP Multihilo iniciado");
            System.out.println("Escuchando en puerto: " + PORT);
            System.out.println("Directorio base: " + BASE_DIR);
            System.out.println("==========================================\n");

            // Manejar señal de terminación
            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                running = false;
                System.out.println("\nApagando servidor...");
            }));

            // Bucle principal del servidor
            while (running) {
                try {
                    Socket socket = serverSocket.accept();
                    System.out.println("Nueva conexión aceptada de: " +
                            socket.getInetAddress().getHostAddress());

                    // Crear un nuevo hilo para cada solicitud
                    HttpHandler handler = new HttpHandler(socket);
                    Thread thread = new Thread(handler);
                    thread.start();

                } catch (IOException e) {
                    if (running) {
                        System.err.println("Error aceptando conexión: " + e.getMessage());
                    }
                }
            }
        }
    }

    /**
     * Crea una página de error 404 por defecto
     */
    private void createDefaultErrorPage() throws IOException {
        Path errorPath = Paths.get(BASE_DIR, ERROR_404_PAGE);
        if (!Files.exists(errorPath)) {
            String errorHtml = """
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Error 404 - Recurso No Encontrado</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            text-align: center;
                            padding: 50px;
                            background-color: #f4f4f4;
                        }
                        .error-container {
                            background: white;
                            padding: 40px;
                            border-radius: 10px;
                            box-shadow: 0 0 10px rgba(0,0,0,0.1);
                            display: inline-block;
                        }
                        h1 {
                            color: #e74c3c;
                            font-size: 72px;
                            margin: 0;
                        }
                        h2 {
                            color: #333;
                        }
                        p {
                            color: #666;
                        }
                    </style>
                </head>
                <body>
                    <div class="error-container">
                        <h1>404</h1>
                        <h2>Recurso No Encontrado</h2>
                        <p>El archivo solicitado no existe en el servidor.</p>
                        <p>Verifica la URL e intenta nuevamente.</p>
                        <hr>
                        <p><small>Servidor HTTP Multihilo - Java</small></p>
                    </div>
                </body>
                </html>
                """;

            Files.writeString(errorPath, errorHtml);
            System.out.println("Página de error 404 creada en: " + errorPath);
        }
    }

    /**
     * Clase que maneja cada conexión HTTP en un hilo separado
     */
    private static class HttpHandler implements Runnable {
        private final Socket socket;

        public HttpHandler(Socket socket) {
            this.socket = socket;
        }

        @Override
        public void run() {
            BufferedReader in = null;
            OutputStream out = null;

            try {
                // Configurar timeout
                socket.setSoTimeout(30000); // 30 segundos

                // Crear streams
                in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                out = socket.getOutputStream();
                PrintWriter writer = new PrintWriter(new OutputStreamWriter(out));

                // Leer la línea de solicitud
                String requestLine = in.readLine();
                if (requestLine == null || requestLine.isEmpty()) {
                    return;
                }

                System.out.println("\n=== SOLICITUD RECIBIDA ===");
                System.out.println("[" + new Date() + "]");
                System.out.println("Línea de solicitud: " + requestLine);

                // Leer headers
                System.out.println("\nHeaders:");
                String headerLine;
                Map<String, String> headers = new HashMap<>();
                while ((headerLine = in.readLine()) != null &&
                        !headerLine.isEmpty()) {
                    System.out.println(headerLine);
                    if (headerLine.contains(":")) {
                        String[] parts = headerLine.split(":", 2);
                        if (parts.length == 2) {
                            headers.put(parts[0].trim().toLowerCase(), parts[1].trim());
                        }
                    }
                }

                // Parsear la solicitud
                String[] requestParts = requestLine.split(" ");
                if (requestParts.length < 3) {
                    sendErrorResponse(writer, out, 400, "Bad Request");
                    return;
                }

                String method = requestParts[0];
                String resourcePath = requestParts[1];

                // Solo soportamos método GET
                if (!"GET".equals(method)) {
                    sendErrorResponse(writer, out, 501, "Not Implemented");
                    return;
                }

                // Servir el recurso solicitado
                serveResource(resourcePath, writer, out);

            } catch (SocketTimeoutException e) {
                System.err.println("Timeout en conexión: " + e.getMessage());
            } catch (IOException e) {
                System.err.println("Error procesando solicitud: " + e.getMessage());
            } finally {
                // Cerrar recursos de forma segura
                closeResources(in, out, socket);
            }
        }

        /**
         * Sirve un recurso solicitado
         */
        private void serveResource(String resourcePath, PrintWriter writer, OutputStream out) throws IOException {
            // Normalizar la ruta
            if ("/".equals(resourcePath)) {
                resourcePath = "/index.html";
            }

            // Prevenir path traversal attacks
            if (resourcePath.contains("..")) {
                sendErrorResponse(writer, out, 403, "Forbidden");
                return;
            }

            // Construir la ruta completa del archivo
            Path filePath = Paths.get(BASE_DIR + resourcePath);

            // Verificar si el archivo existe y es legible
            if (!Files.exists(filePath) || !Files.isReadable(filePath)) {
                System.out.println("Archivo no encontrado: " + filePath);

                // Intentar servir la página de error 404
                Path errorPath = Paths.get(BASE_DIR, ERROR_404_PAGE);
                if (Files.exists(errorPath) && Files.isReadable(errorPath)) {
                    sendFileResponse(writer, out, errorPath, 404, "Not Found");
                } else {
                    sendErrorResponse(writer, out, 404, "Not Found");
                }
                return;
            }

            // Servir el archivo
            sendFileResponse(writer, out, filePath, 200, "OK");
        }

        /**
         * Envía una respuesta con un archivo
         */
        private void sendFileResponse(PrintWriter writer, OutputStream out, Path filePath,
                                      int statusCode, String statusText) throws IOException {
            try {
                // Determinar el tipo MIME
                String mimeType = getMimeType(filePath);

                // Leer el archivo
                byte[] fileContent = Files.readAllBytes(filePath);

                // Enviar headers
                writer.print("HTTP/1.0 " + statusCode + " " + statusText + "\r\n");
                writer.print("Date: " + new Date() + "\r\n");
                writer.print("Server: JavaHTTPServer/1.0\r\n");
                writer.print("Content-Type: " + mimeType + "\r\n");
                writer.print("Content-Length: " + fileContent.length + "\r\n");
                writer.print("Connection: close\r\n");
                writer.print("\r\n");
                writer.flush();

                // Enviar contenido del archivo
                out.write(fileContent);
                out.flush();

                System.out.println("Respuesta enviada: " + statusCode + " " + statusText +
                        " - Archivo: " + filePath.getFileName() +
                        " - Tipo: " + mimeType);

            } catch (IOException e) {
                System.err.println("Error leyendo archivo: " + e.getMessage());
                sendErrorResponse(writer, out, 500, "Internal Server Error");
            }
        }

        /**
         * Envía una respuesta de error
         */
        private void sendErrorResponse(PrintWriter writer, OutputStream out,
                                       int statusCode, String statusText) {
            String errorHtml = String.format("""
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Error %d - %s</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                        h1 { color: #e74c3c; }
                    </style>
                </head>
                <body>
                    <h1>Error %d: %s</h1>
                    <p>Lo sentimos, ha ocurrido un error en el servidor.</p>
                </body>
                </html>
                """, statusCode, statusText, statusCode, statusText);

            writer.print("HTTP/1.0 " + statusCode + " " + statusText + "\r\n");
            writer.print("Date: " + new Date() + "\r\n");
            writer.print("Server: JavaHTTPServer/1.0\r\n");
            writer.print("Content-Type: text/html; charset=UTF-8\r\n");
            writer.print("Content-Length: " + errorHtml.length() + "\r\n");
            writer.print("Connection: close\r\n");
            writer.print("\r\n");
            writer.print(errorHtml);
            writer.flush();

            System.out.println("Error enviado: " + statusCode + " " + statusText);
        }

        /**
         * Determina el tipo MIME basado en la extensión del archivo
         */
        private String getMimeType(Path filePath) {
            String fileName = filePath.getFileName().toString().toLowerCase();

            if (fileName.endsWith(".html") || fileName.endsWith(".htm")) {
                return "text/html; charset=UTF-8";
            } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
                return "image/jpeg";
            } else if (fileName.endsWith(".gif")) {
                return "image/gif";
            } else if (fileName.endsWith(".png")) {
                return "image/png";
            } else if (fileName.endsWith(".css")) {
                return "text/css";
            } else if (fileName.endsWith(".js")) {
                return "application/javascript";
            } else if (fileName.endsWith(".txt")) {
                return "text/plain; charset=UTF-8";
            } else if (fileName.endsWith(".pdf")) {
                return "application/pdf";
            } else {
                return "application/octet-stream";
            }
        }

        /**
         * Cierra todos los recursos de forma segura
         */
        private void closeResources(BufferedReader in, OutputStream out, Socket socket) {
            try {
                if (in != null) in.close();
            } catch (IOException e) {
                System.err.println("Error cerrando BufferedReader: " + e.getMessage());
            }

            try {
                if (out != null) out.close();
            } catch (IOException e) {
                System.err.println("Error cerrando OutputStream: " + e.getMessage());
            }

            try {
                if (socket != null && !socket.isClosed()) {
                    socket.close();
                }
            } catch (IOException e) {
                System.err.println("Error cerrando socket: " + e.getMessage());
            }
        }
    }
}