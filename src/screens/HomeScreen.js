import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useGlobalContext } from '../contexts/globalContext';
import colorsset from '../utils/colors';
import { SF, SH, SW } from '../utils/dimensions';
import images from '../image/images';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const { state, dispatch } = useGlobalContext();
  const [mobileNumber, setMobileNumber] = useState('');
  const [showError, setShowError] = useState(false);

  const handleNavigate = () => {
    if (mobileNumber.length === 10) {
      setShowError(false);
      navigation.replace('OtpVerify');
    } else {
      setShowError(true);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // tweak offset if needed
    >
      <ScrollView
        style={style.container}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <LinearGradient
          colors={[
            'rgba(75, 197, 238, 0.66)',
            'rgba(150, 25, 75, 0.3828)',
            'rgba(255, 232, 214, 0.66)',
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.1, y: 1 }}
          style={style.container}
        >
          <View style={style.titleContainer}>
            <View style={style.imageContainer}>
              <Image
                source={images.homeScreen}
                resizeMode="contain"
                style={style.image}
              />
            </View>
            <Text style={style.title}>MissFish</Text>
            <Text
              style={style.subTitle}
            >{`Taste the ocean in \nevery bite!`}</Text>
          </View>
        </LinearGradient>
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
        <TouchableOpacity onPress={handleNavigate} style={style.button}>
          <Text style={style.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </ScrollView>
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
    fontWeight: 700,
    fontSize: SF(18),
    marginHorizontal: SW(28),
    paddingBottom: SH(18),
    marginTop: SH(33),
    color: colorsset.theme_dark_gray,
  },
  button: {
    backgroundColor: colorsset.theme_backgound_third,
    height: SH(48),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SW(28),
    borderRadius: SH(10),
    marginTop: SH(72),
    marginBottom: SH(91),
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 600,
    fontSize: SF(18),
  },
  image: {
    width: SW(321),
    height: SH(283),
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontWeight: 700,
    fontSize: SF(18),
    color: colorsset.theme_dark_gray,
  },
  subTitle: {
    fontWeight: 700,
    fontSize: SF(28),
    lineHeight: SW(40),
    color: colorsset.theme_dark_gray,
  },
  titleContainer: {
    marginTop: SH(92),
    marginHorizontal: SW(23),
    marginBottom: SH(36),
    padding: 16, // optional
    borderRadius: 10, // optional
  },
  errorText: {
    color: 'red',
    marginHorizontal: SW(28),
    marginTop: SH(6),
    fontSize: SF(14),
  },
});
