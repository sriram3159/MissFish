import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
// import { AuthContext } from '../contexts/AuthContext';

// const { logout } = useContext(AuthContext);

const api = axios.create({
  baseURL: 'https://seaqu.in', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach access token before requests
api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn(
      '⚠️ No token found, request sent without Authorization header',
    );
  }
  return config;
});

// Handle expired tokens
api.interceptors.response.use(
  response => response, // pass through if success
  async error => {
    const originalRequest = error.config;

    // If Unauthorized (token expired) and we haven’t retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) {
          console.error('❌ No refresh token found, logging out user');
          await AsyncStorage.clear();
          return Promise.reject(error);
        }

        // Call your refresh endpoint
        const res = await axios.post('https://seaqu.in/auth/refresh', {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken; // if backend sends a new one

        // Save tokens
        await AsyncStorage.setItem('accessToken', newAccessToken);
        if (newRefreshToken) {
          await AsyncStorage.setItem('refreshToken', newRefreshToken);
        }

        // Update headers & retry original request
        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('🔴 Refresh token failed, logging out', refreshError);
        // await logout();
        await AsyncStorage.clear();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
