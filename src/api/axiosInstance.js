
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

axiosInstance.interceptors.request.use(async (config) => {
  let token = authStorage.getAccessToken();
  
  // If no token but we have refresh token, try to refresh
  if (!token && localStorage.getItem("refreshToken")) {
    try {
      const newTokens = await refreshAuthToken();
      authStorage.setAccessToken(newTokens.accessToken);
      token = newTokens.accessToken;
    } catch (refreshError) {
      authStorage.clearTokens();
      window.location.href = '/login';
      throw new axios.Cancel('Failed to refresh token - redirecting to login');
    }
  }
  // If still no token (and no refresh token), cancel and redirect
  else if (!token) {
    authStorage.clearTokens();
    window.location.href = '/login';
    throw new axios.Cancel('No auth token available - redirecting to login');
  }
  
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});


// axiosInstance.interceptors.request.use(async (config) => {
//   let token = authStorage.getAccessToken();
  
//   if (!token) {
//     throw new axios.Cancel('No auth token available');
//   }
  
//   config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

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