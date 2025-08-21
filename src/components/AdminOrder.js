import { ScrollView, Text, View } from 'react-native';
import { formatTime } from '../utils/formatTime';
import { SF, SH, SW } from '../utils/dimensions';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    amount: 1350,
    address: '12, Beach Road, Rameswaram, TN - 623526 ',
    updatedAt: '2025-07-19T10:15:00.000Z',
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
    amount: 1650,
    address: '45, Harbor Street, Tuticorin, TN - 628001',
    updatedAt: '2025-07-20T08:30:00.000Z',
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
    amount: 1250,
    address: '78, Coastal Road, Nagercoil, TN - 629001',
    updatedAt: '2025-07-21T07:20:00.000Z',
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
    amount: 1480,
    address: '29, Fishermen Colony, Kanyakumari, TN - 629702',
    updatedAt: '2025-07-22T12:45:00.000Z',
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
    amount: 1525,
    address: '11, Port View Road, Chennai, TN - 600001',
    updatedAt: '2025-07-23T14:00:00.000Z',
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
    amount: 1580,
    address: '86, Sea Line Avenue, Nagapattinam, TN - 611001',
    updatedAt: '2025-07-24T09:10:00.000Z',
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
    amount: 1600,
    address: '134, Marine Lane, Cuddalore, TN - 607001',
    updatedAt: '2025-07-25T11:25:00.000Z',
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
    amount: 1620,
    address: '67, Ocean Drive, Karaikal, PY - 609602',
    updatedAt: '2025-07-26T13:40:00.000Z',
  },
];

const AdminOrder = ({ navbarHeight }) => {
  const [expandedOrders, setExpandedOrders] = useState({});
  const [isActionView, setIsActionView] = useState({});

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
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: navbarHeight,
        zIndex: 2, // High zIndex to go above everything
        backgroundColor: 'rgba(39, 63, 85, 0.67)',
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: SH(172),
            backgroundColor: 'rgba(245, 246, 251, 1)',
            paddingHorizontal: SW(19),
            borderTopLeftRadius: SF(25),
            borderTopRightRadius: SF(25),
          }}
        >
          <View
            style={{
              alignSelf: 'center',
              width: SW(60),
              height: SF(6),
              backgroundColor: 'rgba(193, 200, 210, 1)',
              borderRadius: 6,
              marginTop: SH(14),
              marginBottom: SH(18),
            }}
          />
          <Text
            style={{
              fontWeight: 700,
              fontSize: SF(17),
              color: 'rgba(24, 28, 46, 1)',
              paddingHorizontal: SW(5),
              paddingBottom: SH(14),
            }}
          >
            20 New Orders
          </Text>
          <View>
            {orderData.map(order => {
              const isExpanded = expandedOrders[order.orderId];
              const isExpandedAction = isActionView[order.orderId];
              const visibleItems = isExpanded
                ? order.items
                : order.items.slice(0, 2);

              return (
                <View
                  key={order.orderId}
                  style={{
                    marginBottom: SH(20),
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    padding: SF(8),
                    borderRadius: SF(10),
                  }}
                >
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingVertical: SH(8),
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 700,
                        fontSize: SF(13),
                        color: 'rgba(50, 173, 230, 1)',
                      }}
                    >
                      #{order.orderId}
                    </Text>
                    <Text
                      style={{
                        fontWeight: 700,
                        fontSize: SF(13),
                        color: 'rgba(50, 173, 230, 1)',
                      }}
                    >
                      Today {formatTime(order.updatedAt)}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      borderBottomWidth: SF(1),
                      borderBottomColor: 'rgba(243, 242, 242, 1)',
                      borderStyle: 'dashed',
                      borderTopWidth: SF(1),
                      borderTopColor: 'rgba(243, 242, 242, 1)',
                      borderStyle: 'dashed',
                      paddingBottom: SH(3),
                    }}
                  >
                    <View>
                      <View
                        style={{
                          gap: SH(6),
                          paddingTop: SH(3),
                          marginBottom: SH(9),
                        }}
                      >
                        {visibleItems.map((item, index) => (
                          <View key={index}>
                            <Text
                              style={{
                                fontWeight: 700,
                                fontSize: SF(12),
                                color: 'rgba(0, 0, 0, 1)',
                              }}
                            >
                              {'\u2022'} {'  '}
                              {item}
                            </Text>
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
                              : `+${order.items.length - 2} More Items`}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    <View>
                      <Text
                        style={{
                          fontWeight: 700,
                          fontSize: SF(22),
                          color: 'rgba(0, 0, 0, 1)',
                          paddingBottom: SH(7),
                        }}
                      >
                        ₹ {order.amount}
                      </Text>
                    </View>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: SH(7),
                      }}
                    >
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: SW(6),
                        }}
                      >
                        <Icon
                          name="truck-fast-outline"
                          color="rgba(169, 8, 8, 1)"
                          size={SF(20)}
                        />
                        <Text
                          style={{
                            fontWeight: 700,
                            fontSize: SF(9),
                            color: 'rgba(169, 8, 8, 1)',
                            width: SW(216),
                          }}
                        >
                          {order.address}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          padding: SF(3),
                          backgroundColor: 'rgba(191, 231, 249, 1)',
                          borderRadius: SF(4),
                        }}
                        onPress={() => toggleExpandActionView(order.orderId)}
                      >
                        {isExpandedAction ? (
                          <Icon
                            name="chevron-up"
                            color="rgba(1, 102, 148, 1)"
                            size={SF(25)}
                          />
                        ) : (
                          <Icon
                            name="chevron-down"
                            color="rgba(1, 102, 148, 1)"
                            size={SF(25)}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                    {isExpandedAction && (
                      <View
                        style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'row',
                          gap: SW(12),
                          marginTop: SH(20),
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            backgroundColor: 'rgba(163, 3, 3, 1)',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: SW(7),
                            justifyContent: 'center',
                            paddingVertical: SH(11),
                            borderRadius: SF(10),
                            flex: 1,
                          }}
                        >
                          <Icon
                            name="close"
                            color="rgba(255, 255, 255, 1)"
                            size={SF(15)}
                          />
                          <Text
                            style={{
                              fontWeight: 700,
                              fontSize: SF(15),
                              color: 'rgba(255, 255, 255, 1)',
                            }}
                          >
                            Decline
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            backgroundColor: 'rgba(3, 163, 96, 1)',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: SW(7),
                            justifyContent: 'center',
                            paddingVertical: SH(11),
                            borderRadius: SF(10),
                            flex: 1,
                          }}
                        >
                          <Icon
                            name="check"
                            color="rgba(255, 255, 255, 1)"
                            size={SF(15)}
                          />
                          <Text
                            style={{
                              fontWeight: 700,
                              fontSize: SF(15),
                              color: 'rgba(255, 255, 255, 1)',
                            }}
                          >
                            Accept
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
          {/* You can add your full Figma UI here */}
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminOrder;
