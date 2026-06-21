# Utiliza una imagen base de Java
FROM amazoncorretto:21-alpine

# Establece el directorio de trabajo en la imagen
WORKDIR /app

# Copia el archivo JAR del backend al directorio de trabajo
COPY ./target/artifact.jar /app/backend.jar

# Expone el puerto en el que se ejecutará el backend (ajusta el número de puerto según tus necesidades)
EXPOSE 8081

# Comando para ejecutar la aplicación Spring Boot
CMD ["java", "-jar", "backend.jar"]