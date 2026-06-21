# 📘 GUÍA DEFINITIVA PARA PARCIAL DE REACT + JWT + APIs + PERMISOS

## 🎯 Objetivo

Esta guía cubre todo lo necesario para resolver un parcial donde debas:

* Corregir código React con errores.
* Implementar autenticación JWT.
* Consumir APIs protegidas y públicas.
* Manejar estados con Hooks.
* Persistir información en LocalStorage.
* Crear rutas protegidas.
* Controlar permisos de usuario.
* Renderizar listas y tarjetas.
* Utilizar Axios y React Router.

---

# 🧠 CONCEPTOS FUNDAMENTALES

## useState

Permite almacenar valores que cambian y provocan un re-render.

```jsx
const [valor, setValor] = useState(valorInicial);
```

### Casos de uso

* Inputs
* Loading
* Mensajes de error
* Datos de APIs
* Estados de formularios
* Puntuaciones de juegos

---

## useEffect

Permite ejecutar código cuando:

* El componente se monta.
* Cambian determinadas variables.

```jsx
useEffect(() => {
  // código
}, []);
```

### Casos de uso

* Llamadas HTTP
* LocalStorage
* Timers
* Suscripciones

### Ejecución única

```jsx
useEffect(() => {
  obtenerDatos();
}, []);
```

---

## Context API

Permite compartir estado global.

```jsx
const Context = createContext();
```

Ideal para:

* Token JWT
* Usuario autenticado
* Permisos
* Login y Logout

---

## Axios

Cliente HTTP para:

```jsx
axios.get()
axios.post()
axios.put()
axios.delete()
```

---

## React Router

Permite navegar entre páginas.

Componentes principales:

```jsx
BrowserRouter
Routes
Route
Navigate
useNavigate
```

---

## LocalStorage

Guarda datos persistentes.

```jsx
localStorage.setItem("token", token);
localStorage.getItem("token");
localStorage.removeItem("token");
```

---

# 🏗️ ESTRUCTURA RECOMENDADA

```text
src/
├── api/
│   ├── axios.js
│   └── apiPublica.js
│
├── context/
│   └── AuthContext.jsx
│
├── components/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── ProtectedRoute.jsx
│   ├── ListaPublica.jsx
│   └── Tarjeta.jsx
│
├── App.jsx
└── main.jsx
```

---

# 🔐 AUTENTICACIÓN JWT

## AuthContext.jsx

```jsx
import {
 createContext,
 useContext,
 useState,
 useEffect
} from 'react';

import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {

 const [token, setToken] = useState(
   () => localStorage.getItem('token') || null
 );

 const [user, setUser] = useState(() => {
   const saved = localStorage.getItem('user');
   return saved ? JSON.parse(saved) : null;
 });

 const navigate = useNavigate();

 useEffect(() => {
   if(token){
     localStorage.setItem('token', token);
   } else {
     localStorage.removeItem('token');
   }
 }, [token]);

 useEffect(() => {
   if(user){
     localStorage.setItem(
       'user',
       JSON.stringify(user)
     );
   } else {
     localStorage.removeItem('user');
   }
 }, [user]);

 const login = (jwt, userData) => {
   setToken(jwt);
   setUser(userData);
   navigate('/dashboard');
 };

 const logout = () => {
   setToken(null);
   setUser(null);
   navigate('/login');
 };

 const tienePermiso = (permiso) => {
   return user?.permisos?.includes(permiso) ?? false;
 };

 return (
   <AuthContext.Provider
     value={{
       token,
       user,
       login,
       logout,
       tienePermiso
     }}
   >
     {children}
   </AuthContext.Provider>
 );
}

export const useAuth = () => useContext(AuthContext);
```

---

# 🌐 AXIOS CON JWT

## api/axios.js

```jsx
import axios from 'axios';

const api = axios.create({
 baseURL: 'https://backend.com/api'
});

api.interceptors.request.use((config) => {

 const token = localStorage.getItem('token');

 if(token){
   config.headers.Authorization =
     `Bearer ${token}`;
 }

 return config;
});

api.interceptors.response.use(
 response => response,

 error => {

   if(error.response?.status === 401){

     localStorage.clear();

     window.location.href = '/login';
   }

   return Promise.reject(error);
 }
);

export default api;
```

---

# 🌍 API PÚBLICA

## apiPublica.js

```jsx
import axios from 'axios';

const apiPublica = axios.create({
 baseURL: 'https://api-publica.com'
});

export default apiPublica;
```

---

# 🛡️ RUTAS PROTEGIDAS

## ProtectedRoute.jsx

```jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {

 const { token } = useAuth();

 return token
   ? children
   : <Navigate to="/login" replace />;
}
```

---

# 🔑 LOGIN

## Login.jsx

```jsx
import { useState } from 'react';

import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Login(){

 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');

 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');

 const { login } = useAuth();

 const handleSubmit = async(e) => {

   e.preventDefault();

   setLoading(true);
   setError('');

   try{

     const response =
       await api.post('/auth/login', {
         username,
         password
       });

     login(
       response.data.token,
       response.data.user
     );

   }catch(err){

     setError(
       err.response?.data?.message ||
       'Error al iniciar sesión'
     );

   }finally{
     setLoading(false);
   }
 };

 return (
   <form onSubmit={handleSubmit}>

     <input
       value={username}
       onChange={(e)=>setUsername(e.target.value)}
     />

     <input
       type="password"
       value={password}
       onChange={(e)=>setPassword(e.target.value)}
     />

     <button disabled={loading}>
       {loading ? 'Ingresando...' : 'Entrar'}
     </button>

   </form>
 );
}
```

---

# 📊 DASHBOARD PROTEGIDO

```jsx
import { useEffect, useState } from 'react';

import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Dashboard(){

 const [data, setData] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState('');

 const {
   user,
   logout,
   tienePermiso
 } = useAuth();

 useEffect(() => {

   const fetchData = async () => {

     try{

       const res =
         await api.get('/datos');

       setData(res.data);

     }catch{

       setError('Error cargando');

     }finally{

       setLoading(false);
     }
   };

   fetchData();

 }, []);

 if(loading) return <p>Cargando...</p>;

 if(error) return <p>{error}</p>;

 return (
   <div>

     <h1>
       Bienvenido {user?.nombre}
     </h1>

     <button onClick={logout}>
       Cerrar sesión
     </button>

     {tienePermiso('crear') &&
       <button>Crear</button>
     }

     {tienePermiso('editar') &&
       <button>Editar</button>
     }

     {tienePermiso('eliminar') &&
       <button>Eliminar</button>
     }

   </div>
 );
}
```

---

# 🎴 RENDERIZADO DE TARJETAS

## Tarjeta.jsx

```jsx
export default function Tarjeta({ objeto }) {

 return (
   <div className="card">

     <img
       src={objeto.imagen}
       alt={objeto.nombre}
     />

     <h3>{objeto.nombre}</h3>

     <p>{objeto.descripcion}</p>

   </div>
 );
}
```

---

# 📋 LISTA CON API PÚBLICA

```jsx
import { useState, useEffect } from 'react';

import apiPublica from '../api/apiPublica';
import Tarjeta from './Tarjeta';

export default function ListaPublica(){

 const [items, setItems] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState('');

 useEffect(() => {

   apiPublica.get('/objetos')

     .then(res => setItems(res.data))

     .catch(() =>
       setError('Error cargando')
     )

     .finally(() =>
       setLoading(false)
     );

 }, []);

 return (
   <div>

     {items.map(item => (
       <Tarjeta
         key={item.id}
         objeto={item}
       />
     ))}

   </div>
 );
}
```

---

# 🧭 CONFIGURACIÓN DE RUTAS

## App.jsx

```jsx
import {
 BrowserRouter,
 Routes,
 Route,
 Navigate
} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ListaPublica from './components/ListaPublica';

import ProtectedRoute from './components/ProtectedRoute';

export default function App(){

 return (

   <BrowserRouter>

     <AuthProvider>

       <Routes>

         <Route
           path="/login"
           element={<Login />}
         />

         <Route
           path="/publica"
           element={<ListaPublica />}
         />

         <Route
           path="/dashboard"
           element={
             <ProtectedRoute>
               <Dashboard />
             </ProtectedRoute>
           }
         />

         <Route
           path="*"
           element={<Navigate to="/dashboard" />}
         />

       </Routes>

     </AuthProvider>

   </BrowserRouter>
 );
}
```

---

# 💾 PERSISTENCIA CON LOCALSTORAGE

## Guardar progreso

```jsx
const [score, setScore] = useState(() => {

 const saved =
   localStorage.getItem('score');

 return saved
   ? parseInt(saved)
   : 0;
});

useEffect(() => {

 localStorage.setItem(
   'score',
   score
 );

}, [score]);
```

---

# 🚦 BOTONES HABILITADOS / DESHABILITADOS

```jsx
const [loading, setLoading] =
 useState(false);

<button disabled={loading}>
  {loading
   ? 'Guardando...'
   : 'Guardar'}
</button>
```

---

# ❌ ERRORES TÍPICOS DEL PARCIAL

## Error 1

```jsx
useEffect(() => {
 obtenerDatos();
});
```

### Solución

```jsx
useEffect(() => {
 obtenerDatos();
}, []);
```

---

## Error 2

```jsx
user.permisos.includes('admin')
```

### Solución

```jsx
user?.permisos?.includes('admin')
```

---

## Error 3

```jsx
const [token, setToken] =
 useState(null);
```

### Problema

Se pierde al refrescar.

### Solución

```jsx
const [token, setToken] =
 useState(
   () => localStorage.getItem('token')
 );
```

---

## Error 4

No usar interceptores.

### Solución

Utilizar instancia Axios personalizada.

---

## Error 5

No limpiar sesión.

```jsx
logout();
```

Debe eliminar:

```jsx
localStorage.removeItem('token');
localStorage.removeItem('user');
```

---

# 🎯 CHECKLIST DE 20 MINUTOS PARA EL EXAMEN

## Minuto 1-2

```bash
npm create vite@latest
npm install axios react-router-dom
```

---

## Minuto 3-5

Crear:

* AuthContext
* Axios
* ProtectedRoute

---

## Minuto 6-10

Crear Login:

* username
* password
* loading
* error

---

## Minuto 11-15

Crear Dashboard:

* useEffect
* api.get()
* loading
* error

---

## Minuto 16-18

Configurar rutas.

---

## Minuto 19-20

Verificar:

* Login
* Logout
* Persistencia
* Permisos
* API pública
* Botones deshabilitados

---

# 🚀 HOJA DE EMERGENCIA (PARA MEMORIZAR)

```jsx
// Estado
const [data, setData] = useState([]);

// Efecto
useEffect(() => {}, []);

// Contexto
const { token } = useAuth();

// Axios protegido
api.get('/ruta');

// Login
login(token, user);

// Logout
logout();

// Permisos
tienePermiso('crear');

// Renderizado condicional
{condicion && <Componente />}

// Navegación
navigate('/dashboard');

// Persistencia
localStorage.setItem('token', token);

// Lectura segura
user?.permisos?.includes('admin');

// Error seguro
err.response?.data?.message || 'Error';
```

# 🏆 REGLA DE ORO

Todo lo que cambia → `useState`

Todo lo que viene de afuera → `useEffect`

Todo lo global → `Context`

Todo lo HTTP → `Axios`

Todo lo persistente → `LocalStorage`

Todo lo privado → `ProtectedRoute`
