import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SF, SH, SW } from '../utils/dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import colorsset from '../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../image/images';
import { useGlobalContext } from '../contexts/globalContext';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
const PersonalInfo = ({ navigation }) => {
  const { state } = useGlobalContext();
  const { logout } = useContext(AuthContext);
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View
        style={{
          borderRadius: SF(16),
        }}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={handleBack} style={styles.back}>
              <Ionicons name="chevron-back" size={SF(14)} color={'#181C2E'} />
            </TouchableOpacity>
            <Text style={styles.title}>Personal Info</Text>
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: SW(17),
            marginTop: SH(26),
          }}
        >
          {state?.user?.image_url ? (
            <Image
              source={{ uri: state?.user?.image_url }}
              resizeMode="cover"
              style={{ width: SW(100), height: SW(100), borderRadius: SF(100) }}
            />
          ) : (
            <View
              style={{
                width: SF(100),
                height: SF(100),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ECF0F4',
                borderRadius: SF(100),
              }}
            >
              <Text
                style={{
                  fontSize: SF(30),
                  fontWeight: 'bold',
                  color: '#181C2E',
                }}
              >
                {state?.user?.employee?.name?.charAt(0)?.toUpperCase() || '?'}
              </Text>
            </View>
          )}
          <View>
            <Text
              style={{
                fontWeight: 700,
                color: 'rgba(50, 52, 62, 1)',
                fontSize: SF(24),
              }}
            >
              {state?.user?.employee?.name}
            </Text>
            <Text
              style={{
                fontWeight: 700,
                color: 'rgba(160, 165, 186, 1)',
                fontSize: SF(16),
              }}
            >
              +{state?.user?.employee?.country_code}{' '}
              {state?.user?.employee?.phone}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: SF(16),
            marginTop: SH(24),
          }}
        >
          <View
            style={{
              paddingLeft: SW(20),
              paddingVertical: SH(20),
              display: 'flex',
              flexDirection: 'column',
              paddingHorizontal: SW(25),
              gap: SH(16),
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: SW(14),
              }}
            >
              <View
                // onPress={handleNavigateReport}
                style={styles.circleButton}
              >
                <Feather
                  name="user"
                  size={SF(20)}
                  style={{
                    color: 'rgba(251, 111, 61, 1)',
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: 'rgba(50, 52, 62, 1)',
                    fontWeight: 400,
                    fontSize: SF(14),
                    paddingBottom: SH(1),
                  }}
                >
                  FULL NAME
                </Text>
                <Text
                  style={{
                    color: 'rgba(107, 110, 130, 1)',
                    fontWeight: 400,
                    fontSize: SF(14),
                  }}
                >
                  {state?.user?.employee?.name}
                </Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: SW(14),
              }}
            >
              <View
                // onPress={handleNavigateReport}
                style={styles.circleButton}
              >
                <Feather
                  name="mail"
                  size={SF(20)}
                  style={{
                    color: 'rgba(65, 61, 251, 1)',
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: 'rgba(50, 52, 62, 1)',
                    fontWeight: 400,
                    fontSize: SF(14),
                    paddingBottom: SH(1),
                  }}
                >
                  EMAIL
                </Text>
                <Text
                  style={{
                    color: 'rgba(107, 110, 130, 1)',
                    fontWeight: 400,
                    fontSize: SF(14),
                    textDecorationLine: 'underline',
                  }}
                >
                  {state?.user?.employee?.email}
                </Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: SW(14),
              }}
            >
              <View
                // onPress={handleNavigateReport}
                style={styles.circleButton}
              >
                <Feather
                  name="phone"
                  size={SF(20)}
                  style={{
                    color: 'rgba(54, 155, 255, 1)',
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: 'rgba(50, 52, 62, 1)',
                    fontWeight: 400,
                    fontSize: SF(14),
                    paddingBottom: SH(1),
                  }}
                >
                  PHONE NUMBER
                </Text>
                <Text
                  style={{
                    color: 'rgba(107, 110, 130, 1)',
                    fontWeight: 400,
                    fontSize: SF(14),
                  }}
                >
                  +{state?.user?.employee?.country_code}{' '}
                  {state?.user?.employee?.phone}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default PersonalInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colorsset.theme_backgound,
    backgroundColor: 'rgba(245, 246, 251, 1)',
    paddingTop: getStatusBarHeight(),
    paddingHorizontal: SW(18),
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
  innerContainer: {
    paddingTop: SH(6),
    gap: SW(12),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circleButton: {
    width: SF(42),
    height: SF(42),
    backgroundColor: '#ECF0F4',
    borderRadius: SF(42) / 2,
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
});
