import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import colorsset from '../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { SF, SH, SW } from '../utils/dimensions';
import { TouchableOpacity } from 'react-native';
import images from '../image/images';
import { useCallback, useEffect, useRef, useState } from 'react';
import getTime from '../utils/timeConversion';
import MapViewDirections from 'react-native-maps-directions';
import {} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useGlobalContext } from '../contexts/globalContext';
import { GOOGLE_MAPS_APIKEY } from '@env';

const orderStatusColor = {
  Delivered: {
    color: 'rgba(0, 123, 59, 1)',
    backgroundColor: 'rgba(106, 255, 89, 0.2)',
  },
  ['Order inprogress']: {
    color: 'rgba(187, 153, 0, 1)',
    backgroundColor: 'rgba(255, 225, 89, 0.2)',
  },
  ['Pickup Pending']: {
    color: '#FF5963',
    backgroundColor: 'rgba(255, 89, 99, 0.2)',
  },
  ['Picked Up']: {
    color: 'rgba(0, 102, 255, 1)', // strong blue
    backgroundColor: 'rgba(0, 102, 255, 0.2)', // light transparent blue
  },
};
const paidStatusColor = {
  Paid: {
    color: 'rgba(0, 123, 59, 1)',
    backgroundColor: 'rgba(106, 255, 89, 0.2)',
  },
  ['Not Paid']: {
    color: '#000000',
    backgroundColor: 'rgba(199, 199, 199, 0.2)',
  },
};
const OrderCard = ({ orderDetail, handleNavigate, origin }) => (
  <TouchableOpacity
    onPress={() => handleNavigate(orderDetail)}
    style={styles.card}
  >
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text style={styles.orderId}>Order ID: #{orderDetail.orderId}</Text>
      <Text
        style={{
          color: `${orderStatusColor[orderDetail.status]?.color}`,
          fontWeight: 700,
          fontSize: SF(14),
          backgroundColor: `${
            orderStatusColor[orderDetail.status]?.backgroundColor
          }`,
          paddingVertical: SH(3),
          paddingHorizontal: SW(8),
          borderRadius: SF(6),
        }}
      >
        {orderDetail.status}
      </Text>
    </View>

    <View style={styles.dropContainer}>
      <View style={styles.pickupSubContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SH(5),
            alignItems: 'center',
          }}
        >
          <View style={styles.locationContainer}>
            <Icon name="location-outline" size={SF(14)} color={'white'} />
          </View>
          {origin && orderDetail.distance > 0 ? (
            <Text
              style={{ color: '#000000', fontWeight: '600', fontSize: SF(8) }}
            >
              {'['}
              {orderDetail.distance} KM
              {']'}
            </Text>
          ) : (
            <View
              style={{
                width: SW(40),
                height: SF(10),
                borderRadius: SF(4),
                backgroundColor: '#e0e0e0',
                opacity: 0.5,
              }}
            />
          )}
        </View>
        <View style={styles.pickupSubContainerText}>
          <Text style={styles.pickupName}>{orderDetail.name}</Text>
          <View style={styles.duration}>
            <Text style={styles.pickupAddress}>{orderDetail.address}</Text>
          </View>
        </View>
      </View>
    </View>
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: SW(3),
        }}
      >
        <Icon name="time-outline" size={SF(16)} color={'#1332D0'} />
        {fromLocation && orderDetail.duration > 0 ? (
          <Text style={styles.durationText}>
            {getTime(orderDetail.duration).current} -{' '}
            {getTime(orderDetail.duration).extra}
          </Text>
        ) : (
          <View
            style={{
              width: SW(120),
              height: SF(20),
              borderRadius: SF(4),
              backgroundColor: '#e0e0e0',
              opacity: 0.5,
            }}
          />
        )}
      </View>

      <Text
        style={{
          color: `${paidStatusColor[orderDetail.paidStatus]?.color}`,
          fontWeight: 700,
          fontSize: SF(14),
          backgroundColor: 'rgba(199, 199, 199, 0.2)',
          paddingVertical: SH(3),
          paddingHorizontal: SW(4),
          borderRadius: SF(4),
        }}
      >
        {orderDetail.paidStatus} {orderDetail.amount}
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
  const { state, dispatch } = useGlobalContext();
  const orderDetails = state?.orderDetails;
  const mapRef = useRef(null);
  useEffect(() => {
    console.log(state.orderDetails);
  }, [state]);

  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Request location permission
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('Location permission denied');
          return;
        }
      }

      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log('Current GPS:', latitude, longitude);
          setOrigin({ latitude, longitude });
        },
        error => {
          console.log('Geolocation error:', JSON.stringify(error));
          alert(`Location Error: ${error.message}`);
        },
        {
          enableHighAccuracy: false, // false uses network/wifi instead of GPS
          timeout: 10000, // wait max 10s
          maximumAge: 1000,
        },
      );
    } catch (err) {
      console.warn(err);
    }
  };

  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);
  const handleDirectionsReady = useCallback((result, index) => {
    const updatedOrders = stateRef.current.orderDetails.map((order, i) =>
      i === index
        ? {
            ...order,
            distance: result.distance,
            duration: result.duration,
          }
        : order,
    );
    dispatch({
      type: 'SET_ORDER_DETAILS',
      payload: updatedOrders,
    });

    mapRef.current?.fitToCoordinates(result.coordinates, {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  }, []);

  const [isOnGoing, setisOnGoing] = useState(true);
  const [origin, setOrigin] = useState(null);

  const handleNavigate = orderDetail => {
    navigation.navigate('Order', { orderDetail });
  };
  const handleNavigateReport = () => {
    navigation.navigate('Reports');
  };
  const handleOrderStatus = type => {
    if (type === 'onGoing') {
      setisOnGoing(true);
    } else {
      setisOnGoing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Add translucent status bar */}
      <StatusBar
        translucent={false}
        backgroundColor={colorsset.theme_backgound_second} // or your gradient start color
        barStyle="dark-content" // or "light-content" based on your theme
      />

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
            Hi Kevin
          </Text>
        </View>

        <View
          style={{
            gap: SH(21),
            marginTop: SH(27),
          }}
        >
          <View
            style={{
              paddingHorizontal: SW(13),
              paddingTop: SH(11),
              paddingBottom: SH(22),
              backgroundColor: '#FFFFFF',
              borderRadius: SF(10),
              // Shadow for iOS
              shadowColor: '#414141',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.15,
              shadowRadius: 20, // 40px blur in Figma ≈ 20 in RN

              // Shadow for Android
              elevation: 8,
            }}
          >
            <Text
              style={{ color: '#BA0505', fontSize: SF(22), fontWeight: 600 }}
            >
              Today’s Summary
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginHorizontal: SW(17),
                justifyContent: 'space-between',
                marginTop: SH(16),
              }}
            >
              <View
                style={{
                  display: 'flex',
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
                  {orderDetails.length} Orders
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
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
                  {
                    orderDetails?.filter(item => item.status === 'Delivered')
                      .length
                  }{' '}
                  Orders
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
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
                  {orderDetails
                    .filter(order => order.status === 'Delivered')
                    .reduce((a, b) => a + b.distance, 0)
                    .toFixed(2) || 0}{' '}
                  KM
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: SW(10),
            }}
          >
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: SF(10),
                // Shadow for iOS
                shadowColor: '#414141',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.15,
                shadowRadius: 20, // 40px blur in Figma ≈ 20 in RN

                // Shadow for Android
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
                  {
                    orderDetails?.filter(
                      item => item.status === 'Pickup Pending',
                    ).length
                  }
                </Text>

                <View
                  style={{
                    display: 'flex',
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
                // Shadow for iOS
                shadowColor: '#414141',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.15,
                shadowRadius: 20, // 40px blur in Figma ≈ 20 in RN

                // Shadow for Android
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
                  {
                    orderDetails?.filter(
                      item => item.status === 'Order inprogress',
                    ).length
                  }
                </Text>

                <View
                  style={{
                    display: 'flex',
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

          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: SF(10),
              // Shadow for iOS
              shadowColor: '#414141',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.15,
              shadowRadius: 20, // 40px blur in Figma ≈ 20 in RN

              // Shadow for Android
              elevation: 8,
              display: 'flex',
              flexDirection: 'row',
              padding: SF(4),
            }}
          >
            <TouchableOpacity
              style={{
                flex: 2,
                paddingVertical: SH(11),
                borderRadius: SF(10),
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: `${isOnGoing ? '#32ADE6' : '#FFFFFF'}`,
                justifyContent: 'center',
              }}
              onPress={() => handleOrderStatus('onGoing')}
            >
              <Text
                style={{
                  fontSize: SF(15),
                  fontWeight: 600,
                  color: `${isOnGoing ? '#FFFFFF' : '#000000'}`,
                }}
              >
                Ongoing
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 2,
                paddingVertical: SH(11),
                backgroundColor: `${isOnGoing ? '#FFFFFF' : '#32ADE6'}`,
                borderRadius: SF(10),
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              onPress={() => handleOrderStatus('completed')}
            >
              <Text
                style={{
                  fontSize: SF(15),
                  fontWeight: 600,
                  color: `${isOnGoing ? '#000000' : '#FFFFFF'}`,
                }}
              >
                Completed
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={orderDetails.filter(items =>
                !isOnGoing
                  ? items.status === 'Delivered'
                  : items.status !== 'Delivered',
              )}
              keyExtractor={item => item.orderId}
              renderItem={({ item }) => (
                <OrderCard
                  orderDetail={item}
                  handleNavigate={handleNavigate}
                  origin={fromLocation}
                />
              )}
              contentContainerStyle={styles.orderContainer}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
        {fromLocation &&
          orderDetails.map((order, index) => (
            <MapViewDirections
              key={order.orderId}
              origin={fromLocation}
              destination={order.location}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={2}
              strokeColor="#FF0000"
              mode="DRIVING"
              onReady={result => handleDirectionsReady(result, index)}
              onError={error =>
                console.log('Directions error at index', index, error)
              }
            />
          ))}
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsset.theme_backgound_second,
  },
  scrollContent: {
    paddingBottom: SF(20),
    marginHorizontal: SW(19),
  },
  innerContainer: {
    paddingTop: SH(6),
    gap: SW(12),
    display: 'flex',
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
  deliveredImage: {
    width: SW(61),
    height: SH(44),
  },
  assignedImage: {
    width: SW(44),
    height: SH(44),
  },
  waitingImage: {
    width: SF(42),
    height: SF(42),
    position: 'absolute',
    right: SW(7),
    top: SH(9),
  },
  ridesImage: {
    width: SW(74),
    height: SH(44),
  },

  orderContainer: {
    gap: SH(16),
    paddingBottom: SH(1400),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: SF(8),
    padding: SF(10),
    shadowColor: '#414141',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 20, // 40px blur in Figma ≈ 20 in RN

    // Shadow for Android
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    marginBottom: 2,
    color: '#555',
  },
  orderId: {
    fontSize: SF(19),
    color: '#707070',
    fontWeight: 700,
  },
  dropContainer: {
    marginTop: SH(10),
    marginBottom: SH(12),
  },
  locationContainer: {
    width: SF(29),
    height: SF(29),
    backgroundColor: '#F49A3A',
    borderRadius: SF(58),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickupName: {
    fontWeight: 600,
    fontSize: SF(18),
    color: '#555454',
  },
  pickupSubContainerText: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: SH(5),
  },
  pickupSubContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: SW(13),
    alignItems: 'flex-start',
  },
  durationText: {
    fontWeight: 600,
    fontSize: SF(14),
    color: '#555454',
  },
});
