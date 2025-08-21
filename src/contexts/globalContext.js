import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from 'react';
import { GlobalReducer, initialState } from './reducer';
import { getRequest } from '../services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } catch (err) {
      console.error('fetch error', err);
    }
  };
  const fetchCompleteOrder = async () => {
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
    fetchReport('2025-04-01', '2025-06-30');
  }, [token]);
  return (
    <GlobalContext.Provider value={{ state, dispatch, fetchReport }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
