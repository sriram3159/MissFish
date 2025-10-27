import { Platform, PermissionsAndroid } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

export const requestLocationPermission = async () => {
  try {
    let permission;

    if (Platform.OS === 'android') {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    } else {
      permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    }

    const status = await check(permission);
    console.log('📍 Location permission status:', status);

    if (status === RESULTS.UNAVAILABLE) {
      console.log('📍 Location services are not available');
      return false;
    }

    if (status === RESULTS.DENIED || status === RESULTS.LIMITED) {
      console.log('📍 Requesting location permission...');
      const requestResult = await request(permission);

      if (requestResult === RESULTS.GRANTED) {
        console.log('✅ Location permission granted');
        return true;
      } else if (requestResult === RESULTS.DENIED) {
        console.log('❌ Location permission denied');
        return false;
      } else if (requestResult === RESULTS.BLOCKED) {
        console.log('❌ Location permission blocked');
        return false;
      }
    } else {
      console.log('📍 Location permission already granted');
      return true;
    }
  } catch (error) {
    console.error('📍 Error requesting location permission:', error);
    return false;
  }
};

export const getCurrentLocation = async () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      },
    );
  });
};
