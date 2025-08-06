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
import Icon from 'react-native-vector-icons/Ionicons';
import images from '../image/images';

const orderDelivered = ({ navigation, route }) => {
  const { distance, duration } = route.params;
  const handleBack = () => {
    navigation.goBack();
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
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={handleBack} style={styles.back}>
              <Icon name="chevron-back" size={SF(14)} color={'#181C2E'} />
            </TouchableOpacity>
            <Text style={styles.title}>Order Details</Text>
          </View>
        </View>
        <Image
          source={images.orderDelivered}
          resizeMode="contain"
          style={{
            height: SH(310),
            width: SW(296),
            marginTop: SH(96),
            marginHorizontal: SW(47),
          }}
        />
        <Text
          style={{
            color: 'rgba(0, 0, 0, 1)',
            fontSize: SF(18),
            fontWeight: 600,
            textAlign: 'center',
            position: 'relative',
            top: SH(-15),
          }}
        >
          Order Delivered
        </Text>
        <Text
          style={{
            color: 'rgba(85, 84, 84, 1)',
            fontSize: SF(13),
            fontWeight: 600,
            paddingHorizontal: SW(38),
            paddingTop: SH(5),
          }}
        >
          Well Done! Order Delivered Successfully – Your commitment ensures
          fresh smiles every time.
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginHorizontal: SW(26),
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: '#rgba(255, 255, 255, 1)',
            paddingTop: SH(23),
            paddingBottom: SH(14),
            marginTop: SH(61),
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: SH(4),
            }}
          >
            <Text
              style={{
                fontWeight: 600,
                fontSize: SF(20),
                color: 'rgba(0, 0, 0, 1)',
              }}
            >
              {distance || 0} KM
            </Text>
            <Text
              style={{
                fontWeight: 600,
                fontSize: SF(14),
                color: 'rgba(124, 118, 118, 1)',
              }}
            >
              Driven
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: SH(4),
            }}
          >
            <Text
              style={{
                fontWeight: 600,
                fontSize: SF(20),
                color: 'rgba(0, 0, 0, 1)',
              }}
            >
              {duration.toFixed(2) || 0} Mins
            </Text>
            <Text
              style={{
                fontWeight: 600,
                fontSize: SF(14),
                color: 'rgba(124, 118, 118, 1)',
              }}
            >
              Time
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default orderDelivered;

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
