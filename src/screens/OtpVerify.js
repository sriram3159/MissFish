import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colorsset from '../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { SF, SH, SW } from '../utils/dimensions';
import { useContext, useEffect, useRef, useState } from 'react';
import { postRequest } from '../services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../contexts/AuthContext';

const OtpVerify = ({ navigation, route }) => {
  const { mobileNumber } = route.params;
  const { login } = useContext(AuthContext);

  const [otpNumber, setOtpNumer] = useState(Array(6).fill(''));
  const [showError, setShowError] = useState(false);
  const inputRefs = useRef([]);

  const onChangeText = (text, index) => {
    const updatedOtp = [...otpNumber];
    updatedOtp[index] = text;
    setOtpNumer(updatedOtp);

    // Safely move to next input
    if (text && index < inputRefs.current.length - 1) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleNavigate = async () => {
    const isComplete = otpNumber.every(val => val !== '');

    if (!isComplete) {
      setShowError(true);
      return;
    }

    const data = await postRequest('/delivery-person/otp-verify', {
      phone: mobileNumber,
      otp: otpNumber.join(''),
    });

    if (data.status === 'success') {
      setShowError(false);

      // ✅ Save tokens via AuthContext (this will auto-switch navigator)
      await login(data.tokens.access, data.tokens.refresh);

      // ⚠️ Don't call navigation.navigate('Dashboard') here!
      // The stack will automatically change because isLoggedIn = true
    } else {
      setShowError(true);
    }
  };
  const handleBack = () => {
    navigation.navigate('Home');
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100); // Small delay to ensure UI is rendered

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={colorsset.theme_backgound_second} // or your gradient start color
        barStyle="dark-content" // or "light-content" based on your theme
      />
      <View>
        <TouchableOpacity onPress={handleBack} style={styles.back}>
          <Icon
            name="chevron-back"
            color={colorsset.theme_dark_gray}
            size={SF(30)}
          />
        </TouchableOpacity>
        <View style={styles.subContainer}>
          <Text style={styles.otpVerify}>Enter OTP to Verify</Text>
          <View style={styles.otpSentContainer}>
            <Text style={styles.otpSentText}>OTP has been sent to </Text>
            <Text style={styles.otpSentNumber}>+91 {mobileNumber}</Text>
          </View>
          <Text style={styles.changeNo}>Change Phone number</Text>
          <Text style={styles.otpText}>Enter OTP Text</Text>
          <View style={styles.otpContainer}>
            {Array.from({ length: 6 }).map((_, index) => (
              <View key={index} style={styles.otpNo}>
                <TextInput
                  ref={ref => (inputRefs.current[index] = ref)}
                  key={index}
                  style={styles.otpNoText}
                  value={otpNumber[index]}
                  onChangeText={text => onChangeText(text, index)}
                  onKeyPress={({ nativeEvent }) => {
                    if (
                      nativeEvent.key === 'Backspace' &&
                      otpNumber[index] === '' &&
                      index > 0
                    ) {
                      const prevInput = inputRefs.current[index - 1];
                      if (prevInput) {
                        prevInput.focus();
                        const updatedOtp = [...otpNumber];
                        updatedOtp[index - 1] = '';
                        setOtpNumer(updatedOtp);
                      }
                    }
                  }}
                  keyboardType="number-pad"
                  maxLength={1}
                  returnKeyType="next"
                />
              </View>
            ))}
          </View>
          {showError && (
            <Text style={styles.errorText}>Please enter all 6 digits</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={handleNavigate}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default OtpVerify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsset.theme_backgound_second,
  },

  subContainer: {
    marginHorizontal: SW(28),
  },
  back: {
    marginTop: SH(62),
    marginLeft: SW(34),
  },
  otpVerify: {
    fontWeight: 600,
    fontSize: SF(28),
    marginTop: SH(22),
    marginBottom: SH(24),
    color: colorsset.theme_dark_gray,
  },
  otpSentContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: SH(6),
  },
  otpSentText: {
    fontWeight: 400,
    fontSize: SF(18),
    color: '#57585A',
  },
  otpSentNumber: {
    fontWeight: 400,
    fontSize: SF(18),
    color: '#2B2E35',
  },
  errorText: {
    color: 'red',
    marginTop: SH(8),
    marginBottom: SH(12),
    fontSize: SF(14),
    fontWeight: '500',
  },
  changeNo: {
    color: '#00A5D4',
    fontWeight: 400,
    fontSize: SF(16),
    marginBottom: SH(23),
  },
  otpText: {
    fontWeight: 700,
    fontSize: SF(18),
    color: '#57585A',
  },
  otpNo: {
    borderWidth: 1,
    borderColor: '#32ADE6',
    borderRadius: SF(10),
    backgroundColor: '#FFFFFF',
    width: SF(48),
    height: SF(48),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },

  otpNoText: {
    fontWeight: '400',
    fontSize: SF(18),
    color: '#2B2E35',
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SH(16),
    marginBottom: SH(40),
  },
  button: {
    backgroundColor: colorsset.theme_backgound_third,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SH(10),
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 600,
    fontSize: SF(18),
    paddingVertical: SH(13),
  },
});
