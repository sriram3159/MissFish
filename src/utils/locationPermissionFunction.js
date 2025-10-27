import { PermissionsAndroid } from 'react-native';
import { Platform } from 'react-native';

//FOR LOCATION PERMISSION
export const LOCATION_PERMISSION_FUNCTION = () =>
  new Promise(async (resolve, reject) => {
    try {
      let status;

      // Request permission based on platform
      if (Platform.OS === 'android') {
        status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      } else if (Platform.OS === 'ios') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        status = status;
      }

      // Check permission status
      if (
        status === PermissionsAndroid.RESULTS.GRANTED ||
        status === 'granted'
      ) {
        resolve(GrantedStr); // Change this to the appropriate success string
      } else if (
        status === PermissionsAndroid.RESULTS?.DENIED ||
        status === 'denied'
      ) {
        console.log(
          'Please enable location permission to perform check-in or check-out',
        );
      } else {
        resolve(RestricedStr); // Change this to the appropriate restricted string
      }
    } catch (err) {
      updateSnackbarFunction(
        dispatch,
        'error', // Change to your desired status string
        'Location Permission Denied',
      );
    }
  });
