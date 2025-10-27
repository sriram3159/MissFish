// import React, { createContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);
//   // Check token when app starts
//   useEffect(() => {
//     const checkToken = async () => {
//       const token = await AsyncStorage.getItem('accessToken');
//       if (token) {
//         setIsLoggedIn(true);
//       }
//       setLoading(false);
//     };
//     checkToken();
//   }, []);

//   const login = async (accessToken, refreshToken) => {
//     await AsyncStorage.setItem('accessToken', accessToken);
//     await AsyncStorage.setItem('refreshToken', refreshToken);
//     setIsLoggedIn(true);
//   };

//   const logout = async () => {
//     await AsyncStorage.clear();
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ loading, isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check token when app starts
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        setIsLoggedIn(true);
      }
      setLoading(false);
    };
    checkToken();
  }, []);

  const login = async (accessToken, refreshToken) => {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loading, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Add this hook for easy access
export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
