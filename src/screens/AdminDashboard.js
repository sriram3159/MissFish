import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SF, SH, SW } from '../utils/dimensions';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useState } from 'react';
import DropdownMenu from '../components/commonComponent/DropdownMenu';
import PieCharts from '../components/commonComponent/PieChart';
import AreaCharts from '../components/commonComponent/AreaCharts';

const AdminDashboard = ({
  navigation,
  showOrderScreen,
  setShowOrderScreen,
}) => {
  const [selected, setSelected] = useState('Daily');
  const handleShowOrders = () => {
    setShowOrderScreen(!showOrderScreen);
  };

  const options = [
    { label: 'Daily', value: 'Daily' },
    { label: 'Weekly', value: 'Weekly' },
    { label: 'Monthly', value: 'Monthly' },
  ];
  const handleNavigateReport = () => {
    navigation.navigate('Reports');
  };
  return (
    <ScrollView>
      <View style={styles.scrollContent}>
        <View style={styles.innerContainer}>
          <View
            style={{
              paddingTop: SH(6),
              gap: SW(18),
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
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
            <View
              style={{ display: 'flex', flexDirection: 'column', gap: SH(3) }}
            >
              <Text
                style={{
                  fontSize: SF(12),
                  fontWeight: 700,
                  color: 'rgba(50, 173, 230, 1)',
                }}
              >
                Location
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: SW(8),
                }}
              >
                <Text
                  style={{
                    fontSize: SF(14),
                    fontWeight: 400,
                    color: 'rgba(103, 103, 103, 1)',
                    textAlignVertical: 'center',
                  }}
                >
                  Halal Lab office
                </Text>
                <MaterialIcon
                  name="arrow-drop-down"
                  color="rgba(24, 28, 46, 1)"
                  size={SF(20)}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.circleButton}>
            <Icon name="bell" color="rgba(50, 173, 230, 1)" size={SF(20)} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: SH(24), gap: SH(12) }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              columnGap: SW(13),
            }}
          >
            <LinearGradient
              colors={['#FFFFFF', '#D4F5FC']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.7, y: 1 }}
              style={{
                flex: 1,
                borderRadius: SF(20),
                paddingBottom: SH(18),
                paddingTop: SH(16),
                paddingLeft: SW(16),
              }}
            >
              <TouchableOpacity onPress={handleShowOrders}>
                <Text
                  style={{
                    fontSize: SF(53),
                    fontWeight: 700,
                    color: 'rgba(50, 52, 62, 1)',
                  }}
                >
                  20
                </Text>
                <Text
                  style={{
                    fontSize: SF(13),
                    fontWeight: 700,
                    color: 'rgba(131, 135, 153, 1)',
                  }}
                >
                  RUNNING ORDERS
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={['#FFFFFF', '#D4F5FC']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.7, y: 1 }}
              style={{
                flex: 1,
                borderRadius: SF(20),
                paddingBottom: SH(18),
                paddingTop: SH(16),
                paddingLeft: SW(16),
              }}
            >
              <Text
                style={{
                  fontSize: SF(53),
                  fontWeight: 700,
                  color: 'rgba(50, 52, 62, 1)',
                }}
              >
                05
              </Text>
              <Text
                style={{
                  fontSize: SF(13),
                  fontWeight: 700,
                  color: 'rgba(131, 135, 153, 1)',
                }}
              >
                ORDER REQUEST
              </Text>
            </LinearGradient>
          </View>
          <View
            style={{
              paddingHorizontal: SW(16),
              backgroundColor: 'rgba(255, 255, 255, 1)',
              borderRadius: SF(20),
              paddingTop: SH(11),
              paddingBottom: SH(27),
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text
                  style={{
                    color: 'rgba(50, 52, 62, 1)',
                    fontSize: SF(14),
                    fontWeight: 700,
                  }}
                >
                  Total Order
                </Text>
                <Text
                  style={{
                    color: 'rgba(50, 52, 62, 1)',
                    fontSize: SF(34),
                    fontWeight: 700,
                  }}
                >
                  25
                </Text>
              </View>
              <DropdownMenu
                options={options}
                onSelect={value => setSelected(value)}
                label={selected}
              />
            </View>
            <PieCharts />
          </View>
          <View
            style={{
              paddingHorizontal: SW(16),
              backgroundColor: 'rgba(255, 255, 255, 1)',
              borderRadius: SF(20),
              paddingTop: SH(11),
              paddingBottom: SH(27),
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text
                  style={{
                    color: 'rgba(50, 52, 62, 1)',
                    fontSize: SF(14),
                    fontWeight: 700,
                  }}
                >
                  Total Revenue
                </Text>
                <Text
                  style={{
                    color: 'rgba(50, 52, 62, 1)',
                    fontSize: SF(34),
                    fontWeight: 700,
                  }}
                >
                  ₹ 2,241
                </Text>
              </View>
              <DropdownMenu
                options={options}
                onSelect={value => setSelected(value)}
                label={selected}
              />
            </View>
            <AreaCharts />
          </View>
          <View
            style={{
              padding: SW(16),
              backgroundColor: 'rgba(255, 255, 255, 1)',
              borderRadius: SF(20),
              paddingTop: SH(14),
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: SF(14),
                  color: 'rgba(50, 52, 62, 1)',
                }}
              >
                Reviews
              </Text>
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: SF(14),
                  color: 'rgba(50, 173, 230, 1)',
                  textDecorationStyle: 'solid',
                  textDecorationColor: 'rgba(50, 173, 230, 1)',
                  textDecorationLine: 'underline',
                }}
              >
                See All
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline',
                paddingTop: SH(32),
              }}
            >
              <MaterialIcon
                name="star-rate"
                color="rgba(251, 109, 58, 1)"
                size={SF(25)}
              />
              <Text
                style={{
                  paddingLeft: SW(5),
                  fontWeight: 700,
                  fontSize: SF(23),
                  color: 'rgba(50, 173, 230, 1)',
                }}
              >
                4.9
              </Text>
              <Text
                style={{
                  paddingLeft: SW(5),
                  fontWeight: 700,
                  fontSize: SF(14),
                  color: 'rgba(50, 52, 62, 1)',
                }}
              >
                Total 20 Reviews
              </Text>
            </View>
          </View>
          <View
            style={{
              padding: SW(16),
              backgroundColor: 'rgba(255, 255, 255, 1)',
              borderRadius: SF(20),
              paddingTop: SH(14),
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: SF(14),
                  color: 'rgba(50, 52, 62, 1)',
                }}
              >
                Populer Items This Weeks
              </Text>
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: SF(14),
                  color: 'rgba(50, 173, 230, 1)',
                  textDecorationStyle: 'solid',
                  textDecorationColor: 'rgba(50, 173, 230, 1)',
                  textDecorationLine: 'underline',
                }}
              >
                See All
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline',
                paddingTop: SH(32),
              }}
            >
              <View style={styles.gridContainer}>
                {[...Array(8)].map((item, index) => (
                  <View key={index} style={styles.gridItem}>
                    <Text></Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View></View>
        </View>
      </View>
    </ScrollView>
  );
};
export default AdminDashboard;

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: SF(20),
    marginHorizontal: SW(24),
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circleButton: {
    width: SF(45),
    height: SF(45),
    backgroundColor: 'rgba(255, 255, 255, 1)',
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
    backgroundColor: 'rgba(24, 28, 46, 1)',
    borderRadius: 1,
  },
  line_2: {
    width: SW(16),
    height: 2,
    backgroundColor: 'rgba(24, 28, 46, 1)',
    borderRadius: 1,
  },
  line_3: {
    width: SW(10),
    height: 2,
    backgroundColor: 'rgba(24, 28, 46, 1)',
    borderRadius: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: SW(151),
    height: SW(151),
    marginBottom: SF(8),
    backgroundColor: '#eaeaea',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SF(18),
  },
  showOrderButton: {
    backgroundColor: 'rgba(50, 173, 230, 1)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: SH(10),
  },
});
