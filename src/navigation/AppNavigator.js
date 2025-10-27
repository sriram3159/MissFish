import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, ActivityIndicator, View } from 'react-native';
import { useContext } from 'react';

// Screens
import HomeScreen from '../screens/HomeScreen';
import OtpVerify from '../screens/OtpVerify';
import Order from '../screens/Order';
import Dashboard from '../screens/Dashboard';
import OrderDelivered from '../screens/OrderDelivered';
import Reports from '../screens/Reports';
import AdminLayout from '../screens/AdminLayout';
import { AuthContext } from '../contexts/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Profile from '../screens/Profile';
import PersonalInfo from '../screens/PersonalInfo';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isLoggedIn, loading } = useContext(AuthContext);

  if (loading) {
    // Show splash screen / loader while checking token
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            // Protected Routes
            <>
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="Order" component={Order} />
              <Stack.Screen name="OrderDelivered" component={OrderDelivered} />
              <Stack.Screen name="Reports" component={Reports} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
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
    </SafeAreaProvider>
  );
};

export default AppNavigator;
