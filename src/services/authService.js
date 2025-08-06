import api from './api';

export const loginUser = async credentials => {
  console.log(credentials);

  try {
    const response = await api.post('/delivery-person/login', credentials); // Replace '/login' with your login endpoint
    return response.data;
  } catch (error) {
    throw { status: 'Please Check the Mobile Number' };
  }
};
