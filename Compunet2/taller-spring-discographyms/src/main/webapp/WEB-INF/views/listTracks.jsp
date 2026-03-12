<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Lista de Tracks</title>
</head>
<body>
<h2>Tracks Registrados</h2>
<table border="1">
    <tr>
        <th>ID</th>
        <th>Título</th>
        <th>Género</th>
        <th>Duración</th>
        <th>Álbum</th>
        <th>Artistas</th>
    </tr>
    <c:forEach var="track" items="${tracks}">
        <tr>
            <td>${track.id}</td>
            <td>${track.title}</td>
            <td>${track.genre}</td>
            <td>${track.duration}</td>
            <td>${track.albumTitle}</td>
            <td>
                <c:forEach var="artist" items="${track.artists}" varStatus="status">
                    ${artist.name}<c:if test="${not status.last}">, </c:if>
                </c:forEach>
            </td>
        </tr>
    </c:forEach>
</table>
<br>
<a href="${pageContext.request.contextPath}/createTrack">Crear nuevo track</a> |
<a href="${pageContext.request.contextPath}/deleteTrack">Eliminar track</a> |
<a href="${pageContext.request.contextPath}/listArtists">Ver artistas</a>
</body>
</html>