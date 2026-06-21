import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tu-backend-desplegado.com/api',  // ← URL del back
});

// Interceptor de petición: pega el token en cada request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor de respuesta: si el token expiró (401), limpiar y redirigir
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('jwt');
            window.location.href = '/login';   // redirección dura, mejor usar navigate pero aquí simplifico
        }
        return Promise.reject(error);
    }
);

export default api;