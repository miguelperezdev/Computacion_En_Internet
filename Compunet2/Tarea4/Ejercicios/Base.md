Comandos principales :

npm create vite@latest nombre-proyecto -- --template react
cd nombre-proyecto
npm install axios react-router-dom
npm run dev

estructura de carpetas :

src/
    api/
        axios.js          ← instancia de axios con interceptores
context/
    AuthContext.jsx   ← contexto de autenticación
components/
    ProtectedRoute.jsx
    Login.jsx
    Dashboard.jsx     ← o la vista principal que consuma la API protegida
    QuestionCard.jsx  ← (si es quiz)
App.jsx
main.jsx

¿Qué tienes que saber sí o sí?
useState: guardar valores que cambian (inputs, loading, errores, datos de API).

useEffect: ejecutar código cuando el componente se monta o cuando cambian dependencias (llamadas a APIs, guardar en localStorage).

Context API (useContext): compartir datos entre muchos componentes sin pasar props (token, usuario).

Axios: hacer peticiones HTTP, interceptores para añadir el token.

react-router-dom: navegación, rutas protegidas.

localStorage: guardar el token y otros estados para que persistan al recargar.

Operador ?. y || : acceder a propiedades de objetos de forma segura.

Principio clave: Todo lo que veas en pantalla es un estado. Todo lo que venga de un servidor se pide con un efecto. El token va en contexto y se persiste en localStorage. Axios lo pega automáticamente.