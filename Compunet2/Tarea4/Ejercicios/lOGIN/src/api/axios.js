//Instancia de axios (con interceptores)
import axios from 'axios';

const api = axios.create({ baseURL: 'https://reqres.in/api' });

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token'); // o adentro puede ser JWT
            window.location.href = '/login'; // o  window.location.reload();   // opción sencilla
        }
        return Promise.reject(error);
    }
);

export default api;

//¿Por qué?
// Así no tienes que pasar el token manualmente en cada petición; el interceptor lo hace por ti.