<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Lista de Artistas</title>
</head>
<body>
<h2>Artistas Registrados</h2>
<table border="1">
    <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Nacionalidad</th>
    </tr>
    <c:forEach var="artist" items="${artists}">
        <tr>
            <td>${artist.id}</td>
            <td>${artist.name}</td>
            <td>${artist.nationality}</td>
        </tr>
    </c:forEach>
</table>
<br>
<a href="${pageContext.request.contextPath}/createArtist">Crear nuevo artista</a> |
<a href="${pageContext.request.contextPath}/searchArtist">Buscar artista</a> |
<a href="${pageContext.request.contextPath}/deleteArtist">Eliminar artista</a> |
<a href="${pageContext.request.contextPath}/listTracks">Ver tracks</a>
</body>
</html>