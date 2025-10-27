// import React, {
//   createContext,
//   useReducer,
//   useContext,
//   useEffect,
//   useState,
// } from 'react';
// import { PermissionsAndroid, Platform } from 'react-native';
// import { GlobalReducer, initialState } from './reducer';
// import { getRequest, postRequest } from '../services/apiService';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Geolocation from '@react-native-community/geolocation';
// import CompassHeading from 'react-native-compass-heading';

// const GlobalContext = createContext();
// export const GlobalProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(GlobalReducer, initialState);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [location, setLocation] = useState(null);
//   const [heading, setHeading] = useState(0);

//   useEffect(() => {
//     let watchId;

//     const startWatching = async () => {
//       if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         );
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           console.warn('Location permission denied');
//           return;
//         }
//       }

//       // Get initial quick fix (fast, can use cached location)
//       Geolocation.getCurrentPosition(
//         pos => {
//           setLocation({
//             latitude: pos.coords.latitude,
//             longitude: pos.coords.longitude,
//           });
//         },
//         err => console.log('Error getting current pos:', err),
//         {
//           enableHighAccuracy: false,
//           timeout: 5000,
//           maximumAge: 10000,
//         },
//       );

//       // Continuous watcher (live GPS updates)
//       watchId = Geolocation.watchPosition(
//         position => {
//           setLocation({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//         },
//         error => console.error('Watch error:', error),
//         {
//           enableHighAccuracy: true,
//           distanceFilter: 0,
//           interval: 10000, // 👈 every 10 sec
//           fastestInterval: 5000,
//         },
//       );
//     };

//     startWatching();

//     return () => {
//       if (watchId) Geolocation.clearWatch(watchId);
//     };
//   }, []);

//   useEffect(() => {
//     const loadToken = async () => {
//       try {
//         const savedToken = await AsyncStorage.getItem('accessToken');
//         if (savedToken) {
//           setToken(savedToken);
//         }
//       } catch (err) {
//         console.error('Error loading token:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadToken();
//   }, []);
//   const fetchProfile = async () => {
//     try {
//       const response = await getRequest('/delivery-person/get-profile');
//       console.log('user_detail', response.data);

//       dispatch({ type: 'SET_USER', payload: response.data });
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   const fetchIncompleteOrder = async () => {
//     try {
//       const response = await getRequest(
//         '/delivery-person/get-todays-incomplete-order',
//       );
//       console.log('incompletedOrder', response.data);

//       dispatch({
//         type: 'SET_TODAY_INCOMPLETE_ORDER',
//         payload: response.data,
//       });
//       dispatch({
//         type: 'SET_ONGOING_ORDER',
//         payload: [
//           ...response.data?.pending_order_details,
//           ...response.data?.upcoming_order_details,
//         ],
//       });
//       dispatch({
//         type: 'SET_ORDER_DETAILS',
//         payload: [
//           ...response.data?.pending_order_details,
//           ...response.data?.upcoming_order_details,
//         ],
//       });
//     } catch (err) {
//       console.error('fetch error', err);
//     }
//   };
//   const fetchCompleteOrder = async () => {
//     console.log('completed order');

//     try {
//       const response = await getRequest(
//         '/delivery-person/get-todays-completed-order',
//       );
//       console.log('completedOrder', response.data);

//       dispatch({ type: 'SET_TODAY_COMPLETE_ORDER', payload: response.data });
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   const fetchReport = async (fromData, toDate) => {
//     try {
//       const response = await getRequest(
//         `/delivery-person/get-order-report?from_date=${fromData}&to_date=${toDate}`,
//       );
//       console.log('report', response.data);

//       dispatch({ type: 'SET_REPORT', payload: response.data });
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   useEffect(() => {
//     if (!token) return; // wait until token is set
//     fetchProfile();
//     fetchIncompleteOrder();
//     fetchCompleteOrder();
//   }, [token]);
//   useEffect(() => {
//     CompassHeading.start(3, ({ heading }) => setHeading(heading));
//     return () => CompassHeading.stop();
//   }, []);
//   useEffect(() => {
//     if (!location) return;

//     const handleSubmitLoc = async () => {
//       try {
//         await postRequest('/order/update-tracking-location', {
//           latitude: location.latitude,
//           longitude: location.longitude,
//           angle: heading,
//         });
//       } catch (error) {
//         console.log('Error sending location:', error);
//       }
//     };

//     handleSubmitLoc(); // send first time

//     const intervalId = setInterval(handleSubmitLoc, 10000);

//     return () => clearInterval(intervalId);
//   }, [location?.latitude, location?.longitude]);
//   return (
//     <GlobalContext.Provider
//       value={{ state, dispatch, fetchReport, fetchIncompleteOrder, location }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };

// export const useGlobalContext = () => useContext(GlobalContext);
// Global context
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
import CompassHeading from 'react-native-compass-heading';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  // Initialize with fallback to ensure state is never null/undefined initially
  const [location, setLocation] = useState(null);
  const [heading, setHeading] = useState(0);

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
  const clearUserData = () => {
    dispatch({ type: 'SET_USER', payload: null });
    dispatch({ type: 'SET_TODAY_INCOMPLETE_ORDER', payload: null });
    dispatch({ type: 'SET_TODAY_COMPLETE_ORDER', payload: null });
    dispatch({ type: 'SET_ONGOING_ORDER', payload: [] });
    dispatch({ type: 'SET_ORDER_DETAILS', payload: [] });
    dispatch({ type: 'SET_REPORT', payload: null });
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setToken(null);
    clearUserData();
  };

  // Function to get location with retries and timeout management

  // Load token and fetch data when app starts
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('accessToken');
        if (savedToken) {
          setToken(savedToken);
          await fetchProfile();
          await fetchIncompleteOrder();
          await fetchCompleteOrder();
        } else {
          clearUserData();
        }
      } catch (err) {
        console.error('Error initializing app:', err);
        clearUserData();
      } finally {
        setLoading(false);
      }
    };
    initializeApp();
  }, []);

  useEffect(() => {
    const handleTokenChange = async () => {
      if (token) {
        await fetchProfile();
        await fetchIncompleteOrder();
        await fetchCompleteOrder();
      } else {
        clearUserData();
      }
    };
    handleTokenChange();
  }, [token]);

  useEffect(() => {
    CompassHeading.start(3, ({ heading }) => setHeading(heading));
    return () => CompassHeading.stop();
  }, []);

  useEffect(() => {
    if (
      location &&
      typeof location.latitude === 'number' &&
      typeof location.longitude === 'number'
    ) {
      const handleSubmitLoc = async () => {
        try {
          await postRequest('/order/update-tracking-location', {
            latitude: location.latitude,
            longitude: location.longitude,
            angle: heading,
          });
        } catch (error) {
          console.log('Error sending location:', error);
        }
      };
      handleSubmitLoc();
      const intervalId = setInterval(handleSubmitLoc, 10000);
      return () => clearInterval(intervalId);
    }
  }, [location?.latitude, location?.longitude, heading]);

  const fetchProfile = async () => {
    if (!token) return;
    try {
      const response = await getRequest('/delivery-person/get-profile');
      console.log('user_detail', response.data);
      dispatch({ type: 'SET_USER', payload: response.data });
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const fetchIncompleteOrder = async () => {
    if (!token) return;
    try {
      const response = await getRequest(
        '/delivery-person/get-todays-incomplete-order',
      );
      console.log('incompletedOrder', response.data);
      dispatch({ type: 'SET_TODAY_INCOMPLETE_ORDER', payload: response.data });
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
    if (!token) return;
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
    if (!token) return;
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

  const updateToken = async newToken => {
    if (newToken) {
      await AsyncStorage.setItem('accessToken', newToken);
      setToken(newToken);
    } else {
      await AsyncStorage.removeItem('accessToken');
      setToken(null);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
        fetchReport,
        fetchIncompleteOrder,
        location,
        setLocation,
        loading,
        updateToken,
        clearUserData,
        handleLogout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
