// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   const login = (username) => {
//     setUser({ username });
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }


// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const register = async (credentials) => {
    const res = await axiosClient.post('/auth/register', credentials);
    localStorage.setItem('token', res.data.token);
    setUser({ id: res.data._id, username: res.data.username });
  };

  const login = async (credentials) => {
    const res = await axiosClient.post('/auth/login', credentials);
    localStorage.setItem('token', res.data.token);
    setUser({ id: res.data._id, username: res.data.username });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await axiosClient.get('/auth/me');
        setUser({ id: res.data.id, username: res.data.username });
      } catch {
        logout();
      }
    };
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
