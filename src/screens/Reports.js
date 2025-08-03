import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SF, SH, SW } from '../utils/dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import images from '../image/images';
import { useGlobalContext } from '../contexts/globalContext';
import DateRangePicker from '../components/commonComponent/DateRangePicker';
import { formatDate, formatTime } from '../utils/formatTime';
import { useEffect, useState } from 'react';
import colorsset from '../utils/colors';

const Reports = ({ navigation }) => {
  const { state, dispatch } = useGlobalContext();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [filteredData, setfilteredData] = useState([]);

  const orderDetails = state?.orderDetails;

  const handleBack = () => {
    navigation.goBack();
  };

  const OrderCard = ({ orderDetail }) => {
    return (
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            paddingHorizontal: SH(9),
            justifyContent: 'space-around',
            paddingVertical: SH(8),
            marginHorizontal: SW(19),
            borderRadius: SF(8),
            shadowColor: '#414141',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.15,
            shadowRadius: 20, // 40px blur in Figma ≈ 20 in RN

            // Shadow for Android
            elevation: 8,
          }}
        >
          <Text
            style={{
              color: 'rgba(85, 84, 84, 1)',
              fontSize: SF(10),
              fontWeight: 600,
              width: SW(38),
            }}
          >
            #{orderDetail.orderId}
          </Text>
          <View>
            <Text
              style={{
                color: 'rgba(85, 84, 84, 1)',
                fontSize: SF(10),
                fontWeight: 600,
              }}
            >
              {formatDate(orderDetail.updatedAt)}
            </Text>
            <Text
              style={{
                color: 'rgba(85, 84, 84, 1)',
                fontSize: SF(10),
                fontWeight: 600,
              }}
            >
              {formatTime(orderDetail.updatedAt)}
            </Text>
          </View>
          <Text
            style={{
              color: 'rgba(7, 7, 7, 1)',
              fontSize: SF(8),
              fontWeight: 400,
              width: SW(143),
            }}
          >
            {orderDetail.address}
          </Text>
          <Text
            style={{
              color: 'rgba(85, 84, 84, 1)',
              fontSize: SF(10),
              fontWeight: 600,
            }}
          >
            {Number(orderDetail.distance).toFixed(2) || 0}
            KM
          </Text>
        </View>
      </View>
    );
  };
  useEffect(() => {
    const filteredData = orderDetails.filter(item => {
      // Convert updatedAt to Date
      const updatedDate = new Date(item.updatedAt);
      const start = new Date(fromDate); // fromDate: '2025-07-01'
      const end = new Date(toDate); // toDate: '2025-07-10'

      const inRange = updatedDate >= start && updatedDate <= end;

      return inRange;
    });
    setfilteredData(filteredData);
  }, [fromDate, toDate]);
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
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={handleBack} style={styles.back}>
              <Icon name="chevron-back" size={SF(14)} color={'#181C2E'} />
            </TouchableOpacity>
            <Text style={styles.title}>Reports</Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: SF(16),
              fontWeight: 400,
              color: 'rgba(87, 88, 90, 1)',
              paddingLeft: SW(17),
            }}
          >
            Reports Date Range
          </Text>
        </View>
        <DateRangePicker
          fromDate={fromDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          toDate={toDate}
        />
        {fromDate === null ? (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: SH(88),
            }}
          >
            <Image
              source={images.orderDelivered}
              resizeMode="contain"
              style={{
                height: SH(238),
                width: SW(235),
              }}
            />
            <Text
              style={{
                color: 'rgba(0, 0, 0, 1)',
                fontSize: SF(18),
                fontWeight: 600,
                textAlign: 'center',
                position: 'relative',
                top: SH(26),
              }}
            >
              Please Select a Date Range
            </Text>
          </View>
        ) : (
          <View>
            {filteredData.length > 0 ? (
              <View>
                <View
                  style={{
                    marginHorizontal: SW(19),
                    backgroundColor: '#rgba(255, 255, 255, 1)',
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
                    style={{
                      fontWeight: 600,
                      fontSize: SF(18),
                      color: 'rgba(186, 5, 5, 1)',
                      paddingVertical: SH(8),
                      paddingLeft: SW(11),
                    }}
                  >
                    12/Jun/2025 - 20/Jun/2025
                  </Text>
                  <View
                    style={{
                      borderBottomWidth: SF(1),
                      borderStyle: 'dashed',
                      borderBottomColor: '#C0C0C0',
                    }}
                  />
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: SW(30),
                      marginTop: SH(10),
                      marginBottom: SH(17),
                    }}
                  >
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: SH(6),
                      }}
                    >
                      <Text
                        style={{
                          color: 'rgba(124, 118, 118, 1)',
                          fontWeight: 600,
                          fontSize: SF(12),
                        }}
                      >
                        Assigned
                      </Text>
                      <Text
                        style={{
                          color: 'rgba(0, 0, 0, 1)',
                          fontWeight: 600,
                          fontSize: SF(17),
                        }}
                      >
                        {filteredData.length} Orders
                      </Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: SH(6),
                      }}
                    >
                      <Text
                        style={{
                          color: 'rgba(124, 118, 118, 1)',
                          fontWeight: 600,
                          fontSize: SF(12),
                        }}
                      >
                        Delivered
                      </Text>
                      <Text
                        style={{
                          color: 'rgba(0, 0, 0, 1)',
                          fontWeight: 600,
                          fontSize: SF(17),
                        }}
                      >
                        {
                          filteredData?.filter(
                            item => item.status === 'Delivered',
                          ).length
                        }{' '}
                        Orders
                      </Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: SH(6),
                      }}
                    >
                      <Text
                        style={{
                          color: 'rgba(124, 118, 118, 1)',
                          fontWeight: 600,
                          fontSize: SF(12),
                        }}
                      >
                        Rides
                      </Text>
                      <Text
                        style={{
                          color: 'rgba(0, 0, 0, 1)',
                          fontWeight: 600,
                          fontSize: SF(17),
                        }}
                      >
                        {filteredData
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
                    marginHorizontal: SW(19),
                    paddingHorizontal: SW(9),
                    backgroundColor: '#rgba(255, 255, 255, 1)',
                    borderRadius: SF(10),
                    paddingVertical: SH(9),
                    justifyContent: 'space-around',
                    display: 'flex',
                    flexDirection: 'row',
                    // Shadow for iOS
                    shadowColor: '#414141',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 20, // 40px blur in Figma ≈ 20 in RN

                    // Shadow for Android
                    elevation: 8,
                    marginTop: SH(8),
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 600,
                      fontSize: SF(15),
                      color: 'rgba(85, 84, 84, 1)',
                      width: SW(38),
                    }}
                  >
                    Id
                  </Text>
                  <Text
                    style={{
                      fontWeight: 600,
                      fontSize: SF(15),
                      color: 'rgba(85, 84, 84, 1)',
                    }}
                  >
                    Date & Time
                  </Text>
                  <Text
                    style={{
                      fontWeight: 600,
                      fontSize: SF(15),
                      color: 'rgba(85, 84, 84, 1)',
                      width: SW(143),
                    }}
                  >
                    Location
                  </Text>
                  <Text
                    style={{
                      fontWeight: 600,
                      fontSize: SF(15),
                      color: 'rgba(85, 84, 84, 1)',
                    }}
                  >
                    Km's
                  </Text>
                </View>
                <View>
                  <FlatList
                    data={filteredData}
                    keyExtractor={item => item.orderId}
                    renderItem={({ item }) => <OrderCard orderDetail={item} />}
                    contentContainerStyle={styles.orderContainer}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              </View>
            ) : (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: SH(88),
                }}
              >
                <Image
                  source={images.data}
                  resizeMode="contain"
                  style={{
                    height: SH(238),
                    width: SW(235),
                  }}
                />
                <Text
                  style={{
                    color: 'rgba(0, 0, 0, 1)',
                    fontSize: SF(18),
                    fontWeight: 600,
                    textAlign: 'center',
                    position: 'relative',
                    top: SH(26),
                  }}
                >
                  No Orders Data Found
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Reports;

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
  orderContainer: {
    gap: SH(18),
    paddingBottom: SH(1400),
    marginTop: SH(11),
  },
});
