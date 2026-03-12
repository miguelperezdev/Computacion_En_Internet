<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Crear Track</title>
</head>
<body>
<h2>Nuevo Track</h2>
<form method="post" action="${pageContext.request.contextPath}/createTrack">
    Título: <input type="text" name="title" required><br>
    Género: <input type="text" name="genre"><br>
    Duración (segundos): <input type="number" name="duration" required><br>
    Álbum: <input type="text" name="album"><br>
    Artistas (selecciona uno o más):<br>
    <c:forEach var="artist" items="${artists}">
        <input type="checkbox" name="artists" value="${artist.id}"> ${artist.name}<br>
    </c:forEach>
    <input type="submit" value="Guardar">
</form>
<br>
<a href="${pageContext.request.contextPath}/listTracks">Volver a la lista de tracks</a>
</body>
</html>