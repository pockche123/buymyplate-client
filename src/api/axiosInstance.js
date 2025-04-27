
import axios from 'axios';
import { refreshAuthToken } from './refreshAuthToken'; 


// Secure storage abstraction layer
const authStorage = {
  getAccessToken: () => {
    const token = localStorage.getItem("accessToken");
    return token ? token : null; 
  },
  setAccessToken: (token) => {
    const encrypted = token; 
    localStorage.setItem("accessToken", encrypted);
  },
  clearTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(async (config) => {
//   const publicPatterns = [/^\/vehiclePlates(\/|$)/];
// if (publicPatterns.some(pattern => pattern.test(config.url))) {
//   return config;
// }
  let token = authStorage.getAccessToken();
  
  if (!token) {
    throw new axios.Cancel('No auth token available');
  }
  
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor for token refresh
axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const newTokens = await refreshAuthToken(); c
        authStorage.setAccessToken(newTokens.accessToken);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        authStorage.clearTokens();
        window.location.href = '/login'; 
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;