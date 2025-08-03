import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colorsset from '../utils/colors';
import { SF, SH, SW } from '../utils/dimensions';

const AdminDashboard = ({ navigation }) => {
  const handleNavigateReport = () => {
    navigation.navigate('Reports');
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Add translucent status bar */}
      <StatusBar
        translucent={true}
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
      </View>
    </SafeAreaView>
  );
};
export default AdminDashboard;

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
});
