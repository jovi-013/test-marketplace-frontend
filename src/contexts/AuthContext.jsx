import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      apiClient.get('/users/me')
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        });
    }
  }, [token]);

  const login = async (email, password) => {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);
  
    const response = await apiClient.post('/users/token', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    setToken(access_token);

    const userResponse = await apiClient.get('/users/me');
    setUser(userResponse.data);
    return userResponse.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const register = async (email, password, userType) => {
    const userData = {
      email: email,
      password: password,
      user_type: userType,
    };
    await apiClient.post('/users/', userData);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);