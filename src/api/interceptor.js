import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Use a consistent key name, for example: 'token' or 'accessToken'
const AUTH_TOKEN_KEY = 'accessToken'; // You can rename this if needed

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }
  return null;
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 404) {
        console.error("404 Not Found:", error.response.data?.error);
      }

      if (error.response.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(AUTH_TOKEN_KEY);
          window.location.href = "/";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
