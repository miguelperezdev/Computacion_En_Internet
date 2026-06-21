// Contexto de autenticación (solo token)

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
