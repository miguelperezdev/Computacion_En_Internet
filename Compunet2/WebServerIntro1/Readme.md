# Servidor HTTP Multihilo en Java

Servidor web HTTP/1.0 multihilo implementado en Java puro, sin frameworks externos.

## 📋 Características

- ✅ Escucha conexiones TCP en puerto configurable (>1024)
- ✅ Arquitectura multihilo (un hilo por solicitud HTTP)
- ✅ Soporta HTTP/1.0 con método GET
- ✅ Muestra solicitudes y headers por consola
- ✅ Respuestas HTTP válidas con CRLF
- ✅ Soporta HTML, imágenes (JPG, GIF, PNG), CSS, JS
- ✅ Manejo de errores 404 con página personalizada
- ✅ Cierre seguro de sockets y streams
- ✅ Opera de forma continua

## 🚀 Cómo ejecutar

### Compilación:
```bash
javac Main.java