// Authcontext (deepseek)
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with base config
const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Add request interceptor for auth token
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  // Load user on initial render
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get('/users/me');
        setUser(data);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(data));
      } catch (err) {
        console.error('User load error:', {
          message: err.message,
          code: err.code,
          response: err.response?.data,
          stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

// In your AuthContext.js
const login = async (token, userData) => {
  try {
    // Set token immediately
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    // Then get fresh user data
    const { data } = await api.get('/users/me');
    const fullUserData = { ...data, token };
    
    localStorage.setItem('user', JSON.stringify(fullUserData));
    setUser(fullUserData);
    setIsAuthenticated(true);
    
    return fullUserData;
  } catch (err) {
    console.error('Login error:', err);
    logout();
    throw err;
  }
};

  // const login = async (token, userData) => {
  //   try {
  //     localStorage.setItem('token', token);
  //     localStorage.setItem('user', JSON.stringify(userData));
      
  //     setUser(userData);
  //     setIsAuthenticated(true);
  //     navigate(userData.isVerified ? '/profile' : '/verify-email');
  //     return true;
  //   } catch (err) {
  //     console.error('Login context error:', {
  //       message: err.message,
  //       code: err.code,
  //       stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  //     });
  //     setError('Failed to process login. Please try again.');
  //     return false;
  //   }
  // };

  const register = async (userData) => {
    try {
      const { data } = await api.post('/users/register', userData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setUser(data.user);
      setIsAuthenticated(true);
      navigate(data.user.isVerified ? '/profile' : '/verify-email');
      return true;
    } catch (err) {
      console.error('Registration error:', {
        message: err.message,
        code: err.code,
        response: err.response?.data,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      });
      setError(err.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
        api // expose the configured axios instance
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};