import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

export const subscribeToTopic = async () => {
  try {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) return;

    const response = await api.post('/auth/subscribe-topic', {
      fcm_token: fcmToken,
    });

    console.log('Subscribe Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Subscribe Error:', error);
    throw error;
  }
};

export const unsubscribeFromTopic = async () => {
  try {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) return;

    const response = await api.post('/auth/unsubscribe-topic', {
      fcm_token: fcmToken,
    });

    console.log('Unsubscribe Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Unsubscribe Error:', error);
    throw error;
  }
};
