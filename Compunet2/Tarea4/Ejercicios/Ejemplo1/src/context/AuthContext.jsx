import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('jwt') || null);
  const [user, setUser] = useState(null);   // opcional, si el back te devuelve datos del usuario

  const navigate = useNavigate();

  // cada vez que cambie el token, lo guardo o lo borro del localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('jwt', token);
    } else {
      localStorage.removeItem('jwt');
    }
  }, [token]);

  const login = (jwt, userData = null) => {
    setToken(jwt);
    if (userData) setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate('/login');   // redirigir al login tras cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// hook personalizado para acceder al contexto
export const useAuth = () => useContext(AuthContext);

//Paso clave: En useState(() => localStorage.getItem('jwt'))
//leemos el token al cargar la app, así mantenemos la sesión incluso si se recarga
//la página