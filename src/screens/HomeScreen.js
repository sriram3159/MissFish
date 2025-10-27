import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
} from 'react-native';
import colorsset from '../utils/colors';
import { SF, SH, SW } from '../utils/dimensions';
import images from '../image/images';
import { loginUser } from '../services/authService';
import Svg, { Ellipse, Defs, LinearGradient, Stop } from 'react-native-svg';

const HomeScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const handleLogin = async () => {
    setLoading(true);
    if (mobileNumber.length === 10) {
      setShowError(false);
      try {
        const data = await loginUser({ phone: mobileNumber });
        console.log(data);
        if (data.status === 'success') {
          navigation.replace('OtpVerify', { mobileNumber });
        }
      } catch (error) {
        console.log(error);
        Alert.alert('OTP Send status', error.status || 'Something went wrong');
      } finally {
        setLoading(false);
        if (true) {
          navigation.replace('OtpVerify', { mobileNumber });
        }
      }
    } else {
      setShowError(true);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20} // pushes content correctly
    >
      <View style={style.container}>
        {/* Ellipse gradient background */}
        <Svg
          height="900"
          width="1100"
          style={{
            position: 'absolute',
            top: -314,
            left: -485,
            transform: [{ rotate: '16.31deg' }],
          }}
        >
          <Defs>
            <LinearGradient id="grad" x1="50%" y1="0%" x2="50%" y2="100%">
              <Stop
                offset="0%"
                stopColor="rgba(75, 197, 238, 0.66)"
                stopOpacity="0"
              />
              <Stop
                offset="50%"
                stopColor="rgba(75, 197, 238, 0.66)"
                stopOpacity="0.7"
              />
              <Stop
                offset="75%"
                stopColor="rgba(150, 25, 75, 0.38)"
                stopOpacity="0.5"
              />
              <Stop
                offset="100%"
                stopColor="rgba(255, 232, 214, 0.66)"
                stopOpacity="1"
              />
            </LinearGradient>
          </Defs>
          <Ellipse cx="550" cy="450" rx="500" ry="417" fill="url(#grad)" />
        </Svg>

        {/* Main Content */}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View
            style={[style.titleContainer, isKeyboardVisible && { top: SH(40) }]}
          >
            <View style={style.imageContainer}>
              <Image
                source={images.homeScreen}
                resizeMode="contain"
                style={[
                  style.image,
                  isKeyboardVisible && { width: SW(200), height: SH(180) }, // shrink image
                ]}
              />
            </View>
            <Text style={style.title}>MissFish</Text>
            <Text
              style={style.subTitle}
            >{`Taste the ocean in \nevery bite!`}</Text>
          </View>

          <Text style={style.text}>Enter Mobile Number</Text>
          <TextInput
            style={style.input}
            keyboardType="number-pad"
            maxLength={10}
            value={mobileNumber}
            onChangeText={text => setMobileNumber(text.replace(/[^0-9]/g, ''))}
          />
          {showError && (
            <Text style={style.errorText}>
              Please enter a valid 10-digit number
            </Text>
          )}

          <TouchableOpacity onPress={handleLogin} style={style.button}>
            <Text style={style.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomRightRadius: SW(100),
  },
  input: {
    height: 47,
    borderWidth: 1,
    marginHorizontal: SW(28),
    borderRadius: SH(10),
    borderColor: '#969AA4',
    color: colorsset.theme_dark_gray,
    paddingLeft: SW(17),
  },
  text: {
    fontWeight: '700',
    fontSize: SF(18),
    marginHorizontal: SW(28),
    paddingBottom: SH(18),
    marginTop: SH(33),
    color: colorsset.theme_dark_gray,
  },
  button: {
    backgroundColor: colorsset.theme_backgound_third,
    height: SH(48),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SW(28),
    borderRadius: SH(10),
    marginTop: SH(72),
    marginBottom: SH(91),
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: SF(18),
  },
  image: {
    width: SW(321),
    height: SH(283),
  },
  imageContainer: {
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: SF(18),
    color: colorsset.theme_dark_gray,
  },
  subTitle: {
    fontWeight: '700',
    fontSize: SF(28),
    lineHeight: SW(40),
    color: colorsset.theme_dark_gray,
  },
  titleContainer: {
    marginTop: SH(92),
    marginHorizontal: SW(23),
    marginBottom: SH(36),
    padding: 16,
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    marginHorizontal: SW(28),
    marginTop: SH(6),
    fontSize: SF(14),
  },
});
