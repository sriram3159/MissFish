import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { GlobalReducer, initialState } from './reducer';
import { getRequest, postRequest } from '../services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { GOOGLE_MAPS_APIKEY } from '@env';

const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let watchId;

    const startWatching = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('Location permission denied');
          return;
        }
      }

      // Get initial quick fix (fast, can use cached location)
      Geolocation.getCurrentPosition(
        pos => {
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        err => console.log('Error getting current pos:', err),
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 10000,
        },
      );

      // Continuous watcher (live GPS updates)
      watchId = Geolocation.watchPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => console.error('Watch error:', error),
        {
          enableHighAccuracy: true,
          distanceFilter: 0,
          interval: 10000, // 👈 every 10 sec
          fastestInterval: 5000,
        },
      );
    };

    startWatching();

    return () => {
      if (watchId) Geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('accessToken');
        if (savedToken) {
          setToken(savedToken);
        }
      } catch (err) {
        console.error('Error loading token:', err);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);
  const fetchProfile = async () => {
    try {
      const response = await getRequest('/delivery-person/get-profile');
      console.log('user_detail', response.data);

      dispatch({ type: 'SET_USER', payload: response.data });
    } catch (err) {
      console.error(err);
    }
  };
  const fetchIncompleteOrder = async () => {
    try {
      const response = await getRequest(
        '/delivery-person/get-todays-incomplete-order',
      );
      console.log('incompletedOrder', response.data);

      dispatch({
        type: 'SET_TODAY_INCOMPLETE_ORDER',
        payload: response.data,
      });
      dispatch({
        type: 'SET_ONGOING_ORDER',
        payload: [
          ...response.data?.pending_order_details,
          ...response.data?.upcoming_order_details,
        ],
      });
      dispatch({
        type: 'SET_ORDER_DETAILS',
        payload: [
          ...response.data?.pending_order_details,
          ...response.data?.upcoming_order_details,
        ],
      });
    } catch (err) {
      console.error('fetch error', err);
    }
  };
  const fetchCompleteOrder = async () => {
    console.log('completed order');

    try {
      const response = await getRequest(
        '/delivery-person/get-todays-completed-order',
      );
      console.log('completedOrder', response.data);

      dispatch({ type: 'SET_TODAY_COMPLETE_ORDER', payload: response.data });
    } catch (err) {
      console.error(err);
    }
  };
  const fetchReport = async (fromData, toDate) => {
    try {
      const response = await getRequest(
        `/delivery-person/get-order-report?from_date=${fromData}&to_date=${toDate}`,
      );
      console.log('report', response.data);

      dispatch({ type: 'SET_REPORT', payload: response.data });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchProfile();
    fetchIncompleteOrder();
    fetchCompleteOrder();
    // fetchReport('2025-04-01', '2025-08-30');
  }, [token]);
  useEffect(() => {
    if (!location) return;
    console.log(location);

    const handleSubmitLoc = async () => {
      try {
        const data = await postRequest('/order/update-tracking-location', {
          latitude: location.latitude,
          longitude: location.longitude,
        });
        console.log('Location sent:', data);
      } catch (error) {
        console.log('Error sending location:', error);
      }
    };

    // call immediately first time
    handleSubmitLoc();

    // then repeat every 10s
    const intervalId = setInterval(() => {
      handleSubmitLoc();
    }, 10000);

    // cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [location]); // depends on location
  return (
    <GlobalContext.Provider
      value={{ state, dispatch, fetchReport, fetchIncompleteOrder, location }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
