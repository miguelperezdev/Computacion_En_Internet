<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Eliminar Artista</title>
</head>
<body>
<h2>Eliminar Artista por ID</h2>
<form method="post" action="${pageContext.request.contextPath}/deleteArtist">
    ID del artista: <input type="number" name="id" required>
    <input type="submit" value="Eliminar">
</form>
<c:if test="${param.error == 'invalid'}">
    <p style="color:red;">ID no válido o artista no existe</p>
</c:if>
<br>
<a href="${pageContext.request.contextPath}/listArtists">Volver a la lista</a>
</body>
</html>