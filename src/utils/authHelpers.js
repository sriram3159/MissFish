import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export const isTokenValid = token => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return false;
    const now = Date.now() / 1000; // current time in seconds
    return decoded.exp > now;
  } catch (error) {
    return false;
  }
};

export const getValidAccessToken = async () => {
  let accessToken = await AsyncStorage.getItem('accessToken');
  const refreshToken = await AsyncStorage.getItem('refreshToken');

  // ✅ Access token still valid → return it
  if (isTokenValid(accessToken)) return accessToken;

  // ❌ Access token expired → try refreshing
  if (isTokenValid(refreshToken)) {
    try {
      const res = await api.post('/api/token/refresh/', {
        refresh: refreshToken,
      });

      if (res.data?.access) {
        await AsyncStorage.setItem('accessToken', res.data.access);
        return res.data.access;
      }
    } catch (err) {
      console.log('Error refreshing token:', err);
    }
  }

  // ❌ Both expired → clear and return null
  await AsyncStorage.removeItem('accessToken');
  await AsyncStorage.removeItem('refreshToken');
  return null;
};
