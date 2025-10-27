// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   FlatList,
//   RefreshControl,
//   Button,
// } from 'react-native';
// import colorsset from '../utils/colors';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { SF, SH, SW } from '../utils/dimensions';
// import { TouchableOpacity } from 'react-native';
// import images from '../image/images';
// import { useCallback, useContext, useEffect, useState } from 'react';
// import {} from 'react-native';
// import { useGlobalContext } from '../contexts/globalContext';
// import getTimeDuration from '../utils/timeDurationConversion';
// import { AuthContext } from '../contexts/AuthContext';
// import { getStatusBarHeight } from 'react-native-status-bar-height';
// import {
//   sendTestNotification,
//   setupNotificationListeners,
//   setupNotifications,
//   testNotifee,
// } from '../services/notifications';

// const order_statuses = [
//   { id: 1, title: 'Pending' },
//   { id: 2, title: 'Order Accepted' },
//   { id: 3, title: 'Processing' },
//   { id: 4, title: 'Ready' },
//   { id: 5, title: 'Shipped' },
//   { id: 6, title: 'Order is Picked Up' },
//   { id: 7, title: 'Delivered' },
//   { id: 8, title: 'Request to Cancel' },
//   { id: 9, title: 'Cancelled' },
//   { id: 10, title: 'Declined' },
// ];

// // color mapping (use exact titles from order_statuses)
// const orderStatusColor = {
//   Pending: {
//     color: '#BB9900',
//     backgroundColor: 'rgba(255, 225, 89, 0.2)',
//   },
//   'Order Accepted': {
//     color: '#0066FF',
//     backgroundColor: 'rgba(0, 102, 255, 0.2)',
//   },
//   Processing: {
//     color: '#BB9900',
//     backgroundColor: 'rgba(255, 225, 89, 0.2)',
//   },
//   Ready: {
//     color: '#FF9900',
//     backgroundColor: 'rgba(255, 165, 0, 0.2)',
//   },
//   Shipped: {
//     color: '#FF5963',
//     backgroundColor: 'rgba(255, 89, 99, 0.2)',
//   },
//   'Order is Picked Up': {
//     color: '#0066FF',
//     backgroundColor: 'rgba(0, 102, 255, 0.2)',
//   },
//   Delivered: {
//     color: 'rgba(0, 123, 59, 1)',
//     backgroundColor: 'rgba(106, 255, 89, 0.2)',
//   },
//   'Request to Cancel': {
//     color: '#FF0000',
//     backgroundColor: 'rgba(255, 0, 0, 0.2)',
//   },
//   Cancelled: {
//     color: '#888',
//     backgroundColor: 'rgba(200, 200, 200, 0.2)',
//   },
//   Declined: {
//     color: '#444',
//     backgroundColor: 'rgba(150, 150, 150, 0.2)',
//   },
// };

// // helper function: get color based on numeric status code
// const getOrderStatusStyle = statusCode => {
//   const statusObj = order_statuses.find(s => s.id === statusCode);
//   if (!statusObj) return { color: '#000', backgroundColor: '#eee' }; // default
//   return (
//     orderStatusColor[statusObj.title] || {
//       color: '#000',
//       backgroundColor: '#eee',
//     }
//   );
// };
// // helper function: get color based on numeric status code
// const getOrderStatus = statusCode => {
//   const statusObj = order_statuses.find(s => s.id === statusCode);
//   return statusObj.title;
// };
// // helper function: get color based on numeric status code
// const getPaymentStatus = statusCode => {
//   const statusObj = order_statuses.find(s => s.id === statusCode);
//   return statusObj.title;
// };

// const paidStatusColor = {
//   captured: {
//     color: 'rgba(0, 123, 59, 1)',
//     backgroundColor: 'rgba(106, 255, 89, 0.2)',
//   },
//   ['pending']: {
//     color: '#000000',
//     backgroundColor: 'rgba(199, 199, 199, 0.2)',
//   },
// };

// const OrderCard = ({ orderDetail, handleNavigate, origin }) => (
//   <TouchableOpacity
//     onPress={() => handleNavigate(orderDetail)}
//     style={styles.card}
//   >
//     <View
//       style={{
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//       }}
//     >
//       <Text style={styles.orderId}>Order ID: #{orderDetail?.id}</Text>
//       <Text
//         style={{
//           color: `${
//             orderDetail?.delivery_details?.accept_status !== 3
//               ? getOrderStatusStyle(orderDetail?.status)?.color
//               : orderStatusColor['Request to Cancel']?.color
//           }`,
//           fontWeight: 700,
//           fontSize: SF(14),
//           backgroundColor: `${
//             orderDetail?.delivery_details?.accept_status !== 3
//               ? getOrderStatusStyle(orderDetail?.status)?.backgroundColor
//               : orderStatusColor['Request to Cancel']?.backgroundColor
//           }`,
//           paddingVertical: SH(3),
//           paddingHorizontal: SW(8),
//           borderRadius: SF(6),
//         }}
//       >
//         {orderDetail?.delivery_details?.accept_status !== 3
//           ? getOrderStatus(orderDetail?.status)
//           : 'Order Declined'}
//       </Text>
//     </View>

//     <View style={styles.dropContainer}>
//       <View style={styles.pickupSubContainer}>
//         <View
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: SH(5),
//             alignItems: 'center',
//           }}
//         >
//           <View style={styles.locationContainer}>
//             <Icon name="location-outline" size={SF(14)} color={'white'} />
//           </View>

//           <Text
//             style={{ color: '#000000', fontWeight: '600', fontSize: SF(8) }}
//           >
//             {'['}
//             {orderDetail?.location.total_km} KM
//             {']'}
//           </Text>
//         </View>
//         <View style={styles.pickupSubContainerText}>
//           <Text style={styles.pickupName}>{orderDetail?.customer?.name}</Text>
//           <View style={styles.duration}>
//             <Text style={styles.pickupAddress}>
//               {orderDetail?.contact_details?.meta?.address}
//             </Text>
//           </View>
//         </View>
//       </View>
//     </View>
//     <View
//       style={{
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//       }}
//     >
//       <View
//         style={{
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//           gap: SW(3),
//         }}
//       >
//         <Icon name="time-outline" size={SF(16)} color={'#1332D0'} />

//         <Text style={styles.durationText}>
//           {getTimeDuration(orderDetail?.delivery_expected_time).current} -{' '}
//           {getTimeDuration(orderDetail?.delivery_expected_time).extra}
//         </Text>
//       </View>

//       <Text
//         style={{
//           color: `${paidStatusColor[orderDetail?.payment?.status]?.color}`,
//           fontWeight: 700,
//           fontSize: SF(14),
//           backgroundColor: 'rgba(199, 199, 199, 0.2)',
//           paddingVertical: SH(3),
//           paddingHorizontal: SW(4),
//           borderRadius: SF(4),
//         }}
//       >
//         {orderDetail?.payment?.status === 'pending' ? 'Not Paid' : 'Paid'} ₹{' '}
//         {orderDetail?.payment?.amount}
//       </Text>
//     </View>
//     <Icon
//       name="chevron-down-sharp"
//       color="rgba(255, 89, 99, 1)"
//       size={SF(20)}
//       style={{ textAlign: 'center' }}
//     />
//   </TouchableOpacity>
// );

// const fromLocation = {
//   latitude: 8.094902240100733,
//   longitude: 77.48392429159924,
// };

// const Dashboard = ({ navigation }) => {
//   const { state, dispatch, fetchIncompleteOrder, location } =
//     useGlobalContext();
//   const { todayIncompleteOrder, todayCompleteOrder, orderNav, ongoingOrder } =
//     state;
//   const [refreshing, setRefreshing] = useState(false);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     // ⬇️ Call your API or reload dashboard data
//     fetchIncompleteOrder().then(() => {
//       setRefreshing(false);
//     });
//   }, []);

//   useEffect(() => {
//     fetchIncompleteOrder();
//   }, []);

//   const [isOnGoing, setisOnGoing] = useState(true);

//   const handleNavigate = orderDetail => {
//     navigation.navigate('Order', { orderDetail });
//   };
//   const handleNavigateReport = () => {
//     navigation.navigate('Profile');
//     // navigation.navigate('Reports');
//   };
//   const handleOrderStatus = type => {
//     if (type === 'onGoing') {
//       setisOnGoing(true);
//     } else {
//       setisOnGoing(false);
//     }
//   };
//   useEffect(() => {
//     if (ongoingOrder?.length > 0) {
//       dispatch({
//         type: 'SET_ORDER_NAV',
//         payload: ongoingOrder,
//       });
//     }
//   }, [ongoingOrder]);

//   const STATUSBAR_HEIGHT =
//     Platform.OS === 'android' ? StatusBar.currentHeight : 0;

//   return (
//     <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
//       {/* Add translucent status bar */}

//       <View style={styles.scrollContent}>
//         <View style={styles.innerContainer}>
//           <TouchableOpacity
//             onPress={handleNavigateReport}
//             style={styles.circleButton}
//           >
//             <View style={styles.lineContainer}>
//               <View style={styles.line_1} />
//               <View style={styles.line_2} />
//               <View style={styles.line_3} />
//             </View>
//           </TouchableOpacity>
//           <Text style={{ fontSize: SF(20), fontWeight: 600, color: '#5E5E5E' }}>
//             {state?.user?.employee?.name}
//           </Text>
//         </View>

//         <View
//           style={{
//             gap: SH(21),
//             marginTop: SH(27),
//           }}
//         >
//           <View
//             style={{
//               paddingHorizontal: SW(13),
//               paddingTop: SH(11),
//               paddingBottom: SH(22),
//               backgroundColor: '#FFFFFF',
//               borderRadius: SF(10),
//               // Shadow for iOS
//               shadowColor: '#414141',
//               shadowOffset: { width: 0, height: -2 },
//               shadowOpacity: 0.15,
//               shadowRadius: 20, // 40px blur in Figma ≈ 20 in RN

//               // Shadow for Android
//               elevation: 8,
//             }}
//           >
//             <Text
//               style={{ color: '#BA0505', fontSize: SF(22), fontWeight: 600 }}
//             >
//               Today’s Summary
//             </Text>
//             <View
//               style={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 marginHorizontal: SW(17),
//                 justifyContent: 'space-between',
//                 marginTop: SH(16),
//               }}
//             >
//               <View
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <Image
//                   source={images.assigned}
//                   resizeMode="contain"
//                   style={styles.assignedImage}
//                 />
//                 <Text
//                   style={{
//                     color: '#7C7676',
//                     fontWeight: 600,
//                     fontSize: SF(12),
//                     paddingVertical: SH(4),
//                   }}
//                 >
//                   Assigned
//                 </Text>
//                 <Text
//                   style={{
//                     color: '#000000',
//                     fontWeight: 600,
//                     fontSize: SF(16),
//                   }}
//                 >
//                   {ongoingOrder?.length} Orders
//                 </Text>
//               </View>
//               <View
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <Image
//                   source={images.delivered}
//                   resizeMode="contain"
//                   style={styles.deliveredImage}
//                   onPress={() => navigation.navigate('Nav')}
//                 />
//                 <Text
//                   style={{
//                     color: '#7C7676',
//                     fontWeight: 600,
//                     fontSize: SF(12),
//                     paddingVertical: SH(4),
//                   }}
//                 >
//                   Delivered
//                 </Text>
//                 <Text
//                   style={{
//                     color: '#000000',
//                     fontWeight: 600,
//                     fontSize: SF(16),
//                   }}
//                 >
//                   {ongoingOrder.filter(items => items.status === 7).length}{' '}
//                   Orders
//                 </Text>
//               </View>
//               <View
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <Image
//                   source={images.rides}
//                   resizeMode="contain"
//                   style={styles.ridesImage}
//                 />
//                 <Text
//                   style={{
//                     color: '#7C7676',
//                     fontWeight: 600,
//                     fontSize: SF(12),
//                     paddingVertical: SH(4),
//                   }}
//                 >
//                   Rides
//                 </Text>
//                 <Text
//                   style={{
//                     color: '#000000',
//                     fontWeight: 600,
//                     fontSize: SF(16),
//                   }}
//                 >
//                   {ongoingOrder
//                     .filter(items => items.status === 7)
//                     ?.reduce((a, b) => a + b.location.total_km, 0)
//                     ?.toFixed(2) || 0}
//                   KM
//                 </Text>
//               </View>
//             </View>
//           </View>
//           <View
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               gap: SW(10),
//             }}
//           >
//             <View
//               style={{
//                 backgroundColor: '#FFFFFF',
//                 borderRadius: SF(10),
//                 // Shadow for iOS
//                 shadowColor: '#414141',
//                 shadowOffset: { width: 0, height: -2 },
//                 shadowOpacity: 0.15,
//                 shadowRadius: 20, // 40px blur in Figma ≈ 20 in RN

//                 // Shadow for Android
//                 elevation: 8,
//                 flex: 2,
//               }}
//             >
//               <Image
//                 source={images.waiting}
//                 resizeMode="contain"
//                 style={styles.waitingImage}
//               />
//               <View
//                 style={{
//                   paddingLeft: SW(14),
//                   paddingTop: SH(16),
//                   paddingBottom: SH(13),
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: '#000000',
//                     fontWeight: 600,
//                     fontSize: SF(65),
//                     paddingLeft: SW(5),
//                   }}
//                 >
//                   {todayIncompleteOrder?.pending_order_details?.filter(
//                     order => order.status !== 7,
//                   )?.length || 0}
//                 </Text>

//                 <View
//                   style={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     paddingTop: SH(16),
//                   }}
//                 >
//                   <Text
//                     style={{
//                       color: '#000000',
//                       fontWeight: 600,
//                       fontSize: SF(15),
//                     }}
//                   >
//                     Pending Orders
//                   </Text>
//                   <Icon
//                     name="caret-forward-sharp"
//                     color={colorsset.theme_dark_gray}
//                     size={SF(17)}
//                   />
//                 </View>
//               </View>
//             </View>
//             <View
//               style={{
//                 backgroundColor: '#FFFFFF',
//                 borderRadius: SF(10),
//                 // Shadow for iOS
//                 shadowColor: '#414141',
//                 shadowOffset: { width: 0, height: -2 },
//                 shadowOpacity: 0.15,
//                 shadowRadius: 20, // 40px blur in Figma ≈ 20 in RN

//                 // Shadow for Android
//                 elevation: 8,
//                 flex: 2,
//               }}
//             >
//               <Image
//                 source={images.waiting}
//                 resizeMode="contain"
//                 style={styles.waitingImage}
//               />
//               <View
//                 style={{
//                   paddingLeft: SW(14),
//                   paddingTop: SH(16),
//                   paddingBottom: SH(13),
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: '#000000',
//                     fontWeight: 600,
//                     fontSize: SF(65),
//                     paddingLeft: SW(5),
//                   }}
//                 >
//                   {todayIncompleteOrder?.upcoming_order_details?.filter(
//                     order => order.status !== 7,
//                   )?.length || 0}
//                 </Text>

//                 <View
//                   style={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     paddingTop: SH(16),
//                   }}
//                 >
//                   <Text
//                     style={{
//                       color: '#000000',
//                       fontWeight: 600,
//                       fontSize: SF(15),
//                     }}
//                   >
//                     Upcoming Orders
//                   </Text>
//                   <Icon
//                     name="caret-forward-sharp"
//                     color={colorsset.theme_dark_gray}
//                     size={SF(17)}
//                   />
//                 </View>
//               </View>
//             </View>
//           </View>

//           <View
//             style={{
//               backgroundColor: '#FFFFFF',
//               borderRadius: SF(10),
//               // Shadow for iOS
//               shadowColor: '#414141',
//               shadowOffset: { width: 0, height: -2 },
//               shadowOpacity: 0.15,
//               shadowRadius: 20, // 40px blur in Figma ≈ 20 in RN

//               // Shadow for Android
//               elevation: 8,
//               display: 'flex',
//               flexDirection: 'row',
//               padding: SF(4),
//             }}
//           >
//             <TouchableOpacity
//               style={{
//                 flex: 2,
//                 paddingVertical: SH(11),
//                 borderRadius: SF(10),
//                 display: 'flex',
//                 flexDirection: 'row',
//                 backgroundColor: `${isOnGoing ? '#32ADE6' : '#FFFFFF'}`,
//                 justifyContent: 'center',
//               }}
//               onPress={() => handleOrderStatus('onGoing')}
//             >
//               <Text
//                 style={{
//                   fontSize: SF(15),
//                   fontWeight: 600,
//                   color: `${isOnGoing ? '#FFFFFF' : '#000000'}`,
//                 }}
//               >
//                 Ongoing
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{
//                 flex: 2,
//                 paddingVertical: SH(11),
//                 backgroundColor: `${isOnGoing ? '#FFFFFF' : '#32ADE6'}`,
//                 borderRadius: SF(10),
//                 display: 'flex',
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//               }}
//               onPress={() => handleOrderStatus('completed')}
//             >
//               <Text
//                 style={{
//                   fontSize: SF(15),
//                   fontWeight: 600,
//                   color: `${isOnGoing ? '#000000' : '#FFFFFF'}`,
//                 }}
//               >
//                 Completed
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <View>
//             <FlatList
//               data={orderNav.filter(items =>
//                 !isOnGoing ? items.status === 7 : items.status !== 7,
//               )}
//               keyExtractor={item => item.orderId}
//               renderItem={({ item }) => (
//                 <OrderCard
//                   orderDetail={item}
//                   handleNavigate={handleNavigate}
//                   origin={fromLocation}
//                 />
//               )}
//               contentContainerStyle={styles.orderContainer}
//               showsVerticalScrollIndicator={false}
//               refreshControl={
//                 <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//               }
//             />
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Dashboard;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colorsset.theme_backgound_second,
//     paddingTop: getStatusBarHeight(),
//   },
//   scrollContent: {
//     paddingBottom: SF(20),
//     marginHorizontal: SW(19),
//   },
//   innerContainer: {
//     paddingTop: SH(6),
//     gap: SW(12),
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   circleButton: {
//     width: SF(45),
//     height: SF(45),
//     backgroundColor: '#ECF0F4',
//     borderRadius: SF(45) / 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   lineContainer: {
//     justifyContent: 'space-between',
//     gap: SH(6),
//   },
//   line_1: {
//     width: SW(6),
//     height: 2,
//     backgroundColor: '#2B2E35',
//     borderRadius: 1,
//   },
//   line_2: {
//     width: SW(16),
//     height: 2,
//     backgroundColor: '#2B2E35',
//     borderRadius: 1,
//   },
//   line_3: {
//     width: SW(10),
//     height: 2,
//     backgroundColor: '#2B2E35',
//     borderRadius: 1,
//   },
//   deliveredImage: {
//     width: SW(61),
//     height: SH(44),
//   },
//   assignedImage: {
//     width: SW(44),
//     height: SH(44),
//   },
//   waitingImage: {
//     width: SF(42),
//     height: SF(42),
//     position: 'absolute',
//     right: SW(7),
//     top: SH(9),
//   },
//   ridesImage: {
//     width: SW(74),
//     height: SH(44),
//   },

//   orderContainer: {
//     gap: SH(16),
//     paddingBottom: SH(1600),
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: SF(8),
//     padding: SF(10),
//     shadowColor: '#414141',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 20, // 40px blur in Figma ≈ 20 in RN

//     // Shadow for Android
//     elevation: 3,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   text: {
//     fontSize: 14,
//     marginBottom: 2,
//     color: '#555',
//   },
//   orderId: {
//     fontSize: SF(19),
//     color: '#707070',
//     fontWeight: 700,
//   },
//   dropContainer: {
//     marginTop: SH(10),
//     marginBottom: SH(12),
//   },
//   locationContainer: {
//     width: SF(29),
//     height: SF(29),
//     backgroundColor: '#F49A3A',
//     borderRadius: SF(58),
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   pickupName: {
//     fontWeight: 600,
//     fontSize: SF(18),
//     color: '#555454',
//   },
//   pickupSubContainerText: {
//     display: 'flex',
//     flexDirection: 'column',
//     rowGap: SH(5),
//   },
//   pickupSubContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     gap: SW(13),
//     alignItems: 'flex-start',
//   },
//   durationText: {
//     fontWeight: 600,
//     fontSize: SF(14),
//     color: '#555454',
//   },
//   pickupAddress: {
//     color: 'rgba(7, 7, 7, 1)',
//     fontSize: SF(12),
//     fontWeight: 400,
//   },
// });

// // src/screens/Dashboard.js
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   FlatList,
//   RefreshControl,
//   Platform,
//   Alert,
//   Linking,
// } from 'react-native';
// import colorsset from '../utils/colors';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { SF, SH, SW } from '../utils/dimensions';
// import { TouchableOpacity } from 'react-native';
// import images from '../image/images';
// import { useCallback, useEffect, useState } from 'react';
// import { useGlobalContext } from '../contexts/globalContext';
// import getTimeDuration from '../utils/timeDurationConversion';
// import { getStatusBarHeight } from 'react-native-status-bar-height';
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import Geolocation from '@react-native-community/geolocation';
// import {
//   requestPermission,
//   AuthorizationStatus,
// } from '@react-native-firebase/messaging';
// import { setupNotifications } from '../services/notifications';
// import { PermissionsAndroid } from 'react-native';

// // --- IMPORTS for GPS Enable (Following UserHomeScreen pattern) ---
// import {
//   isLocationEnabled,
//   promptForEnableLocationIfNeeded,
// } from 'react-native-android-location-enabler';
// // --- END IMPORTS ---

// const order_statuses = [
//   { id: 1, title: 'Pending' },
//   { id: 2, title: 'Order Accepted' },
//   { id: 3, title: 'Processing' },
//   { id: 4, title: 'Ready' },
//   { id: 5, title: 'Shipped' },
//   { id: 6, title: 'Order is Picked Up' },
//   { id: 7, title: 'Delivered' },
//   { id: 8, title: 'Request to Cancel' },
//   { id: 9, title: 'Cancelled' },
//   { id: 10, title: 'Declined' },
// ];

// // color mapping (use exact titles from order_statuses)
// const orderStatusColor = {
//   Pending: {
//     color: '#BB9900',
//     backgroundColor: 'rgba(255, 225, 89, 0.2)',
//   },
//   'Order Accepted': {
//     color: '#0066FF',
//     backgroundColor: 'rgba(0, 102, 255, 0.2)',
//   },
//   Processing: {
//     color: '#BB9900',
//     backgroundColor: 'rgba(255, 225, 89, 0.2)',
//   },
//   Ready: {
//     color: '#FF9900',
//     backgroundColor: 'rgba(255, 165, 0, 0.2)',
//   },
//   Shipped: {
//     color: '#FF5963',
//     backgroundColor: 'rgba(255, 89, 99, 0.2)',
//   },
//   'Order is Picked Up': {
//     color: '#0066FF',
//     backgroundColor: 'rgba(0, 102, 255, 0.2)',
//   },
//   Delivered: {
//     color: 'rgba(0, 123, 59, 1)',
//     backgroundColor: 'rgba(106, 255, 89, 0.2)',
//   },
//   'Request to Cancel': {
//     color: '#FF0000',
//     backgroundColor: 'rgba(255, 0, 0, 0.2)',
//   },
//   Cancelled: {
//     color: '#888',
//     backgroundColor: 'rgba(200, 200, 200, 0.2)',
//   },
//   Declined: {
//     color: '#444',
//     backgroundColor: 'rgba(150, 150, 150, 0.2)',
//   },
// };

// // helper function: get color based on numeric status code
// const getOrderStatusStyle = statusCode => {
//   const statusObj = order_statuses.find(s => s.id === statusCode);
//   if (!statusObj) return { color: '#000', backgroundColor: '#eee' }; // default
//   return (
//     orderStatusColor[statusObj.title] || {
//       color: '#000',
//       backgroundColor: '#eee',
//     }
//   );
// };
// // helper function: get color based on numeric status code
// const getOrderStatus = statusCode => {
//   const statusObj = order_statuses.find(s => s.id === statusCode);
//   return statusObj.title;
// };
// // helper function: get color based on numeric status code
// const getPaymentStatus = statusCode => {
//   const statusObj = order_statuses.find(s => s.id === statusCode);
//   return statusObj.title;
// };

// const paidStatusColor = {
//   captured: {
//     color: 'rgba(0, 123, 59, 1)',
//     backgroundColor: 'rgba(106, 255, 89, 0.2)',
//   },
//   ['pending']: {
//     color: '#000000',
//     backgroundColor: 'rgba(199, 199, 199, 0.2)',
//   },
// };

// const OrderCard = ({ orderDetail, handleNavigate, origin }) => (
//   <TouchableOpacity
//     onPress={() => handleNavigate(orderDetail)}
//     style={styles.card}
//   >
//     <View
//       style={{
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//       }}
//     >
//       <Text style={styles.orderId}>Order ID: #{orderDetail?.id}</Text>
//       <Text
//         style={{
//           color: `${
//             orderDetail?.delivery_details?.accept_status !== 3
//               ? getOrderStatusStyle(orderDetail?.status)?.color
//               : orderStatusColor['Request to Cancel']?.color
//           }`,
//           fontWeight: 700,
//           fontSize: SF(14),
//           backgroundColor: `${
//             orderDetail?.delivery_details?.accept_status !== 3
//               ? getOrderStatusStyle(orderDetail?.status)?.backgroundColor
//               : orderStatusColor['Request to Cancel']?.backgroundColor
//           }`,
//           paddingVertical: SH(3),
//           paddingHorizontal: SW(8),
//           borderRadius: SF(6),
//         }}
//       >
//         {orderDetail?.delivery_details?.accept_status !== 3
//           ? getOrderStatus(orderDetail?.status)
//           : 'Order Declined'}
//       </Text>
//     </View>

//     <View style={styles.dropContainer}>
//       <View style={styles.pickupSubContainer}>
//         <View
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: SH(5),
//             alignItems: 'center',
//           }}
//         >
//           <View style={styles.locationContainer}>
//             <Icon name="location-outline" size={SF(14)} color={'white'} />
//           </View>

//           <Text
//             style={{ color: '#000000', fontWeight: '600', fontSize: SF(8) }}
//           >
//             {'['}
//             {orderDetail?.location.total_km} KM
//             {']'}
//           </Text>
//         </View>
//         <View style={styles.pickupSubContainerText}>
//           <Text style={styles.pickupName}>{orderDetail?.customer?.name}</Text>
//           <View style={styles.duration}>
//             <Text style={styles.pickupAddress}>
//               {orderDetail?.contact_details?.meta?.address}
//             </Text>
//           </View>
//         </View>
//       </View>
//     </View>
//     <View
//       style={{
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//       }}
//     >
//       <View
//         style={{
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//           gap: SW(3),
//         }}
//       >
//         <Icon name="time-outline" size={SF(16)} color={'#1332D0'} />

//         <Text style={styles.durationText}>
//           {getTimeDuration(orderDetail?.delivery_expected_time).current} -{' '}
//           {getTimeDuration(orderDetail?.delivery_expected_time).extra}
//         </Text>
//       </View>

//       <Text
//         style={{
//           color: `${paidStatusColor[orderDetail?.payment?.status]?.color}`,
//           fontWeight: 700,
//           fontSize: SF(14),
//           backgroundColor: 'rgba(199, 199, 199, 0.2)',
//           paddingVertical: SH(3),
//           paddingHorizontal: SW(4),
//           borderRadius: SF(4),
//         }}
//       >
//         {orderDetail?.payment?.status === 'pending' ? 'Not Paid' : 'Paid'} ₹{' '}
//         {orderDetail?.payment?.amount}
//       </Text>
//     </View>
//     <Icon
//       name="chevron-down-sharp"
//       color="rgba(255, 89, 99, 1)"
//       size={SF(20)}
//       style={{ textAlign: 'center' }}
//     />
//   </TouchableOpacity>
// );

// const fromLocation = {
//   latitude: 8.094902240100733,
//   longitude: 77.48392429159924,
// };

// const Dashboard = ({ navigation }) => {
//   const { state, dispatch, fetchIncompleteOrder, location, setLocation } =
//     useGlobalContext();
//   const { todayIncompleteOrder, todayCompleteOrder, orderNav, ongoingOrder } =
//     state;
//   const [refreshing, setRefreshing] = useState(false);
//   const [locationPermissionGranted, setLocationPermissionGranted] =
//     useState(false);
//   const [notificationPermissionGranted, setNotificationPermissionGranted] =
//     useState(false);
//   const [locationWatcherId, setLocationWatcherId] = useState(null);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     // ⬇️ Call your API or reload dashboard data
//     fetchIncompleteOrder().then(() => {
//       setRefreshing(false);
//     });
//   }, []);

//   useEffect(() => {
//     requestAllPermissions();
//     return () => {
//       // Clean up location watcher when component unmounts
//       if (locationWatcherId) {
//         Geolocation.clearWatch(locationWatcherId);
//       }
//     };
//   }, []);

//   const requestAllPermissions = async () => {
//     await requestNotificationPermission();
//     await requestLocationPermissionAndStartTracking();
//   };

//   const requestNotificationPermission = async () => {
//     try {
//       // For Android 13+, request POST_NOTIFICATIONS permission
//       if (Platform.OS === 'android' && Platform.Version >= 33) {
//         const permission = PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS;
//         const result = await PermissionsAndroid.request(permission);

//         if (result === PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('✅ Android notification permission granted');
//           setNotificationPermissionGranted(true);
//         } else if (result === PermissionsAndroid.RESULTS.DENIED) {
//           console.log('❌ Android notification permission denied');
//           showNotificationPermissionAlert();
//         } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
//           console.log('❌ Android notification permission blocked');
//           showNotificationPermissionAlert();
//         }
//       } else {
//         // For older Android versions, request Firebase permission
//         const authStatus = await requestPermission();
//         const enabled =
//           authStatus === AuthorizationStatus.AUTHORIZED ||
//           authStatus === AuthorizationStatus.PROVISIONAL;

//         if (enabled) {
//           console.log('✅ Notification permission granted');
//           setNotificationPermissionGranted(true);

//           // Get FCM token
//           await setupNotifications();
//         } else {
//           console.log('❌ Notification permission denied');
//           showNotificationPermissionAlert();
//         }
//       }
//     } catch (error) {
//       console.error('Error requesting notification permission:', error);
//     }
//   };

//   // --- UPDATED LOCATION PERMISSION & GPS ENABLE LOGIC (Following UserHomeScreen pattern) ---
//   const requestLocationPermissionAndStartTracking = async () => {
//     try {
//       let permission;

//       if (Platform.OS === 'android') {
//         permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
//       } else {
//         permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
//       }

//       const status = await check(permission);
//       console.log('📍 Location permission status:', status);

//       if (status === RESULTS.UNAVAILABLE) {
//         console.log('📍 Location services are not available');
//         return;
//       }

//       if (status === RESULTS.DENIED || status === RESULTS.LIMITED) {
//         console.log('📍 Requesting location permission...');
//         const requestResult = await request(permission);

//         if (requestResult === RESULTS.GRANTED) {
//           console.log('✅ Location permission granted');
//           setLocationPermissionGranted(true);
//           // Now check and enable GPS *after* permission is granted
//           await checkAndEnableGPSAndStartTracking();
//         } else if (requestResult === RESULTS.DENIED) {
//           console.log('❌ Location permission denied');
//           showLocationPermissionAlert();
//         } else if (requestResult === RESULTS.BLOCKED) {
//           console.log('❌ Location permission blocked');
//           showLocationPermissionAlert();
//         }
//       } else {
//         console.log('📍 Location permission already granted');
//         setLocationPermissionGranted(true);
//         // Check and enable GPS *even if permission was already granted*
//         await checkAndEnableGPSAndStartTracking();
//       }
//     } catch (error) {
//       console.error('📍 Error requesting location permission:', error);
//     }
//   };

//   // --- NEW: Combined function to check GPS and start tracking (Following UserHomeScreen pattern) ---
//   const checkAndEnableGPSAndStartTracking = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         console.log('Checking if location (GPS) is enabled...');
//         const checkEnabled = await isLocationEnabled(); // Use isLocationEnabled from enabler lib
//         console.log('GPS checkEnabled status:', checkEnabled);

//         let locationResult = null;
//         if (!checkEnabled) {
//           console.log('GPS is disabled. Prompting user to enable...');
//           const enableResult = await promptForEnableLocationIfNeeded(); // Use prompt from enabler lib
//           console.log('GPS enableResult:', enableResult);
//           if (enableResult === 'enabled') {
//             // If user enabled it, proceed to get location
//             locationResult = await getLocationFunction(); // You need to define this function or use Geolocation
//           }
//         } else {
//           console.log('GPS is already enabled. Proceeding to get location...');
//           // If already enabled, proceed to get location
//           locationResult = await getLocationFunction(); // You need to define this function or use Geolocation
//         }

//         if (locationResult) {
//           // Process the location result (e.g., set state, start watching)
//           const { latitude, longitude } = locationResult;
//           setLocation({ latitude, longitude });
//           console.log('Location set:', latitude, longitude);
//           startLocationTracking(); // Start watching after initial location is set
//         } else {
//           console.log(
//             'Location could not be obtained after GPS check/enabling.',
//           );
//           // Optionally show an alert here if GPS enabling was cancelled
//           // showGpsEnableAlert(); // You can reuse your existing alert or create a new one
//         }
//       } catch (error) {
//         console.error('Error in checkAndEnableGPSAndStartTracking:', error);
//         // Optionally show an error alert
//         // Alert.alert("Location Error", "An error occurred while setting up location services.");
//       }
//     } else {
//       // For iOS, location permission usually handles GPS enabling
//       // Just start tracking after permission check
//       startLocationTracking();
//     }
//   };

//   // --- NEW: Define getLocationFunction (using Geolocation) ---
//   const getLocationFunction = () => {
//     return new Promise((resolve, reject) => {
//       Geolocation.getCurrentPosition(
//         position => {
//           console.log(
//             'Got location from Geolocation API:',
//             position.coords.latitude,
//             position.coords.longitude,
//           );
//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//         },
//         error => {
//           console.log('Error getting location from Geolocation API:', error);
//           reject(error);
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 10000,
//           maximumAge: 30000,
//         },
//       );
//     });
//   };
//   // --- END NEW FUNCTIONS ---

//   // const startLocationTracking = () => {
//   //   try {
//   //     // Start watching location
//   //     const watchId = Geolocation.watchPosition(
//   //       position => {
//   //         console.log(
//   //           'Location updated:',
//   //           position.coords.latitude,
//   //           position.coords.longitude,
//   //         );
//   //         setLocation({
//   //           latitude: position.coords.latitude,
//   //           longitude: position.coords.longitude,
//   //         });
//   //       },
//   //       error => {
//   //         console.error('Location watch error:', error);
//   //         // Show GPS enable alert if GPS is disabled (code 2 is POSITION_UNAVAILABLE)
//   //         if (error.code === 2) {
//   //           console.log('Location watch failed, GPS might be disabled...');
//   //           showGpsEnableAlert();
//   //         }
//   //       },
//   //       {
//   //         enableHighAccuracy: true,
//   //         distanceFilter: 5,
//   //         interval: 10000,
//   //         fastestInterval: 5000,
//   //       },
//   //     );

//   //     setLocationWatcherId(watchId);
//   //   } catch (error) {
//   //     console.error('Error starting location tracking:', error);
//   //   }
//   // };
//   const startLocationTracking = () => {
//     // 🔹 STEP 1: Get initial location immediately
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ latitude, longitude });
//         console.log('✅ Initial location set:', latitude, longitude);
//       },
//       error => {
//         console.warn('⚠️ Failed to get initial location:', error);
//         // Optionally show GPS alert
//         if (error.code === 2) showGpsEnableAlert();
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 30000, // Accept cached location up to 30s old
//       },
//     );

//     // 🔹 STEP 2: Start watching for updates (with distanceFilter)
//     const watchId = Geolocation.watchPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ latitude, longitude });
//         console.log('📍 Location updated (via watch):', latitude, longitude);
//       },
//       error => {
//         console.error('Location watch error:', error);
//         if (error.code === 2) showGpsEnableAlert();
//       },
//       {
//         enableHighAccuracy: true,
//         distanceFilter: 5, // Only update when moved >5m
//         interval: 8000, // Android: min time between updates
//         fastestInterval: 4000, // Android: fastest possible (if movement detected)
//       },
//     );

//     setLocationWatcherId(watchId);
//   };

//   // Show native Android GPS enable dialog using react-native-android-location-enabler
//   const showGpsEnableAlert = () => {
//     if (Platform.OS === 'android') {
//       Alert.alert(
//         'Location Services Required',
//         'To use location-based features, please enable Location Services (GPS).',
//         [
//           {
//             text: 'Cancel',
//             style: 'cancel',
//           },
//           {
//             text: 'Enable GPS',
//             onPress: async () => {
//               const result = await promptForEnableLocationIfNeeded({
//                 interval: 10000,
//                 fastestInterval: 5000,
//               });
//               if (result === 'enabled' || result === 'already-enabled') {
//                 console.log('GPS enabled via alert prompt.');
//                 // Attempt to start tracking again after enabling (if permission is OK)
//                 if (locationPermissionGranted) {
//                   startLocationTracking();
//                 }
//               } else {
//                 console.log('User declined to enable GPS via alert prompt.');
//               }
//             },
//             style: 'default',
//           },
//         ],
//         { cancelable: false },
//       );
//     } else {
//       // For iOS, show a simpler alert
//       Alert.alert(
//         'Location Services Disabled',
//         'Please enable Location Services in Settings to use this feature.',
//         [
//           {
//             text: 'Cancel',
//             style: 'cancel',
//           },
//           {
//             text: 'Go to Settings',
//             onPress: () => {
//               Linking.openSettings(); // Fallback for iOS
//             },
//           },
//         ],
//       );
//     }
//   };

//   const showLocationPermissionAlert = () => {
//     Alert.alert(
//       'Location Permission Required',
//       'This app needs location access to provide better service. Please enable location permissions in Settings.',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Go to Settings',
//           onPress: () => {
//             Linking.openSettings();
//           },
//         },
//       ],
//     );
//   };

//   const showNotificationPermissionAlert = () => {
//     Alert.alert(
//       'Notification Permission Required',
//       'This app needs notification permission to send you alerts. Please enable notifications in Settings.',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Go to Settings',
//           onPress: () => {
//             Linking.openSettings();
//           },
//         },
//       ],
//     );
//   };

//   useEffect(() => {
//     fetchIncompleteOrder();
//   }, []);

//   const [isOnGoing, setisOnGoing] = useState(true);

//   const handleNavigate = orderDetail => {
//     navigation.navigate('Order', { orderDetail });
//   };
//   const handleNavigateReport = () => {
//     navigation.navigate('Profile');
//   };
//   const handleOrderStatus = type => {
//     if (type === 'onGoing') {
//       setisOnGoing(true);
//     } else {
//       setisOnGoing(false);
//     }
//   };
//   useEffect(() => {
//     if (ongoingOrder?.length > 0) {
//       dispatch({
//         type: 'SET_ORDER_NAV',
//         payload: ongoingOrder,
//       });
//     }
//   }, [ongoingOrder]);

//   const STATUSBAR_HEIGHT =
//     Platform.OS === 'android' ? StatusBar.currentHeight : 0;

//   return (
//     <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
//       <View style={styles.scrollContent}>
//         <View style={styles.innerContainer}>
//           <TouchableOpacity
//             onPress={handleNavigateReport}
//             style={styles.circleButton}
//           >
//             <View style={styles.lineContainer}>
//               <View style={styles.line_1} />
//               <View style={styles.line_2} />
//               <View style={styles.line_3} />
//             </View>
//           </TouchableOpacity>
//           <Text style={{ fontSize: SF(20), fontWeight: 600, color: '#5E5E5E' }}>
//             {state?.user?.employee?.name}
//           </Text>
//         </View>

//         <View
//           style={{
//             gap: SH(21),
//             marginTop: SH(27),
//           }}
//         >
//           <View
//             style={{
//               paddingHorizontal: SW(13),
//               paddingTop: SH(11),
//               paddingBottom: SH(22),
//               backgroundColor: '#FFFFFF',
//               borderRadius: SF(10),
//               // Shadow for iOS
//               shadowColor: '#414141',
//               shadowOffset: { width: 0, height: -2 },
//               shadowOpacity: 0.15,
//               shadowRadius: 20, // 40px blur in Figma ≈ 20 in RN

//               // Shadow for Android
//               elevation: 8,
//             }}
//           >
//             <Text
//               style={{ color: '#BA0505', fontSize: SF(22), fontWeight: 600 }}
//             >
//               Today's Summary
//             </Text>
//             <View
//               style={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 marginHorizontal: SW(17),
//                 justifyContent: 'space-between',
//                 marginTop: SH(16),
//               }}
//             >
//               <View
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <Image
//                   source={images.assigned}
//                   resizeMode="contain"
//                   style={styles.assignedImage}
//                 />
//                 <Text
//                   style={{
//                     color: '#7C7676',
//                     fontWeight: 600,
//                     fontSize: SF(12),
//                     paddingVertical: SH(4),
//                   }}
//                 >
//                   Assigned
//                 </Text>
//                 <Text
//                   style={{
//                     color: '#000000',
//                     fontWeight: 600,
//                     fontSize: SF(16),
//                   }}
//                 >
//                   {ongoingOrder?.length} Orders
//                 </Text>
//               </View>
//               <View
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <Image
//                   source={images.delivered}
//                   resizeMode="contain"
//                   style={styles.deliveredImage}
//                   onPress={() => navigation.navigate('Nav')}
//                 />
//                 <Text
//                   style={{
//                     color: '#7C7676',
//                     fontWeight: 600,
//                     fontSize: SF(12),
//                     paddingVertical: SH(4),
//                   }}
//                 >
//                   Delivered
//                 </Text>
//                 <Text
//                   style={{
//                     color: '#000000',
//                     fontWeight: 600,
//                     fontSize: SF(16),
//                   }}
//                 >
//                   {ongoingOrder.filter(items => items.status === 7).length}{' '}
//                   Orders
//                 </Text>
//               </View>
//               <View
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <Image
//                   source={images.rides}
//                   resizeMode="contain"
//                   style={styles.ridesImage}
//                 />
//                 <Text
//                   style={{
//                     color: '#7C7676',
//                     fontWeight: 600,
//                     fontSize: SF(12),
//                     paddingVertical: SH(4),
//                   }}
//                 >
//                   Rides
//                 </Text>
//                 <Text
//                   style={{
//                     color: '#000000',
//                     fontWeight: 600,
//                     fontSize: SF(16),
//                   }}
//                 >
//                   {ongoingOrder
//                     .filter(items => items.status === 7)
//                     ?.reduce((a, b) => a + b.location.total_km, 0)
//                     ?.toFixed(2) || 0}
//                   KM
//                 </Text>
//               </View>
//             </View>
//           </View>
//           <View
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               gap: SW(10),
//             }}
//           >
//             <View
//               style={{
//                 backgroundColor: '#FFFFFF',
//                 borderRadius: SF(10),
//                 // Shadow for iOS
//                 shadowColor: '#414141',
//                 shadowOffset: { width: 0, height: -2 },
//                 shadowOpacity: 0.15,
//                 shadowRadius: 20, // 40px blur in Figma ≈ 20 in RN

//                 // Shadow for Android
//                 elevation: 8,
//                 flex: 2,
//               }}
//             >
//               <Image
//                 source={images.waiting}
//                 resizeMode="contain"
//                 style={styles.waitingImage}
//               />
//               <View
//                 style={{
//                   paddingLeft: SW(14),
//                   paddingTop: SH(16),
//                   paddingBottom: SH(13),
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: '#000000',
//                     fontWeight: 600,
//                     fontSize: SF(65),
//                     paddingLeft: SW(5),
//                   }}
//                 >
//                   {todayIncompleteOrder?.pending_order_details?.filter(
//                     order => order.status !== 7,
//                   )?.length || 0}
//                 </Text>

//                 <View
//                   style={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     paddingTop: SH(16),
//                   }}
//                 >
//                   <Text
//                     style={{
//                       color: '#000000',
//                       fontWeight: 600,
//                       fontSize: SF(15),
//                     }}
//                   >
//                     Pending Orders
//                   </Text>
//                   <Icon
//                     name="caret-forward-sharp"
//                     color={colorsset.theme_dark_gray}
//                     size={SF(17)}
//                   />
//                 </View>
//               </View>
//             </View>
//             <View
//               style={{
//                 backgroundColor: '#FFFFFF',
//                 borderRadius: SF(10),
//                 // Shadow for iOS
//                 shadowColor: '#414141',
//                 shadowOffset: { width: 0, height: -2 },
//                 shadowOpacity: 0.15,
//                 shadowRadius: 20, // 40px blur in Figma ≈ 20 in RN

//                 // Shadow for Android
//                 elevation: 8,
//                 flex: 2,
//               }}
//             >
//               <Image
//                 source={images.waiting}
//                 resizeMode="contain"
//                 style={styles.waitingImage}
//               />
//               <View
//                 style={{
//                   paddingLeft: SW(14),
//                   paddingTop: SH(16),
//                   paddingBottom: SH(13),
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: '#000000',
//                     fontWeight: 600,
//                     fontSize: SF(65),
//                     paddingLeft: SW(5),
//                   }}
//                 >
//                   {todayIncompleteOrder?.upcoming_order_details?.filter(
//                     order => order.status !== 7,
//                   )?.length || 0}
//                 </Text>

//                 <View
//                   style={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     paddingTop: SH(16),
//                   }}
//                 >
//                   <Text
//                     style={{
//                       color: '#000000',
//                       fontWeight: 600,
//                       fontSize: SF(15),
//                     }}
//                   >
//                     Upcoming Orders
//                   </Text>
//                   <Icon
//                     name="caret-forward-sharp"
//                     color={colorsset.theme_dark_gray}
//                     size={SF(17)}
//                   />
//                 </View>
//               </View>
//             </View>
//           </View>

//           <View
//             style={{
//               backgroundColor: '#FFFFFF',
//               borderRadius: SF(10),
//               // Shadow for iOS
//               shadowColor: '#414141',
//               shadowOffset: { width: 0, height: -2 },
//               shadowOpacity: 0.15,
//               shadowRadius: 20, // 40px blur in Figma ≈ 20 in RN

//               // Shadow for Android
//               elevation: 8,
//               display: 'flex',
//               flexDirection: 'row',
//               padding: SF(4),
//             }}
//           >
//             <TouchableOpacity
//               style={{
//                 flex: 2,
//                 paddingVertical: SH(11),
//                 borderRadius: SF(10),
//                 display: 'flex',
//                 flexDirection: 'row',
//                 backgroundColor: `${isOnGoing ? '#32ADE6' : '#FFFFFF'}`,
//                 justifyContent: 'center',
//               }}
//               onPress={() => handleOrderStatus('onGoing')}
//             >
//               <Text
//                 style={{
//                   fontSize: SF(15),
//                   fontWeight: 600,
//                   color: `${isOnGoing ? '#FFFFFF' : '#000000'}`,
//                 }}
//               >
//                 Ongoing
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{
//                 flex: 2,
//                 paddingVertical: SH(11),
//                 backgroundColor: `${isOnGoing ? '#FFFFFF' : '#32ADE6'}`,
//                 borderRadius: SF(10),
//                 display: 'flex',
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//               }}
//               onPress={() => handleOrderStatus('completed')}
//             >
//               <Text
//                 style={{
//                   fontSize: SF(15),
//                   fontWeight: 600,
//                   color: `${isOnGoing ? '#000000' : '#FFFFFF'}`,
//                 }}
//               >
//                 Completed
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <View>
//             <FlatList
//               data={orderNav.filter(items =>
//                 !isOnGoing ? items.status === 7 : items.status !== 7,
//               )}
//               keyExtractor={item => item.orderId}
//               renderItem={({ item }) => (
//                 <OrderCard
//                   orderDetail={item}
//                   handleNavigate={handleNavigate}
//                   origin={fromLocation}
//                 />
//               )}
//               contentContainerStyle={styles.orderContainer}
//               showsVerticalScrollIndicator={false}
//               refreshControl={
//                 <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//               }
//             />
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Dashboard;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colorsset.theme_backgound_second,
//     paddingTop: getStatusBarHeight(),
//   },
//   scrollContent: {
//     paddingBottom: SF(20),
//     marginHorizontal: SW(19),
//   },
//   innerContainer: {
//     paddingTop: SH(6),
//     gap: SW(12),
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   circleButton: {
//     width: SF(45),
//     height: SF(45),
//     backgroundColor: '#ECF0F4',
//     borderRadius: SF(45) / 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   lineContainer: {
//     justifyContent: 'space-between',
//     gap: SH(6),
//   },
//   line_1: {
//     width: SW(6),
//     height: 2,
//     backgroundColor: '#2B2E35',
//     borderRadius: 1,
//   },
//   line_2: {
//     width: SW(16),
//     height: 2,
//     backgroundColor: '#2B2E35',
//     borderRadius: 1,
//   },
//   line_3: {
//     width: SW(10),
//     height: 2,
//     backgroundColor: '#2B2E35',
//     borderRadius: 1,
//   },
//   deliveredImage: {
//     width: SW(61),
//     height: SH(44),
//   },
//   assignedImage: {
//     width: SW(44),
//     height: SH(44),
//   },
//   waitingImage: {
//     width: SF(42),
//     height: SF(42),
//     position: 'absolute',
//     right: SW(7),
//     top: SH(9),
//   },
//   ridesImage: {
//     width: SW(74),
//     height: SH(44),
//   },

//   orderContainer: {
//     gap: SH(16),
//     paddingBottom: SH(1600),
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: SF(8),
//     padding: SF(10),
//     shadowColor: '#414141',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 20, // 40px blur in Figma ≈ 20 in RN

//     // Shadow for Android
//     elevation: 3,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   text: {
//     fontSize: 14,
//     marginBottom: 2,
//     color: '#555',
//   },
//   orderId: {
//     fontSize: SF(19),
//     color: '#707070',
//     fontWeight: 700,
//   },
//   dropContainer: {
//     marginTop: SH(10),
//     marginBottom: SH(12),
//   },
//   locationContainer: {
//     width: SF(29),
//     height: SF(29),
//     backgroundColor: '#F49A3A',
//     borderRadius: SF(58),
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   pickupName: {
//     fontWeight: 600,
//     fontSize: SF(18),
//     color: '#555454',
//   },
//   pickupSubContainerText: {
//     display: 'flex',
//     flexDirection: 'column',
//     rowGap: SH(5),
//   },
//   pickupSubContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     gap: SW(13),
//     alignItems: 'flex-start',
//   },
//   durationText: {
//     fontWeight: 600,
//     fontSize: SF(14),
//     color: '#555454',
//   },
//   pickupAddress: {
//     color: 'rgba(7, 7, 7, 1)',
//     fontSize: SF(12),
//     fontWeight: 400,
//   },
// });

// src/screens/Dashboard.js
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  RefreshControl,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import colorsset from '../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { SF, SH, SW } from '../utils/dimensions';
import { TouchableOpacity } from 'react-native';
import images from '../image/images';
import { useCallback, useEffect, useState } from 'react';
import { useGlobalContext } from '../contexts/globalContext';
import getTimeDuration from '../utils/timeDurationConversion';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { PermissionsAndroid } from 'react-native';
import {
  requestPermission,
  AuthorizationStatus,
} from '@react-native-firebase/messaging';
import { setupNotifications } from '../services/notifications';

const order_statuses = [
  { id: 1, title: 'Pending' },
  { id: 2, title: 'Order Accepted' },
  { id: 3, title: 'Processing' },
  { id: 4, title: 'Ready' },
  { id: 5, title: 'Shipped' },
  { id: 6, title: 'Order is Picked Up' },
  { id: 7, title: 'Delivered' },
  { id: 8, title: 'Request to Cancel' },
  { id: 9, title: 'Cancelled' },
  { id: 10, title: 'Declined' },
];

const orderStatusColor = {
  Pending: { color: '#BB9900', backgroundColor: 'rgba(255, 225, 89, 0.2)' },
  'Order Accepted': {
    color: '#0066FF',
    backgroundColor: 'rgba(0, 102, 255, 0.2)',
  },
  Processing: { color: '#BB9900', backgroundColor: 'rgba(255, 225, 89, 0.2)' },
  Ready: { color: '#FF9900', backgroundColor: 'rgba(255, 165, 0, 0.2)' },
  Shipped: { color: '#FF5963', backgroundColor: 'rgba(255, 89, 99, 0.2)' },
  'Order is Picked Up': {
    color: '#0066FF',
    backgroundColor: 'rgba(0, 102, 255, 0.2)',
  },
  Delivered: {
    color: 'rgba(0, 123, 59, 1)',
    backgroundColor: 'rgba(106, 255, 89, 0.2)',
  },
  'Request to Cancel': {
    color: '#FF0000',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
  },
  Cancelled: { color: '#888', backgroundColor: 'rgba(200, 200, 200, 0.2)' },
  Declined: { color: '#444', backgroundColor: 'rgba(150, 150, 150, 0.2)' },
};

const getOrderStatusStyle = statusCode => {
  const statusObj = order_statuses.find(s => s.id === statusCode);
  if (!statusObj) return { color: '#000', backgroundColor: '#eee' };
  return (
    orderStatusColor[statusObj.title] || {
      color: '#000',
      backgroundColor: '#eee',
    }
  );
};

const getOrderStatus = statusCode => {
  const statusObj = order_statuses.find(s => s.id === statusCode);
  return statusObj ? statusObj.title : 'Unknown';
};

const paidStatusColor = {
  captured: {
    color: 'rgba(0, 123, 59, 1)',
    backgroundColor: 'rgba(106, 255, 89, 0.2)',
  },
  pending: { color: '#000000', backgroundColor: 'rgba(199, 199, 199, 0.2)' },
};

const OrderCard = ({ orderDetail, handleNavigate, origin }) => (
  <TouchableOpacity
    onPress={() => handleNavigate(orderDetail)}
    style={styles.card}
  >
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text style={styles.orderId}>Order ID: #{orderDetail?.id}</Text>
      <Text
        style={{
          color:
            orderDetail?.delivery_details?.accept_status !== 3
              ? getOrderStatusStyle(orderDetail?.status)?.color
              : orderStatusColor['Request to Cancel']?.color,
          fontWeight: 700,
          fontSize: SF(14),
          backgroundColor:
            orderDetail?.delivery_details?.accept_status !== 3
              ? getOrderStatusStyle(orderDetail?.status)?.backgroundColor
              : orderStatusColor['Request to Cancel']?.backgroundColor,
          paddingVertical: SH(3),
          paddingHorizontal: SW(8),
          borderRadius: SF(6),
        }}
      >
        {orderDetail?.delivery_details?.accept_status !== 3
          ? getOrderStatus(orderDetail?.status)
          : 'Order Declined'}
      </Text>
    </View>

    <View style={styles.dropContainer}>
      <View style={styles.pickupSubContainer}>
        <View
          style={{ flexDirection: 'column', gap: SH(5), alignItems: 'center' }}
        >
          <View style={styles.locationContainer}>
            <Icon name="location-outline" size={SF(14)} color={'white'} />
          </View>
          <Text
            style={{ color: '#000000', fontWeight: '600', fontSize: SF(8) }}
          >
            [{orderDetail?.location.total_km} KM]
          </Text>
        </View>
        <View style={styles.pickupSubContainerText}>
          <Text style={styles.pickupName}>{orderDetail?.customer?.name}</Text>
          <View style={styles.duration}>
            <Text style={styles.pickupAddress}>
              {orderDetail?.contact_details?.meta?.address}
            </Text>
          </View>
        </View>
      </View>
    </View>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SW(3) }}>
        <Icon name="time-outline" size={SF(16)} color={'#1332D0'} />
        <Text style={styles.durationText}>
          {getTimeDuration(orderDetail?.delivery_expected_time).current} -{' '}
          {getTimeDuration(orderDetail?.delivery_expected_time).extra}
        </Text>
      </View>
      <Text
        style={{
          color: paidStatusColor[orderDetail?.payment?.status]?.color,
          fontWeight: 700,
          fontSize: SF(14),
          backgroundColor: 'rgba(199, 199, 199, 0.2)',
          paddingVertical: SH(3),
          paddingHorizontal: SW(4),
          borderRadius: SF(4),
        }}
      >
        {orderDetail?.payment?.status === 'pending' ? 'Not Paid' : 'Paid'} ₹{' '}
        {orderDetail?.payment?.amount}
      </Text>
    </View>
    <Icon
      name="chevron-down-sharp"
      color="rgba(255, 89, 99, 1)"
      size={SF(20)}
      style={{ textAlign: 'center' }}
    />
  </TouchableOpacity>
);

const fromLocation = {
  latitude: 8.094902240100733,
  longitude: 77.48392429159924,
};

const Dashboard = ({ navigation }) => {
  const { state, dispatch, fetchIncompleteOrder } = useGlobalContext();
  const { todayIncompleteOrder, todayCompleteOrder, orderNav, ongoingOrder } =
    state;
  const [refreshing, setRefreshing] = useState(false);
  const [isOnGoing, setisOnGoing] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchIncompleteOrder().then(() => setRefreshing(false));
  }, []);

  // Only request notification permission (optional)
  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
          const permission = PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS;
          const result = await PermissionsAndroid.request(permission);
          if (result === PermissionsAndroid.RESULTS.GRANTED) {
            await setupNotifications();
          }
        } else {
          const authStatus = await requestPermission();
          const enabled =
            authStatus === AuthorizationStatus.AUTHORIZED ||
            authStatus === AuthorizationStatus.PROVISIONAL;
          if (enabled) {
            await setupNotifications();
          }
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    };

    requestNotificationPermission();
  }, []);

  useEffect(() => {
    fetchIncompleteOrder();
  }, []);

  useEffect(() => {
    if (ongoingOrder?.length > 0) {
      dispatch({ type: 'SET_ORDER_NAV', payload: ongoingOrder });
    }
  }, [ongoingOrder]);

  const handleNavigate = orderDetail => {
    console.log(orderDetail);

    orderDetail.status === 7
      ? navigation.navigate('OrderDelivered', {
          distance: Number(orderDetail?.location?.total_km).toFixed(2),
          // distance: Number(distance).toFixed(2),
          duration: 0,
        })
      : navigation.navigate('Order', { orderDetail });
  };
  const handleNavigateReport = () => navigation.navigate('Profile');
  const handleOrderStatus = type => setisOnGoing(type === 'onGoing');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.scrollContent}>
        <View style={styles.innerContainer}>
          <TouchableOpacity
            onPress={handleNavigateReport}
            style={styles.circleButton}
          >
            <View style={styles.lineContainer}>
              <View style={styles.line_1} />
              <View style={styles.line_2} />
              <View style={styles.line_3} />
            </View>
          </TouchableOpacity>
          <Text style={{ fontSize: SF(20), fontWeight: 600, color: '#5E5E5E' }}>
            {state?.user?.employee?.name}
          </Text>
        </View>

        <View style={{ gap: SH(21), marginTop: SH(27) }}>
          {/* Summary Cards */}
          <View
            style={{
              paddingHorizontal: SW(13),
              paddingTop: SH(11),
              paddingBottom: SH(22),
              backgroundColor: '#FFFFFF',
              borderRadius: SF(10),
              shadowColor: '#414141',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.15,
              shadowRadius: 20,
              elevation: 8,
            }}
          >
            <Text
              style={{ color: '#BA0505', fontSize: SF(22), fontWeight: 600 }}
            >
              Today's Summary
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: SW(17),
                justifyContent: 'space-between',
                marginTop: SH(16),
              }}
            >
              {/* Assigned */}
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Image
                  source={images.assigned}
                  resizeMode="contain"
                  style={styles.assignedImage}
                />
                <Text
                  style={{
                    color: '#7C7676',
                    fontWeight: 600,
                    fontSize: SF(12),
                    paddingVertical: SH(4),
                  }}
                >
                  Assigned
                </Text>
                <Text
                  style={{
                    color: '#000000',
                    fontWeight: 600,
                    fontSize: SF(16),
                  }}
                >
                  {ongoingOrder?.length} Orders
                </Text>
              </View>
              {/* Delivered */}
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Image
                  source={images.delivered}
                  resizeMode="contain"
                  style={styles.deliveredImage}
                />
                <Text
                  style={{
                    color: '#7C7676',
                    fontWeight: 600,
                    fontSize: SF(12),
                    paddingVertical: SH(4),
                  }}
                >
                  Delivered
                </Text>
                <Text
                  style={{
                    color: '#000000',
                    fontWeight: 600,
                    fontSize: SF(16),
                  }}
                >
                  {ongoingOrder.filter(items => items.status === 7).length}{' '}
                  Orders
                </Text>
              </View>
              {/* Rides */}
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Image
                  source={images.rides}
                  resizeMode="contain"
                  style={styles.ridesImage}
                />
                <Text
                  style={{
                    color: '#7C7676',
                    fontWeight: 600,
                    fontSize: SF(12),
                    paddingVertical: SH(4),
                  }}
                >
                  Rides
                </Text>
                <Text
                  style={{
                    color: '#000000',
                    fontWeight: 600,
                    fontSize: SF(16),
                  }}
                >
                  {(
                    ongoingOrder
                      .filter(items => items.status === 7)
                      ?.reduce((a, b) => a + b.location.total_km, 0) || 0
                  ).toFixed(2)}{' '}
                  KM
                </Text>
              </View>
            </View>
          </View>

          {/* Pending & Upcoming */}
          <View style={{ flexDirection: 'row', gap: SW(10) }}>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: SF(10),
                shadowColor: '#414141',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.15,
                shadowRadius: 20,
                elevation: 8,
                flex: 2,
              }}
            >
              <Image
                source={images.waiting}
                resizeMode="contain"
                style={styles.waitingImage}
              />
              <View
                style={{
                  paddingLeft: SW(14),
                  paddingTop: SH(16),
                  paddingBottom: SH(13),
                }}
              >
                <Text
                  style={{
                    color: '#000000',
                    fontWeight: 600,
                    fontSize: SF(65),
                    paddingLeft: SW(5),
                  }}
                >
                  {todayIncompleteOrder?.pending_order_details?.filter(
                    order => order.status !== 7,
                  )?.length || 0}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: SH(16),
                  }}
                >
                  <Text
                    style={{
                      color: '#000000',
                      fontWeight: 600,
                      fontSize: SF(15),
                    }}
                  >
                    Pending Orders
                  </Text>
                  <Icon
                    name="caret-forward-sharp"
                    color={colorsset.theme_dark_gray}
                    size={SF(17)}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: SF(10),
                shadowColor: '#414141',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.15,
                shadowRadius: 20,
                elevation: 8,
                flex: 2,
              }}
            >
              <Image
                source={images.waiting}
                resizeMode="contain"
                style={styles.waitingImage}
              />
              <View
                style={{
                  paddingLeft: SW(14),
                  paddingTop: SH(16),
                  paddingBottom: SH(13),
                }}
              >
                <Text
                  style={{
                    color: '#000000',
                    fontWeight: 600,
                    fontSize: SF(65),
                    paddingLeft: SW(5),
                  }}
                >
                  {todayIncompleteOrder?.upcoming_order_details?.filter(
                    order => order.status !== 7,
                  )?.length || 0}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: SH(16),
                  }}
                >
                  <Text
                    style={{
                      color: '#000000',
                      fontWeight: 600,
                      fontSize: SF(15),
                    }}
                  >
                    Upcoming Orders
                  </Text>
                  <Icon
                    name="caret-forward-sharp"
                    color={colorsset.theme_dark_gray}
                    size={SF(17)}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Toggle Tabs */}
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: SF(10),
              shadowColor: '#414141',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.15,
              shadowRadius: 20,
              elevation: 8,
              flexDirection: 'row',
              padding: SF(4),
            }}
          >
            <TouchableOpacity
              style={{
                flex: 2,
                paddingVertical: SH(11),
                borderRadius: SF(10),
                flexDirection: 'row',
                backgroundColor: isOnGoing ? '#32ADE6' : '#FFFFFF',
                justifyContent: 'center',
              }}
              onPress={() => handleOrderStatus('onGoing')}
            >
              <Text
                style={{
                  fontSize: SF(15),
                  fontWeight: 600,
                  color: isOnGoing ? '#FFFFFF' : '#000000',
                }}
              >
                Ongoing
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 2,
                paddingVertical: SH(11),
                backgroundColor: isOnGoing ? '#FFFFFF' : '#32ADE6',
                borderRadius: SF(10),
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              onPress={() => handleOrderStatus('completed')}
            >
              <Text
                style={{
                  fontSize: SF(15),
                  fontWeight: 600,
                  color: isOnGoing ? '#000000' : '#FFFFFF',
                }}
              >
                Completed
              </Text>
            </TouchableOpacity>
          </View>

          {/* Orders List */}
          <View>
            <FlatList
              data={orderNav.filter(items =>
                !isOnGoing ? items.status === 7 : items.status !== 7,
              )}
              keyExtractor={item => item.id?.toString()}
              renderItem={({ item }) => (
                <OrderCard
                  orderDetail={item}
                  handleNavigate={handleNavigate}
                  origin={fromLocation}
                />
              )}
              contentContainerStyle={styles.orderContainer}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsset.theme_backgound_second,
    paddingTop: getStatusBarHeight(),
  },
  scrollContent: {
    paddingBottom: SF(20),
    marginHorizontal: SW(19),
  },
  innerContainer: {
    paddingTop: SH(6),
    gap: SW(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleButton: {
    width: SF(45),
    height: SF(45),
    backgroundColor: '#ECF0F4',
    borderRadius: SF(45) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineContainer: {
    justifyContent: 'space-between',
    gap: SH(6),
  },
  line_1: {
    width: SW(6),
    height: 2,
    backgroundColor: '#2B2E35',
    borderRadius: 1,
  },
  line_2: {
    width: SW(16),
    height: 2,
    backgroundColor: '#2B2E35',
    borderRadius: 1,
  },
  line_3: {
    width: SW(10),
    height: 2,
    backgroundColor: '#2B2E35',
    borderRadius: 1,
  },
  deliveredImage: { width: SW(61), height: SH(44) },
  assignedImage: { width: SW(44), height: SH(44) },
  waitingImage: {
    width: SF(42),
    height: SF(42),
    position: 'absolute',
    right: SW(7),
    top: SH(9),
  },
  ridesImage: { width: SW(74), height: SH(44) },
  orderContainer: { gap: SH(16), paddingBottom: SH(1600) },
  card: {
    backgroundColor: '#fff',
    borderRadius: SF(8),
    padding: SF(10),
    shadowColor: '#414141',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 3,
  },
  orderId: { fontSize: SF(19), color: '#707070', fontWeight: 700 },
  dropContainer: { marginTop: SH(10), marginBottom: SH(12) },
  locationContainer: {
    width: SF(29),
    height: SF(29),
    backgroundColor: '#F49A3A',
    borderRadius: SF(58),
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickupName: { fontWeight: 600, fontSize: SF(18), color: '#555454' },
  pickupSubContainerText: { flexDirection: 'column', rowGap: SH(5) },
  pickupSubContainer: {
    flexDirection: 'row',
    gap: SW(13),
    alignItems: 'flex-start',
  },
  durationText: { fontWeight: 600, fontSize: SF(14), color: '#555454' },
  pickupAddress: {
    color: 'rgba(7, 7, 7, 1)',
    fontSize: SF(12),
    fontWeight: 400,
  },
});
