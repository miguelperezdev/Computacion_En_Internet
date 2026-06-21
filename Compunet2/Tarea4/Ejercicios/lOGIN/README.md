Objetivo:
Pantalla de login que envía credenciales a un backend Spring Boot, recibe un token JWT, lo almacena en localStorage usando useState + useEffect, y muestra un mensaje de éxito. No hay navegación real, solo un botón para cerrar sesión que borra el token.

Estructura de archivos:

text
src/
├── api/
│   └── axios.js
├── context/
│   └── AuthContext.jsx
├── components/
│   └── Login.jsx
├── App.jsx
└── main.jsx
1.1 Instancia de axios (con interceptores)
api/axios.js

js
import axios from 'axios';

const api = axios.create({
baseURL: 'https://tu-backend.com/api',   // ← cambiar por URL real
});

// Interceptor: pega el token si existe
api.interceptors.request.use((config) => {
const token = localStorage.getItem('jwt');
if (token) {
config.headers.Authorization = `Bearer ${token}`;
}
return config;
});

// Interceptor: si 401, limpia todo
api.interceptors.response.use(
(res) => res,
(error) => {
if (error.response?.status === 401) {
localStorage.removeItem('jwt');
window.location.reload();   // opción sencilla
}
return Promise.reject(error);
}
);

export default api;
¿Por qué?
Así no tienes que pasar el token manualmente en cada petición; el interceptor lo hace por ti.

1.2 Contexto de autenticación (solo token)
context/AuthContext.jsx

jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
// Leer el token guardado al iniciar
const [token, setToken] = useState(() => localStorage.getItem('jwt') || null);

// Sincronizar cambios del token con localStorage
useEffect(() => {
if (token) {
localStorage.setItem('jwt', token);
} else {
localStorage.removeItem('jwt');
}
}, [token]);

const login = (jwt) => setToken(jwt);
const logout = () => setToken(null);

return (
<AuthContext.Provider value={{ token, login, logout }}>
{children}
</AuthContext.Provider>
);
}

export const useAuth = () => useContext(AuthContext);
Puntos clave:

useState(() => localStorage.getItem('jwt') || null) garantiza que el token persista al recargar.

El useEffect es un espejo: si el token cambia, se guarda/borra automáticamente.

login y logout son funciones sencillas que actualizan el estado.

1.3 Página de Login
components/Login.jsx

jsx
import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const { token, login, logout } = useAuth();

const handleSubmit = async (e) => {
e.preventDefault();
setError('');
setLoading(true);
try {
const res = await api.post('/auth/login', { username, password });
login(res.data.token);   // Guarda el token en contexto y localStorage
} catch (err) {
setError(err.response?.data?.message || 'Credenciales inválidas');
} finally {
setLoading(false);
}
};

return (
<div>
{!token ? (
<form onSubmit={handleSubmit}>
<h2>Iniciar sesión</h2>
{error && <p style={{ color: 'red' }}>{error}</p>}
<input
type="text"
placeholder="Usuario"
value={username}
onChange={(e) => setUsername(e.target.value)}
required
/>
<input
type="password"
placeholder="Contraseña"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
<button type="submit" disabled={loading}>
{loading ? 'Cargando...' : 'Entrar'}
</button>
</form>
) : (
<div>
<p>✅ Sesión iniciada</p>
<button onClick={logout}>Cerrar sesión</button>
</div>
)}
</div>
);
}
Explicación:

Se usa token del contexto para decidir qué mostrar (formulario o mensaje de éxito).

loading deshabilita el botón mientras se espera la respuesta.

error muestra el mensaje del backend si falla.

login(res.data.token) actualiza el contexto, y por el useEffect se guarda en localStorage.

1.4 App.jsx (sin rutas)
App.jsx

jsx
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';

export default function App() {
return (
<AuthProvider>
<Login />
</AuthProvider>
);
}
Prueba mental:
Al abrir la app, si no hay token, ves el formulario. Logueas, se guarda el token, y se muestra el mensaje. Si recargas, el token sigue ahí y se salta el login.