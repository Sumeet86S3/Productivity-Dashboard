import axios from 'axios';

// Set your deployed backend here as a safe production default
const defaultProductionBackend = 'https://productivity-dashboard-axx1.onrender.com';

const rawUrl =
  import.meta.env.VITE_API_URL?.trim() ||
  (import.meta.env.PROD ? defaultProductionBackend : 'http://localhost:5000');

const trimmed = rawUrl.replace(/\/+$/, '');
const baseURL = trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
