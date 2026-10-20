// src/api/client.js
import axios from 'axios';

const api = axios.create({
  // ¡Aquí está el cambio! Apuntando a tu servidor en la nube
  baseURL: 'https://koru-backend-y42u.onrender.com',
});

// Interceptor de Petición: Inyecta el JWT automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de Respuesta: Si el token expiró (401), desloguea automáticamente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // Opcional: window.location.reload() o evento custom si expira
    }
    return Promise.reject(error);
  }
);

export default api;