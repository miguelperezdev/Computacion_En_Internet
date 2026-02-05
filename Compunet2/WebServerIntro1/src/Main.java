import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * Servidor HTTP básico en Java
 * Escucha en el puerto 5000 y responde con un HTML simple
 */
public class Main {

    public static void main(String[] args) {
        try {
            new Main();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * Constructor del servidor
     * Crea el ServerSocket y queda escuchando conexiones
     */
    public Main() throws IOException {
        ServerSocket serverSocket = new ServerSocket(5000);
        System.out.println("Esperando conexiones...");

        // Permite múltiples clientes conectados
        while (true) {
            Socket socket = serverSocket.accept();
            System.out.println("Cliente conectado");

            // Se crea un hilo por cada cliente
            HttpProcess thread = new HttpProcess(socket);
            thread.start();
        }
    }

    /**
     * Clase que maneja cada conexión HTTP
     */
    public class HttpProcess extends Thread {

        private Socket socket;

        public HttpProcess(Socket socket) {
            this.socket = socket;
        }

        @Override
        public void run() {
            try {
                // Flujo de entrada (Request)
                InputStream is = socket.getInputStream();
                BufferedReader br = new BufferedReader(new InputStreamReader(is));

                // Flujo de salida (Response)
                OutputStream os = socket.getOutputStream();
                BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(os));

                // Respuesta HTTP
                String body = "<html><body>HOLA MUNDO</body></html>";

                bw.write("HTTP/1.1 200 OK\r\n");
                bw.write("Content-Type: text/html; charset=UTF-8\r\n");
                bw.write("Content-Length: " + body.length() + "\r\n");
                bw.write("\r\n"); // Línea en blanco obligatoria
                bw.write(body);
                bw.flush();

                // Leer lo que envió el cliente (request HTTP)
                String linea;
                while ((linea = br.readLine()) != null && !linea.isEmpty()) {
                    System.out.println(linea);
                }

                // Cerrar recursos
                br.close();
                bw.close();
                socket.close();

            } catch (IOException e) {
                e.printStackTrace();
            }
            
            }
        }
    }
}
