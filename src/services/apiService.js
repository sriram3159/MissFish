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
