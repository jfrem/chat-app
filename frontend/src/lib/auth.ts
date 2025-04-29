import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { disconnectEcho, initEcho } from './echo';

// Constantes
const TOKEN_KEY = 'chat_auth_token';
const USER_KEY = 'chat_user';

// Tipos
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  last_online_at?: string;
  settings?: Record<string, any>;
}

interface LoginResponse {
  token: string;
  user: User;
}

// Funciones de manejo de tokens
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// Funciones de manejo de usuario
export const setUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem(USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

export const removeUser = (): void => {
  localStorage.removeItem(USER_KEY);
};

// Funciones de autenticación
export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response = await axios.post<LoginResponse>('/api/login', {
      email,
      password,
    });

    const { token, user } = response.data;
    
    // Guardar token y usuario
    setToken(token);
    setUser(user);
    
    // Configurar axios para incluir el token en las solicitudes
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    // Inicializar Echo para WebSockets
    initEcho(token);
    
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  const token = getToken();
  
  try {
    if (token) {
      // Configurar axios con el token actual
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Llamar al endpoint de logout
      await axios.post('/api/logout');
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Limpiar autenticación localmente incluso si el endpoint falla
    removeToken();
    removeUser();
    delete axios.defaults.headers.common['Authorization'];
    
    // Desconectar Echo WebSockets
    disconnectEcho();
  }
};

export const register = async (
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string
): Promise<User> => {
  try {
    const response = await axios.post<LoginResponse>('/api/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });

    const { token, user } = response.data;
    
    // Guardar token y usuario
    setToken(token);
    setUser(user);
    
    // Configurar axios para incluir el token en las solicitudes
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    // Inicializar Echo para WebSockets
    initEcho(token);
    
    return user;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

// Hook de protección de rutas
export const useAuth = (): {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
} => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Verificar autenticación
    const checkAuth = async () => {
      const token = getToken();
      const userData = getUser();

      if (token && userData) {
        // Configurar axios con el token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        try {
          // Verificar token con el servidor
          await axios.get('/api/user');
          
          // Token válido, configurar estado autenticado
          setIsAuthenticated(true);
          setUser(userData);
          
          // Inicializar Echo si aún no está inicializado
          initEcho(token);
        } catch (error) {
          console.error('Token validation error:', error);
          // Token inválido, limpiar autenticación
          removeToken();
          removeUser();
          setIsAuthenticated(false);
          setUser(null);
          
          // Redirigir a login
          router.push('/login');
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        
        // Redirigir a login si la ruta actual requiere autenticación
        const publicRoutes = ['/login', '/register', '/password/reset'];
        if (!publicRoutes.includes(router.pathname)) {
          router.push('/login');
        }
      }
      
      setLoading(false);
    };

    checkAuth();
    
    // Limpiar al desmontar
    return () => {
      // No es necesario limpiar nada aquí
    };
  }, [router]);

  return { isAuthenticated, user, loading };
};

// Hook para importaciones necesarias
import { useState } from 'react';