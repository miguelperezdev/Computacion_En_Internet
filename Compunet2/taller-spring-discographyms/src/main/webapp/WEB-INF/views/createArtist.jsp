<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Crear Artista</title>
</head>
<body>
<h2>Nuevo Artista</h2>
<form method="post" action="${pageContext.request.contextPath}/createArtist">
    Nombre: <input type="text" name="name" required><br>
    Nacionalidad: <input type="text" name="nationality" required><br>
    <input type="submit" value="Guardar">
</form>
<br>
<a href="${pageContext.request.contextPath}/listArtists">Volver a la lista</a>
</body>
</html>