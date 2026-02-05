import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

public class Main {

    public static void main(String[] args) throws Exception{
      new Main();
    }

    public Main() throws IOException{
        ServerSocket serverSocket = new ServerSocket(5000);
        System.out.println("Waiting for connection ..."); //Esperando la connecion del cliente al servidor

     while (true) { //Este while nos permite tener multiples ventanas activas
         // de otro modo no nos deja recargar ni crear mas de 1 conexion 
         Socket socket = serverSocket.accept();
         System.out.println("Connected to the server ");// Confirmando el servidor que ya el cliente entro


         // ESto nos permite tener un mejor flujo de datos

         InputStream is = socket.getInputStream(); //Request
         OutputStream os = socket.getOutputStream(); //Response

         BufferedReader br = new BufferedReader(
                 new InputStreamReader(is)
         ); // Me permite ver lo de internet a nivel de texto

         BufferedWriter bw = new BufferedWriter(
                 new OutputStreamWriter(os)
         );

         bw.write("HTTP/1.1 200 OK\r\n");
         bw.write("Content-Type: text/html\r\n");
         bw.write("Content-Length: 34\r\n");
         bw.write("\r\n");
         bw.write("<html><body>HOLA MUNDO</body></html>");
         bw.flush();

         //Leo lo que me mando el cliente
         String linea = "";
         while ((linea = br.readLine()) != null && !linea.isEmpty()) {
             System.out.println(linea);
         }
     }
        //Esto es lo que permite que el servidor vea informacion nuestra
    }

    //http:/localhost:5000/
}


