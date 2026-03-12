<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Detalle del Artista</title>
</head>
<body>
<h2>${artist.name}</h2>
<p><strong>Nacionalidad:</strong> ${artist.nationality}</p>
<p><strong>ID:</strong> ${artist.id}</p>

<h3>Tracks asociados:</h3>
<c:if test="${empty artist.tracks}">
    <p>Este artista no tiene tracks registrados.</p>
</c:if>
<c:if test="${not empty artist.tracks}">
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Género</th>
            <th>Duración (seg)</th>
            <th>Álbum</th>
        </tr>
        <c:forEach var="track" items="${artist.tracks}">
            <tr>
                <td>${track.id}</td>
                <td>${track.title}</td>
                <td>${track.genre}</td>
                <td>${track.duration}</td>
                <td>${track.albumTitle}</td>
            </tr>
        </c:forEach>
    </table>
</c:if>
<br>
<a href="${pageContext.request.contextPath}/searchArtist">Nueva búsqueda</a> |
<a href="${pageContext.request.contextPath}/listArtists">Volver a artistas</a>
</body>
</html>