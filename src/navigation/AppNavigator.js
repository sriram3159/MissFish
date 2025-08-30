// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';
// import HomeScreen from '../screens/HomeScreen';
// import OtpVerify from '../screens/OtpVerify';
// import { StatusBar } from 'react-native';
// import Order from '../screens/Order';
// import Dashboard from '../screens/Dashboard';
// import orderDelivered from '../screens/OrderDelivered';
// import Reports from '../screens/Reports';
// import AdminLayout from '../screens/AdminLayout';

// const Stack = createNativeStackNavigator();

// const AppNavigator = () => {
//   return (
//     <>
//       <StatusBar
//         translucent
//         backgroundColor="transparent" // or your gradient start color
//         barStyle="dark-content" // or "light-content" based on your theme
//       />
//       <NavigationContainer>
//         <Stack.Navigator
//           screenOptions={{ headerShown: false }}
//           initialRouteName="Home"
//         >
//           <Stack.Screen
//             name="Home"
//             component={HomeScreen}
//             options={{ title: 'home screen' }}
//           />
//           <Stack.Screen
//             name="OtpVerify"
//             component={OtpVerify}
//             options={{ title: 'OTP' }}
//           />
//           <Stack.Screen
//             name="Dashboard"
//             component={Dashboard}
//             options={{ title: 'Dashboard' }}
//           />
//           <Stack.Screen
//             name="Order"
//             component={Order}
//             options={{ title: 'Order' }}
//           />
//           <Stack.Screen
//             name="OrderDelivered"
//             component={orderDelivered}
//             options={{ title: 'OrderDelivered' }}
//           />
//           <Stack.Screen
//             name="Reports"
//             component={Reports}
//             options={{ title: 'Reports' }}
//           />
//           <Stack.Screen
//             name="AdminDashboard"
//             component={AdminLayout}
//             options={{ title: 'AdminDashboard' }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </>
//   );
// };

// export default AppNavigator;

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useContext } from 'react';

// Screens
import HomeScreen from '../screens/HomeScreen';
import OtpVerify from '../screens/OtpVerify';
import Order from '../screens/Order';
import Dashboard from '../screens/Dashboard';
import orderDelivered from '../screens/OrderDelivered';
import Reports from '../screens/Reports';
import AdminLayout from '../screens/AdminLayout';
import { AuthContext } from '../contexts/AuthContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            // Protected Routes
            <>
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="Order" component={Order} />
              <Stack.Screen name="OrderDelivered" component={orderDelivered} />
              <Stack.Screen name="Reports" component={Reports} />
              <Stack.Screen name="AdminDashboard" component={AdminLayout} />
            </>
          ) : (
            // Public Routes
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="OtpVerify" component={OtpVerify} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppNavigator;
