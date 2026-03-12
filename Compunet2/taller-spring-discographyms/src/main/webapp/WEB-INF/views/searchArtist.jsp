<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Buscar Artista</title>
</head>
<body>
<h2>Buscar Artista por Nombre</h2>
<form method="post" action="${pageContext.request.contextPath}/searchArtist">
    Nombre: <input type="text" name="name" required>
    <input type="submit" value="Buscar">
</form>
<c:if test="${param.error == 'notfound'}">
    <p style="color:red;">Artista no encontrado</p>
</c:if>
<br>
<a href="${pageContext.request.contextPath}/listArtists">Volver</a>
</body>
</html>