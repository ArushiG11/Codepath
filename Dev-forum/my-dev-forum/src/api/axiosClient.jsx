// src/api/axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:4000/api',    // point to your backend
  headers: { 'Content-Type': 'application/json' },
});

// Automatically include the token on every request, if present
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
