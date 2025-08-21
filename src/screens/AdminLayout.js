import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import BottomNavbar from '../components/BottomNavbar';
import AdminDashboard from './AdminDashboard';
import AdminOrderDetails from '../components/AdminOrderDetails';
import AdminOrder from '../components/AdminOrder';

const AdminLayout = () => {
  const [showOrderScreen, setShowOrderScreen] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [navType, setNavType] = useState({
    menu: true,
    order: false,
    notification: false,
    profile: false,
  });
  const [orderData, setOrderData] = useState({});

  const handleNavigate = type => {
    const updatedNav = Object.keys(navType).reduce((acc, key) => {
      acc[key] = key === type;
      return acc;
    }, {});
    setNavType(updatedNav);
    setShowOrderScreen(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor="rgba(245, 246, 251, 1)" // or your gradient start color
        barStyle="dark-content" // or "light-content" based on your theme
      />
      {navType.menu && (
        <AdminDashboard
          showOrderScreen={showOrderScreen}
          setShowOrderScreen={setShowOrderScreen}
        />
      )}
      {navType.order && (
        <AdminOrderDetails
          navbarHeight={navbarHeight}
          showOrderScreen={showOrderScreen}
          setShowOrderScreen={setShowOrderScreen}
          order={orderData}
          setOrderData={orderData}
        />
      )}

      <View
        style={{
          backgroundColor: 'transparent',
          zIndex: 3,
          position: 'relative',
          bottom: 0,
        }}
        onLayout={event => {
          const { height } = event.nativeEvent.layout;
          setNavbarHeight(height);
        }}
      >
        <BottomNavbar handleNavigate={handleNavigate} navType={navType} />
      </View>
      {showOrderScreen && <AdminOrder navbarHeight={navbarHeight} />}
    </SafeAreaView>
  );
};
export default AdminLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(245, 246, 251, 1)',
    position: 'relative',
  },
});
