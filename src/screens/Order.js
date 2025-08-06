import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  StatusBar,
  Easing,
  Linking,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { SF, SH, SW } from '../utils/dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../image/images';
import Map from '../components/commonComponent/Map';
import { useState, useRef, useEffect } from 'react';
import { useGlobalContext } from '../contexts/globalContext';
import SwitchToggle from 'react-native-switch-toggle';

const Order = ({ navigation, route }) => {
  const { state, dispatch } = useGlobalContext();

  const { orderDetail } = route.params;

  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [orderData, setOrderData] = useState({});
  useEffect(() => {
    const match = state.orderDetails.find(
      order => order.orderId === orderDetail.orderId,
    );
    if (match) {
      setOrderData(match);
    }
  }, [orderDetail, state.orderDetails]);
  const handleBack = () => {
    navigation.navigate('Dashboard');
  };
  const getTime = timeDuration => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + timeDuration);

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const twelveHour = hours % 12 || 12;

    const extraTime = new Date();
    extraTime.setMinutes(extraTime.getMinutes() + timeDuration + 30);
    let extraHours = extraTime.getHours();
    const extraMinutes = extraTime.getMinutes().toString().padStart(2, '0');
    const extraAmpm = extraHours >= 12 ? 'PM' : 'AM';
    const extraTwelveHour = extraHours % 12 || 12;

    return {
      current: `${twelveHour}:${minutes} ${ampm}`,
      extra: `${extraTwelveHour}:${extraMinutes} ${extraAmpm}`,
    };
  };

  const slideAnim = useRef(new Animated.Value(-80)).current; // Assuming header height ~80
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(SH(65));
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.measure((x, y, width, height) => {
        setHeaderHeight(height);
      });
    }
  }, []);
  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: isInfoOpen ? 0 : -200,
        duration: 350,
        easing: Easing.out(Easing.exp), // smooth easing for both
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: isInfoOpen ? 1 : 0,
        duration: 350,
        easing: Easing.out(Easing.exp), // same easing
        useNativeDriver: true,
      }),
    ]).start();
  }, [isInfoOpen]);

  const handleInfo = () => {
    setIsInfoOpen(!isInfoOpen);
  };

  const orderType = {
    ['Picked Up']: { text: 'Mark as Delivered', statusChange: 'Delivered' },
    ['Pickup Pending']: {
      text: 'Mark As Picked Up',
      statusChange: 'Picked Up',
    },
    ['Order inprogress']: {
      text: 'Swipe To Accept Order',
      statusChange: 'Pickup Pending',
    },
  };

  const handleChangeStatus = status => {
    dispatch({
      type: 'UPDATE_ORDER_STATUS',
      payload: {
        orderId: orderData.orderId,
        newStatus: status,
      },
    });
  };
  const handleNavigate = status => {
    dispatch({
      type: 'UPDATE_ORDER_STATUS',
      payload: {
        orderId: orderData.orderId,
        newStatus: status,
      },
    });
    navigation.navigate('OrderDelivered', {
      distance: Number(distance).toFixed(2),
      duration,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="rgba(255, 255, 255, 1)"
        barStyle="dark-content"
        translucent={false} // This ensures StatusBar does not overlap content
      />

      <View
        style={{
          borderRadius: SF(10),
        }}
      >
        {/* Header */}
        <View style={styles.header} ref={headerRef}>
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={handleBack} style={styles.back}>
              <Icon name="chevron-back" size={SF(14)} color={'#181C2E'} />
            </TouchableOpacity>
            <Text style={styles.title}>Order Details</Text>
          </View>
          <View>
            {isInfoOpen ? (
              <TouchableOpacity
                style={styles.closeContainer}
                onPress={handleInfo}
              >
                <Icon name="close" size={SF(16)} color={'#960000'} />

                <Text style={styles.closeText}>Close Info</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.infoContainer}
                onPress={handleInfo}
              >
                <Icon
                  name="bag-handle-outline"
                  size={SF(16)}
                  color={'#005882'}
                />

                <Text style={styles.infoText}>Order Info</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* Map view */}
        <View
          style={{
            position: 'relative',
            height: SH(493),
            width: '100%',
          }}
        >
          <Map
            status={orderData.status}
            orderId={orderData.orderId}
            distance={distance}
            duration={duration}
            setDistance={setDistance}
            setDuration={setDuration}
            location={orderData.location}
          />

          {isInfoOpen && (
            <Animated.View
              style={[
                styles.orderInfoOverlay,
                {
                  top: headerHeight, // 👈 this is the dynamic top position
                  transform: [{ translateY: slideAnim }],
                  opacity: fadeAnim,
                },
              ]}
            >
              <View style={styles.orderInfoContainer}>
                <View>
                  <View style={styles.orderInfoItemContainer}>
                    <Text style={styles.orderInfoItem}>Vanjaram</Text>
                    <Text style={styles.orderInfoDetail}>{`  [1kg X 2]`}</Text>
                  </View>
                  <Text style={styles.orderInfoType}>Fillets - Fresh Crab</Text>
                </View>
                <Text style={styles.orderInfoPrice}>₹ 200</Text>
              </View>
              <View style={styles.orderInfoContainer}>
                <View>
                  <View style={styles.orderInfoItemContainer}>
                    <Text style={styles.orderInfoItem}>Crab</Text>
                    <Text style={styles.orderInfoDetail}>{`  [1kg X 1]`}</Text>
                  </View>
                  <Text style={styles.orderInfoType}>Fillets - Fresh Crab</Text>
                </View>
                <Text style={styles.orderInfoPrice}>₹ 450</Text>
              </View>
              <View style={styles.orderInfoContainer}>
                <View>
                  <View style={styles.orderInfoItemContainer}>
                    <Text style={styles.orderInfoItem}>Black Pomfret</Text>
                    <Text style={styles.orderInfoDetail}>{`  [1kg X 1]`}</Text>
                  </View>
                  <Text style={styles.orderInfoType}>Fillets - Fresh Crab</Text>
                </View>
                <Text style={styles.orderInfoPrice}>₹ 450</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: SF(14),
                  backgroundColor: '#FFFFFF',
                  borderRadius: SF(10),
                }}
              >
                <Text
                  style={{
                    color: '#A40000',
                    fontSize: SF(18),
                    fontWeight: 700,
                  }}
                >
                  Cash On Delivery
                </Text>
                <Text
                  style={{
                    color: '#A40000',
                    fontSize: SF(18),
                    fontWeight: 700,
                  }}
                >
                  {orderData.amount}
                </Text>
              </View>
            </Animated.View>
          )}
        </View>
      </View>
      <View
        style={{
          borderRadius: SF(24),
          backgroundColor: '#FFFFFF',
          flexShrink: 0,
          paddingBottom: SH(20), // add padding for safety
          top: SH(-30),
        }}
      >
        {/* recipient Name Container */}
        <View style={styles.recipientContainer}>
          <View style={styles.recipientSubContainer}>
            <Icon name="bag-handle-outline" size={SF(24)} color={'#1332D0'} />
            <View style={styles.recipientSubContainerText}>
              <Text style={styles.recipientName}>{orderData?.name}</Text>
              <View style={styles.duration}>
                {distance > 0 ? (
                  <Text style={styles.distance}>
                    {Number(distance).toFixed(2)} Km
                  </Text>
                ) : (
                  <View
                    style={{
                      width: SW(80),
                      height: SF(30),
                      borderRadius: SF(4),
                      backgroundColor: '#e0e0e0',
                      opacity: 0.5,
                    }}
                  />
                )}
                <Icon name="time-outline" size={SF(16)} color={'#1332D0'} />
                {duration > 0 ? (
                  <Text style={styles.durationText}>
                    {getTime(duration).current} - {getTime(duration).extra}
                  </Text>
                ) : (
                  <View
                    style={{
                      width: SW(110),
                      height: SF(20),
                      borderRadius: SF(4),
                      backgroundColor: '#e0e0e0',
                      opacity: 0.5,
                    }}
                  />
                )}
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.callContainer}
            onPress={() => Linking.openURL(`tel:${orderDetail.mobileNumber}`)}
          >
            <Icon name="call-sharp" size={SF(19)} color={'white'} />
          </TouchableOpacity>
        </View>
        {/* recipient Address Container */}
        <View style={styles.pickupContainer}>
          <View style={styles.pickupSubContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <View style={styles.pickupImageContainer}>
                <Image
                  source={images.pickupIcon}
                  resizeMode="contain"
                  style={styles.pickupImage}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: SH(11),
                }}
              >
                {/* Dashed line */}
                <View
                  style={{
                    borderLeftWidth: SF(1),
                    height: SH(36),
                    borderStyle: 'dashed',
                    borderLeftColor: '#616161',
                  }}
                />

                {/* Downward icon */}
                <Icon name="chevron-down" size={SF(19)} color="#616161" />
              </View>
            </View>
            <View style={styles.pickupSubContainerText}>
              <Text style={styles.pickupName}>GreenWays Store -2</Text>
              <View style={styles.duration}>
                <Text style={styles.pickupAddress}>
                  {
                    '1/78, Middle Street, Veeranamangalam\n Near Lutheran Church - 629901'
                  }
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.dropContainer}>
          <View style={styles.pickupSubContainer}>
            <View style={styles.locationContainer}>
              <Icon name="location-outline" size={SF(14)} color={'white'} />
            </View>
            <View style={styles.pickupSubContainerText}>
              <Text style={styles.pickupName}>Home</Text>
              <View style={styles.duration}>
                <Text style={styles.pickupAddress}>{orderData.address}</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginHorizontal: SW(37),
            gap: SW(8),
            alignItems: 'center',
            marginTop: SH(15),
          }}
        >
          <SwitchToggle
            switchOn={isEnabled}
            onPress={() => setIsEnabled(!isEnabled)}
            containerStyle={{
              width: SF(55),
              height: SF(30),
              borderRadius: SF(30),
              padding: SF(4),
            }}
            circleStyle={{
              width: SF(25),
              height: SF(25),
              borderRadius: SF(25),
            }}
            circleColorOn="rgba(255, 255, 255, 1)"
            circleColorOff="rgba(255, 255, 255, 1)"
            backgroundColorOn="rgba(50, 173, 230, 1)"
          />
          <Text
            style={{
              color: 'rgba(85, 84, 84, 1)',
              fontWeight: 600,
              fontSize: SF(18),
            }}
          >
            Cash On Delivery
          </Text>

          <Text
            style={{
              color: 'rgba(85, 84, 84, 1)',
              fontWeight: 800,
              fontSize: SF(20),
            }}
          >
            {orderData.amount}
          </Text>
        </View>
        {orderData.status !== 'Delivered' && distance > 0 && (
          <TouchableOpacity
            onPress={() => {
              orderData.status === 'Picked Up'
                ? handleNavigate(orderType[orderData.status].statusChange)
                : handleChangeStatus(orderType[orderData.status].statusChange);
            }}
            style={styles.orderSwipeContainer}
          >
            <View style={styles.orderArrowContainer}>
              <FontAwesomeIcon
                name="angle-double-right"
                size={SF(20)}
                color={'#03A360'}
              />
            </View>
            <Text style={styles.orderSwipeText}>
              {orderType[orderData.status].text}
            </Text>
            <Text></Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colorsset.theme_backgound,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  back: {
    width: SF(30),
    height: SF(30),
    borderRadius: SF(30),
    backgroundColor: '#ECF0F4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: SW(13),
    marginTop: SH(12),
    marginBottom: SH(14),
  },
  title: {
    fontWeight: 600,
    fontSize: SF(18),
    color: 'black',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: SW(12),
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: SW(6),
    padding: SH(5),
    borderWidth: SF(1),
    borderColor: '#005882',
    borderRadius: SF(4),
    backgroundColor: '#fff',
  },
  infoText: {
    fontWeight: 600,
    fontSize: SF(16),
    color: '#005882',
  },
  closeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: SW(6),
    padding: SH(5),
    borderWidth: SF(1),
    borderColor: '#960000',
    borderRadius: SF(4),
    backgroundColor: '#fff',
  },
  closeText: {
    fontWeight: 600,
    fontSize: SF(16),
    color: '#960000',
  },
  recipientContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: SW(18),
    borderBottomWidth: SF(1),
    borderBottomColor: '#C0C0C0',
    borderStyle: 'dashed',
    paddingBottom: SH(14),
    marginTop: SH(24),
  },
  recipientSubContainerText: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: SH(5),
  },
  recipientSubContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: SW(13),
  },
  recipientName: {
    fontWeight: 600,
    fontSize: SF(18),
    color: '#555454',
  },
  distance: {
    color: 'black',
    fontWeight: 600,
    fontSize: SF(20),
    paddingRight: SW(4),
  },
  duration: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: SW(2),
  },
  durationText: {
    fontWeight: 600,
    fontSize: SF(14),
    color: '#555454',
  },
  orderInfoOverlay: {
    position: 'absolute',
    top: SH(65),
    left: 0,
    right: 0,
    paddingTop: SF(10),
    backgroundColor: 'rgba(255, 255, 255, 1)', // Slight transparency
    zIndex: 10,
    borderBottomLeftRadius: SF(10),
    borderBottomRightRadius: SF(10),
  },

  callContainer: {
    width: SH(35),
    height: SH(35),
    borderRadius: SH(70),
    backgroundColor: '#32ADE6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickupImageContainer: {
    width: SF(29),
    height: SF(29),
    backgroundColor: '#058D05',
    borderRadius: SF(58),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickupImage: {
    height: SF(11),
    width: SF(15),
  },
  pickupAddress: {
    color: '#070707',
    fontWeight: 400,
    fontSize: SF(14),
  },
  pickupContainer: {
    marginHorizontal: SW(18),
    marginTop: SH(17),
  },
  pickupSubContainerText: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: SH(5),
    flex: 1,
  },
  pickupSubContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: SW(13),
    alignItems: 'flex-start',
    // justifyContent:'space-between'
  },
  pickupName: {
    fontWeight: 600,
    fontSize: SF(18),
    color: '#555454',
  },
  dropContainer: {
    marginHorizontal: SW(18),
    marginTop: SH(8),
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
  orderSwipeContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#03A360',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SF(5),
    borderRadius: SF(70),
    marginBottom: SH(28),
    marginHorizontal: SW(35),
    marginTop: SH(9),
  },
  orderArrowContainer: {
    width: SF(35),
    height: SF(35),
    backgroundColor: '#FFFFFF',
    borderRadius: SF(58),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderSwipeText: {
    fontWeight: 700,
    fontSize: SF(16),
    color: '#FFFFFF',
  },
  orderInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: SW(17),
    paddingVertical: SH(5),
  },
  orderInfoItemContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  orderInfoItem: {
    color: 'black',
    fontWeight: 700,
    fontSize: SF(13),
  },
  orderInfoDetail: {
    color: '#9A0000',
    fontWeight: 700,
    fontSize: SF(13),
  },
  orderInfoType: {
    color: '#646982',
    fontWeight: 700,
    fontSize: SF(13),
  },
  orderInfoPrice: {
    color: 'black',
    fontWeight: 700,
    fontSize: SF(16),
  },
});
