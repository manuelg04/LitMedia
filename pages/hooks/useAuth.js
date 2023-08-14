import { useState, useEffect } from 'react';
import axios from 'axios';

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar la aplicación
    // Puedes hacer una solicitud a un endpoint que verifica el JWT en una cookie
    axios.get('/api/loginuser').then(response => {
      if (response.status === 200) {
        setUser(response.data.user);
      }
    }).catch(error => {
      console.error('Error verifying user', error);
    });
  }, []);

  const logout = () => {
    // Borra la cookie JWT aquí
    // Puedes hacer una solicitud a un endpoint que borra la cookie
    setUser(null);
  };

  return { user, setUser, logout };
}

export default useAuth;
