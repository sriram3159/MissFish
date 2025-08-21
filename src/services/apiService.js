import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

// POST Request
export const postRequest = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw { message: 'POST request failed' };
  }
};

// PUT Request
export const putRequest = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    throw { message: 'PUT request failed' };
  }
};

// DELETE Request
export const deleteRequest = async endpoint => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    throw { message: 'DELETE request failed' };
  }
};

// GET Request
export const getRequest = async (endpoint, params = {}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
