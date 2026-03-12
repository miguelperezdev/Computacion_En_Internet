<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Eliminar Track</title>
</head>
<body>
<h2>Eliminar Track por ID</h2>
<form method="post" action="${pageContext.request.contextPath}/deleteTrack">
    ID del track: <input type="number" name="id" required>
    <input type="submit" value="Eliminar">
</form>
<c:if test="${param.error == 'invalid'}">
    <p style="color:red;">ID no válido o track no existe</p>
</c:if>
<br>
<a href="${pageContext.request.contextPath}/listTracks">Volver a la lista de tracks</a>
</body>
</html>