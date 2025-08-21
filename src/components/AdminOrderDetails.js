import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { formatDate, formatTime } from '../utils/formatTime';
import { SF, SH, SW } from '../utils/dimensions';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import images from '../image/images';
import AdminOrderDetailView from './AdminOrderDetailView';
const orderData = [
  {
    orderId: 100001,
    items: [
      'Vanjaram - 1/2Kg * 2',
      'Prawns - 1Kg',
      'Crab - 1Kg',
      'Pomfret - 1/2Kg * 2',
      'Squid - 1/2Kg',
    ],
    itemsPrice: [200, 100, 400, 500, 200],
    amount: 1350,
    address: '12, Beach Road, Rameswaram, TN - 623526 ',
    updatedAt: '2025-07-19T10:15:00.000Z',
    status: 'Delivered',
  },
  {
    orderId: 100002,
    items: [
      'Vanjaram - 1Kg',
      'Prawns - 1/2Kg * 2',
      'Crab - 1/2Kg * 2',
      'Lobster - 1/2Kg',
      'Pomfret - 1Kg',
    ],
    itemsPrice: [200, 300, 700, 500, 200],
    amount: 1650,
    address: '45, Harbor Street, Tuticorin, TN - 628001',
    updatedAt: '2025-07-20T08:30:00.000Z',
    status: 'Processing',
  },
  {
    orderId: 100003,
    items: [
      'Crab - 1/2Kg',
      'Prawns - 1Kg',
      'Squid - 1Kg',
      'Vanjaram - 1/2Kg * 2',
      'Anchovy - 1/2Kg',
    ],
    itemsPrice: [200, 300, 900, 500, 200],
    amount: 1250,
    address: '78, Coastal Road, Nagercoil, TN - 629001',
    updatedAt: '2025-07-21T07:20:00.000Z',
    status: 'Shipped',
  },
  {
    orderId: 100004,
    items: [
      'Vanjaram - 1/2Kg * 2',
      'Prawns - 1/2Kg',
      'Crab - 1/2Kg',
      'Mackerel - 1Kg',
      'Lobster - 1Kg',
    ],
    itemsPrice: [200, 100, 400, 500, 200],
    amount: 1480,
    address: '29, Fishermen Colony, Kanyakumari, TN - 629702',
    updatedAt: '2025-07-22T12:45:00.000Z',
    status: 'Processing',
  },
  {
    orderId: 100005,
    items: [
      'Squid - 1/2Kg',
      'Anchovy - 1/2Kg',
      'Prawns - 1Kg',
      'Crab - 1Kg',
      'Pomfret - 1/2Kg',
      'Vanjaram - 1/2Kg',
    ],
    itemsPrice: [200, 300, 400, 600, 200, 100],
    amount: 1525,
    address: '11, Port View Road, Chennai, TN - 600001',
    updatedAt: '2025-07-23T14:00:00.000Z',
    status: 'Processing',
  },
  {
    orderId: 100006,
    items: [
      'Lobster - 1/2Kg',
      'Crab - 1/2Kg * 2',
      'Vanjaram - 1Kg',
      'Prawns - 1Kg',
      'Squid - 1/2Kg',
    ],
    itemsPrice: [200, 400, 400, 500, 200],
    amount: 1580,
    address: '86, Sea Line Avenue, Nagapattinam, TN - 611001',
    updatedAt: '2025-07-24T09:10:00.000Z',
    status: 'Processing',
  },
  {
    orderId: 100007,
    items: [
      'Pomfret - 1/2Kg * 2',
      'Anchovy - 1Kg',
      'Vanjaram - 1/2Kg * 2',
      'Prawns - 1Kg',
      'Squid - 1Kg',
    ],
    itemsPrice: [200, 300, 800, 500, 200],
    amount: 1600,
    address: '134, Marine Lane, Cuddalore, TN - 607001',
    updatedAt: '2025-07-25T11:25:00.000Z',
    status: 'Delivered',
  },
  {
    orderId: 100008,
    items: [
      'Mackerel - 1Kg',
      'Vanjaram - 1/2Kg * 2',
      'Crab - 1Kg',
      'Squid - 1/2Kg',
      'Lobster - 1Kg',
    ],
    itemsPrice: [200, 300, 200, 500, 200],
    amount: 1620,
    address: '67, Ocean Drive, Karaikal, PY - 609602',
    updatedAt: '2025-07-26T13:40:00.000Z',
    status: 'Shipped',
  },
];

const orderStatusColor = {
  ['Processing']: {
    text: 'rgba(255, 83, 0, 1)',
    backgroundColor: 'rgba(255, 232, 221, 1)',
  },
  ['Shipped']: {
    text: 'rgba(248, 46, 157, 1)',
    backgroundColor: 'rgba(255, 228, 243, 1)',
  },
  ['Delivered']: {
    text: 'rgba(3, 131, 11, 1)',
    backgroundColor: 'rgba(223, 255, 208, 1)',
  },
};

const AdminOrderDetails = ({ navbarHeight, navigation }) => {
  const [expandedOrders, setExpandedOrders] = useState({});
  const [isActionView, setIsActionView] = useState({});
  const [isOnGoing, setisOnGoing] = useState(true);
  const [isDetailView, setIsDetailView] = useState({
    status: false,
    order: null,
  });
  const toggleExpand = orderId => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };
  const toggleExpandActionView = orderId => {
    setIsActionView(prev => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };
  const handleBack = () => {
    navigation.goBack();
  };
  const handleOrderStatus = type => {
    if (type === 'onGoing') {
      setisOnGoing(true);
    } else {
      setisOnGoing(false);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={handleBack} style={styles.back}>
            <Ionicons name="chevron-back" size={SF(14)} color={'#181C2E'} />
          </TouchableOpacity>
          <Text style={styles.title}>Order Details</Text>
        </View>
      </View>
      <View>
        {!isDetailView?.status ? (
          <View>
            <View
              style={{
                backgroundColor: 'rgba(245, 246, 251, 1)',
                marginTop: SH(32),
                // Shadow for Android
                display: 'flex',
                flexDirection: 'row',
                paddingHorizontal: SW(28),
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 2,

                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  borderColor: `${
                    isOnGoing
                      ? 'rgba(50, 173, 230, 1)'
                      : 'rgba(245, 246, 251, 1)'
                  }`,
                  borderBottomWidth: SF(2),
                  borderBottomWidth: SF(2),
                }}
                onPress={() => handleOrderStatus('onGoing')}
              >
                <Text
                  style={{
                    fontSize: SF(14),
                    fontWeight: 700,
                    color: `${
                      isOnGoing
                        ? 'rgba(50, 173, 230, 1)'
                        : 'rgba(50, 52, 62, 1)'
                    }`,
                  }}
                >
                  Ongoing
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 2,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  borderColor: `${
                    isOnGoing
                      ? 'rgba(245, 246, 251, 1)'
                      : 'rgba(50, 173, 230, 1)'
                  }`,
                  borderBottomWidth: SF(2),
                  paddingBottom: SH(15),
                }}
                onPress={() => handleOrderStatus('completed')}
              >
                <Text
                  style={{
                    fontSize: SF(14),
                    fontWeight: 700,
                    color: `${
                      isOnGoing
                        ? 'rgba(50, 52, 62, 1)'
                        : 'rgba(50, 173, 230, 1)'
                    }`,
                  }}
                >
                  Completed
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontWeight: 400,
                fontSize: SF(14),
                color: 'rgba(156, 155, 166, 1)',
                paddingTop: SH(24),
                paddingHorizontal: SW(24),
                paddingBottom: SH(11),
              }}
            >
              Total{' '}
              {String(
                orderData.filter(order =>
                  isOnGoing
                    ? order.status !== 'Delivered'
                    : order.status === 'Delivered',
                ).length,
              ).padStart(2, 0)}{' '}
              Orders
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: navbarHeight + SH(20),
              }}
            >
              <View
                style={{
                  backgroundColor: 'rgba(245, 246, 251, 1)',
                  paddingHorizontal: SW(10),
                  borderTopLeftRadius: SF(25),
                  borderTopRightRadius: SF(25),
                }}
              >
                <View>
                  {orderData
                    .filter(filterOrder =>
                      isOnGoing
                        ? filterOrder.status !== 'Delivered'
                        : filterOrder.status === 'Delivered',
                    )
                    .map(order => {
                      const isExpanded = expandedOrders[order.orderId];
                      const isExpandedAction = isActionView[order.orderId];
                      const visibleItems = isExpanded
                        ? order.items
                        : order.items.slice(0, 2);

                      return (
                        <TouchableOpacity
                          key={order.orderId}
                          style={{
                            marginBottom: SH(20),
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            borderRadius: SF(10),
                          }}
                          onPress={() =>
                            setIsDetailView({ order, status: true })
                          }
                        >
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              paddingVertical: SH(8),
                              backgroundColor: 'rgba(242, 244, 255, 1)',
                              padding: SF(7),
                              margin: SF(4),
                              borderTopLeftRadius: SF(10),
                              borderTopRightRadius: SF(10),
                            }}
                          >
                            <View style={{}}>
                              <Text
                                style={{
                                  fontWeight: 700,
                                  fontSize: SF(13),
                                  color: 'rgba(107, 110, 130, 1)',
                                }}
                              >
                                #{order.orderId}
                              </Text>
                              <Text
                                style={{
                                  fontWeight: 700,
                                  fontSize: SF(9),
                                  color: 'rgba(160, 165, 186, 1)',
                                }}
                              >
                                {order.address}
                              </Text>
                            </View>

                            <Text
                              style={{
                                fontWeight: 700,
                                fontSize: SF(9),
                                color: orderStatusColor[order.status].text,
                                backgroundColor:
                                  orderStatusColor[order.status]
                                    .backgroundColor,
                                padding: SF(4),
                                borderRadius: SF(4),
                              }}
                            >
                              {order.status}
                            </Text>
                          </View>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              borderBottomWidth: SF(1),
                              borderBottomColor: 'rgba(243, 242, 242, 1)',
                              borderStyle: 'dashed',
                              paddingBottom: SH(3),
                              paddingHorizontal: SW(11),
                            }}
                          >
                            <View>
                              <View
                                style={{
                                  gap: SH(6),
                                  paddingTop: SH(9),
                                  marginBottom: SH(9),
                                }}
                              >
                                {visibleItems.map((item, index) => (
                                  <View
                                    key={index}
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      width: '100%',
                                    }}
                                  >
                                    <View
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: SW(6),
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Image
                                        source={images.fish}
                                        resizeMode="contain"
                                        style={{
                                          width: SF(16),
                                          height: SF(16),
                                        }}
                                      />
                                      <Text
                                        style={{
                                          fontWeight: 700,
                                          fontSize: SF(12),
                                          color: 'rgba(0, 0, 0, 1)',
                                        }}
                                      >
                                        {item}
                                      </Text>
                                    </View>
                                    <View>
                                      <Text
                                        style={{
                                          fontWeight: 700,
                                          fontSize: SF(12),
                                          color: 'rgba(100, 105, 130, 1)',
                                        }}
                                      >
                                        ₹ {order.itemsPrice[index]}
                                      </Text>
                                    </View>
                                  </View>
                                ))}
                              </View>

                              {order.items.length > 2 && (
                                <TouchableOpacity
                                  onPress={() => toggleExpand(order.orderId)}
                                >
                                  <Text
                                    style={{
                                      color: 'rgba(120, 119, 119, 1)',
                                      marginTop: SH(5),
                                      fontSize: SF(10),
                                      fontWeight: 700,
                                    }}
                                  >
                                    {isExpanded
                                      ? 'Show Less'
                                      : `& ${
                                          order.items.length - 2
                                        } More Items`}
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          </View>
                          <View
                            style={{ display: 'flex', flexDirection: 'column' }}
                          >
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingTop: SH(7),
                                paddingBottom: SH(11),
                                paddingHorizontal: SW(9),
                              }}
                            >
                              <Text
                                style={{
                                  fontWeight: 700,
                                  fontSize: SF(11),
                                  color: 'rgba(160, 165, 186, 1)',
                                }}
                              >
                                Order At: {formatDate(order.updatedAt)}{' '}
                                {formatTime(order.updatedAt)}
                              </Text>
                              <Text
                                style={{
                                  fontWeight: 700,
                                  fontSize: SF(15),
                                  color: 'rgba(0, 0, 0, 1)',
                                }}
                              >
                                ₹ {order.itemsPrice.reduce((a, b) => a + b)}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                </View>
                {/* You can add your full Figma UI here */}
              </View>
            </ScrollView>
          </View>
        ) : (
          <AdminOrderDetailView
            navbarHeight={navbarHeight}
            orderData={isDetailView.order}
          />
        )}
      </View>
    </View>
  );
};

export default AdminOrderDetails;

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
});
