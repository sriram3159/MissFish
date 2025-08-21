import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { formatDate, formatTime } from '../utils/formatTime';
import { SF, SH, SW } from '../utils/dimensions';
import { TouchableOpacity } from 'react-native';
import images from '../image/images';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

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

const AdminOrderDetailView = ({ navbarHeight, navigation, orderData }) => {
  console.log(orderData);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: navbarHeight + SH(20),
      }}
    >
      <View
        style={{
          paddingTop: SH(38),
          paddingHorizontal: SW(16),
          paddingBottom: SH(11),
        }}
      >
        <Text
          style={{
            fontWeight: 700,
            fontSize: SF(18),
            color: 'rgba(24, 28, 46, 1)',
          }}
        >
          Order Id: #{orderData?.orderId}
        </Text>
        <Text
          style={{
            fontWeight: 700,
            fontSize: SF(14),
            color: 'rgba(160, 165, 186, 1)',
            marginTop: SH(12),
            marginBottom: SH(8),
          }}
        >
          Order Placed At {formatDate(orderData?.updatedAt)}{' '}
          {formatTime(orderData?.updatedAt)}
        </Text>
        <Text
          style={{
            fontWeight: 700,
            fontSize: SF(14),
            color: 'rgba(160, 165, 186, 1)',
          }}
        >
          Order Delivered At {formatDate(orderData?.updatedAt)}{' '}
          {formatTime(orderData?.updatedAt)}
        </Text>
      </View>

      <View style={{ paddingHorizontal: SW(10) }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: SW(7),
            backgroundColor: 'rgba(255, 255, 255, 1)',
            paddingVertical: SH(9),
            paddingLeft: SW(13),
            borderRadius: SF(10),
            marginBottom: SH(8),
          }}
        >
          <Image
            source={images.delivery}
            resizeMode="contain"
            style={{ height: SF(19), width: SF(19) }}
          />
          <Text
            style={{
              fontWeight: 700,
              fontSize: SF(14),
              color: 'rgba(165, 87, 0, 1)',
            }}
          >
            Order Was Delivered
          </Text>
        </View>
        {/* Order details */}

        <View
          style={{
            backgroundColor: 'rgba(245, 246, 251, 1)',
            borderTopLeftRadius: SF(25),
            borderTopRightRadius: SF(25),
            marginBottom: SH(18),
          }}
        >
          <View style={{}}>
            <View
              key={orderData?.orderId}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 1)',
                borderRadius: SF(10),
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',

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
                    {orderData?.items.map((item, index) => (
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
                            style={{ width: SF(16), height: SF(16) }}
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
                            ₹ {orderData?.itemsPrice[index]}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: SH(8),
                    paddingBottom: SH(8),
                    paddingHorizontal: SW(14),
                    gap: SW(7),
                    backgroundColor: 'rgba(255, 231, 231, 1)',
                    marginHorizontal: SW(10),
                    marginBottom: SH(15),
                    borderRadius: SF(10),
                  }}
                >
                  <MaterialIcons
                    name="message-outline"
                    size={SF(15)}
                    style={{
                      color: 'rgba(132, 0, 0, 1)',
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: 400,
                      fontSize: SF(13),
                      color: 'rgba(132, 0, 0, 1)',
                    }}
                  >
                    Please Pack as Separate boxes
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* ratings */}
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 1)',
            borderRadius: SF(10),
            paddingHorizontal: SW(10),
            paddingVertical: SH(12),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: SH(18),
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: SW(5),
            }}
          >
            <Image
              source={images.person}
              resizeMode="contain"
              style={{ height: SF(33), width: SF(33) }}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Text
                style={{
                  color: 'rgba(24, 28, 46, 1)',
                  fontWeight: 700,
                  fontSize: SF(17),
                }}
              >
                Vinish Kevin
              </Text>
              <Text
                style={{
                  color: 'rgba(160, 165, 186, 1)',
                  fontWeight: 400,
                  fontSize: SF(11),
                }}
              >
                Delivery Partner
              </Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: SW(7),
              alignItems: 'center',
            }}
          >
            <MaterialIcons
              name="star"
              size={SF(25)}
              style={{
                color: 'rgba(255, 229, 0, 1)',
              }}
            />
            <MaterialIcons
              name="star"
              size={SF(25)}
              style={{
                color: 'rgba(255, 229, 0, 1)',
              }}
            />
            <MaterialIcons
              name="star"
              size={SF(25)}
              style={{
                color: 'rgba(255, 229, 0, 1)',
              }}
            />
            <MaterialIcons
              name="star-outline"
              size={SF(25)}
              style={{
                color: 'rgba(234, 234, 234, 1)',
              }}
            />
          </View>
        </View>
        {/* Bill summary */}

        <View style={{ marginBottom: SH(10) }}>
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 1)',
              paddingTop: SH(8),
              paddingHorizontal: SW(8),
              borderTopLeftRadius: SF(10),
              borderTopRightRadius: SF(10),
            }}
          >
            <View
              style={{
                backgroundColor: 'rgba(245, 245, 245, 1)',
                paddingVertical: SH(8),
                paddingHorizontal: SW(13),
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: SW(6),
                borderRadius: SF(10),
              }}
            >
              <IonIcons
                name="pricetag-outline"
                size={SF(15)}
                style={{
                  color: 'rgba(0, 0, 0, 1)',
                }}
              />
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: SF(13),
                  color: 'rgba(34, 34, 34, 1)',
                }}
              >
                Bill Summary
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: SF(1),
                borderBottomColor: 'rgba(243, 242, 242, 1)',
                gap: SH(5),
                paddingBottom: SF(5),
                paddingHorizontal: SW(5),
                paddingTop: SH(13),
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: SF(12),
                    color: 'rgba(100, 105, 130, 1)',
                  }}
                >
                  Item Total
                </Text>
                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: SF(12),
                    color: 'rgba(100, 105, 130, 1)',
                  }}
                >
                  ₹ 200
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: SF(12),
                    color: 'rgba(100, 105, 130, 1)',
                  }}
                >
                  GST <Text style={{ fontSize: SF(8) }}>(Inclusive)</Text>
                </Text>
                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: SF(12),
                    color: 'rgba(100, 105, 130, 1)',
                  }}
                >
                  ₹ 14.5
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: SF(12),
                    color: 'rgba(100, 105, 130, 1)',
                  }}
                >
                  Delivery Charge
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: SW(2),
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 700,
                      fontSize: SF(11),
                      color: 'rgba(100, 105, 130, 1)',
                      textDecorationStyle: 'solid',
                      textDecorationLine: 'line-through',
                    }}
                  >
                    ₹ 40.00{' '}
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(50, 173, 230, 1)',
                      fontSize: SF(12),
                      fontWeight: 700,
                    }}
                  >
                    Free
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: SW(5),
                  paddingTop: SH(13),
                }}
              >
                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: SF(12),
                    color: 'rgba(0, 0, 0, 1)',
                  }}
                >
                  Grand Total
                </Text>

                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: SF(12),
                    color: 'rgba(0, 0, 0, 1)',
                  }}
                >
                  ₹ 200.00
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: SW(5),
                  paddingTop: SH(13),
                }}
              >
                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: SF(12),
                    color: 'rgba(50, 173, 230, 1)',
                  }}
                >
                  Coupon Applied - IPLFAN
                </Text>

                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: SF(12),
                    color: 'rgba(50, 173, 230, 1)',
                  }}
                >
                  - ₹ 120.00
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: SW(5),
                  paddingTop: SH(13),
                  paddingBottom: SH(8),
                }}
              >
                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: SF(12),
                    color: 'rgba(0, 0, 0, 1)',
                  }}
                >
                  Paid
                </Text>

                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: SF(12),
                    color: 'rgba(0, 0, 0, 1)',
                  }}
                >
                  ₹ 80.00
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text
              style={{
                textAlign: 'center',
                color: 'rgba(7, 61, 169, 1)',
                fontSize: SF(13),
                fontWeight: 700,
                paddingTop: SH(15),
                paddingBottom: SH(13),
                backgroundColor: '#DCE6FE',
                borderBottomLeftRadius: SF(10),
                borderBottomRightRadius: SF(10),
              }}
            >
              🥳 You Saved ₹ 120.00 on this order
            </Text>
          </View>
        </View>
        {/* bill summary with address */}
        <View style={{ marginBottom: SH(25) }}>
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 1)',
              paddingTop: SH(8),
              paddingHorizontal: SW(8),
              borderRadius: SF(10),
            }}
          >
            <View
              style={{
                backgroundColor: 'rgba(245, 245, 245, 1)',
                paddingVertical: SH(8),
                paddingHorizontal: SW(13),
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: SW(6),
                borderRadius: SF(10),
              }}
            >
              <IonIcons
                name="pricetag-outline"
                size={SF(15)}
                style={{
                  color: 'rgba(0, 0, 0, 1)',
                }}
              />
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: SF(13),
                  color: 'rgba(34, 34, 34, 1)',
                }}
              >
                Bill Summary
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: SW(6),
                paddingTop: SH(12),
                paddingBottom: SH(18),

                gap: SH(10),
              }}
            >
              <View
                style={{
                  paddingHorizontal: SW(6),
                  paddingBottom: SH(8),
                  borderBottomColor: 'rgba(243, 242, 242, 1)',
                  borderBottomWidth: 1,
                }}
              >
                <View
                  style={{ display: 'flex', flexDirection: 'row', gap: SW(11) }}
                >
                  <Feather
                    name="user"
                    size={SF(18)}
                    style={{
                      color: 'rgba(152, 168, 184, 1)',
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: SF(12),
                        fontWeight: 700,
                        color: 'rgba(0, 0, 0, 1)',
                      }}
                    >
                      Vinish Kevin
                    </Text>
                    <Text
                      style={{
                        fontSize: SF(11),
                        fontWeight: 700,
                        color: 'rgba(100, 105, 130, 1)',
                      }}
                    >
                      8072770251
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: SW(6),
                  paddingBottom: SH(8),
                  borderBottomColor: 'rgba(243, 242, 242, 1)',
                  borderBottomWidth: 1,
                }}
              >
                <View
                  style={{ display: 'flex', flexDirection: 'row', gap: SW(11) }}
                >
                  <Feather
                    name="credit-card"
                    size={SF(18)}
                    style={{
                      color: 'rgba(152, 168, 184, 1)',
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: SF(12),
                        fontWeight: 700,
                        color: 'rgba(0, 0, 0, 1)',
                      }}
                    >
                      Payment method
                    </Text>
                    <Text
                      style={{
                        fontSize: SF(11),
                        fontWeight: 700,
                        color: 'rgba(100, 105, 130, 1)',
                      }}
                    >
                      Paid Via: Cash/UPI
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: SW(6),
                  paddingBottom: SH(8),
                  borderBottomColor: 'rgba(243, 242, 242, 1)',
                  borderBottomWidth: 1,
                }}
              >
                <View
                  style={{ display: 'flex', flexDirection: 'row', gap: SW(11) }}
                >
                  <Feather
                    name="clock"
                    size={SF(18)}
                    style={{
                      color: 'rgba(152, 168, 184, 1)',
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: SF(12),
                        fontWeight: 700,
                        color: 'rgba(0, 0, 0, 1)',
                      }}
                    >
                      Payment Date
                    </Text>
                    <Text
                      style={{
                        fontSize: SF(11),
                        fontWeight: 700,
                        color: 'rgba(100, 105, 130, 1)',
                      }}
                    >
                      May 20, 2025 at 3:45 pM
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: SW(6),
                }}
              >
                <View
                  style={{ display: 'flex', flexDirection: 'row', gap: SW(11) }}
                >
                  <MaterialIcons
                    name="truck-fast-outline"
                    size={SF(20)}
                    style={{
                      color: 'rgba(152, 168, 184, 1)',
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: SF(12),
                        fontWeight: 700,
                        color: 'rgba(0, 0, 0, 1)',
                      }}
                    >
                      Delivery Address
                    </Text>
                    <Text
                      style={{
                        fontSize: SF(11),
                        fontWeight: 700,
                        color: 'rgba(100, 105, 130, 1)',
                      }}
                    >
                      1/78, KM Colony, Veeranamangalam, Thazhakudy, KK Dist -
                      629901
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* fssai */}
        <View>
          <Image
            source={images.fssai}
            resizeMode="cover"
            style={{
              height: SH(20),
              width: SW(48),
            }}
          />
          <Text
            style={{
              color: 'rgba(100, 105, 130, 1)',
              fontWeight: 700,
              fontSize: SF(11),
              paddingLeft: SW(7),
            }}
          >
            License No. 121XXXXXXX31
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdminOrderDetailView;

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
