import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';
import { GlobalProvider } from './src/contexts/globalContext';
import Orientation from 'react-native-orientation-locker';
import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { Provider as PaperProvider } from 'react-native-paper';
const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);
  useEffect(() => {
    const initGPSCheck = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'We need access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          checkIfLocationEnabled();
        } else {
          Alert.alert('Permission Denied', 'Location permission is required.');
        }
      } else {
        // For iOS, just check location
        checkIfLocationEnabled();
      }
    };

    const checkIfLocationEnabled = () => {
      Geolocation.getCurrentPosition(
        position => {
          console.log('Location enabled:', position);
        },
        error => {
          console.log('Location error:', error);
          if (error.code === 2) {
            Alert.alert(
              'Enable Location',
              'Please enable GPS to use location features.',
              [
                {
                  text: 'Open Settings',
                  onPress: () => Linking.openSettings(),
                },
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
              ],
              { cancelable: false },
            );
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 1000,
        },
      );
    };

    initGPSCheck();
  }, []);
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <GlobalProvider>
          <AppNavigator />
        </GlobalProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
