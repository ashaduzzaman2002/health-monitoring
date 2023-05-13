import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { colors } from '../global/styles';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';

const inputs = Array(4).fill('');

const { width, height } = Dimensions.get('window');
let newInputIndex = 0;

const isObjectValid = (obj) => {
  return Object.values(obj).every((val) => val.trim());
};

const Otp = ({ route, navigation }) => {
  const handleBackButton = () => {
    return true; // Prevent default back button behavior
  };

  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  });

  const { id } = route.params;
  const input = useRef();
  const [OTP, setOTP] = useState({ 0: '', 1: '', 2: '', 3: '' });
  const [nextIndex, setNextIndex] = useState(0);

  // Show toast message
  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      autoHide: true,
    });
  };

  const handleChangeText = (text, i) => {
    const newOTP = { ...OTP };
    if (text.length > 1) {
      return;
    }
    newOTP[i] = text;
    setOTP(newOTP);

    const lastInputIndex = inputs.length - 1;

    if (!text) newInputIndex = i === 0 ? 0 : i - 1;
    else newInputIndex = i === lastInputIndex ? lastInputIndex : i + 1;
    setNextIndex(newInputIndex);
  };

  useEffect(() => {
    input.current.focus();
  }, [nextIndex]);

  const handleVerify = async () => {
    Keyboard.dismiss();

    if (isObjectValid(OTP)) {
      let val = '';

      Object.values(OTP).forEach((v) => {
        val += v;
      });

      try {
        const { data } = await axios.post(
          'http://192.168.229.6:8000/api/patient/verify-email',
          { userId: id, otp: val }
        );

        showToast(
          'success',
          'Account verify successfully',
          'Now you can logged in to your account!'
        );

        console.log(data);
        if (data.success === true) {
          setTimeout(() => {
            navigation.navigate('Login');
          }, 3000);
        }
      } catch (error) {
        if (error?.response?.data) {
          const { data } = error.response;
          console.log(data);
          if (!data.success) {
            showToast('error', data.msg);
          }
        }
        console.log(error);
      }
    }
  };
  return (
    <>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.heading}>Verify Email</Text>

        <View style={styles.inputContainer}>
          {inputs.map((inp, i) => (
            <View key={i} style={styles.input}>
              <TextInput
                value={OTP[i]}
                style={styles.input_inner}
                placeholderTextColor={'gray'}
                keyboardType="numeric"
                placeholder="0"
                onChangeText={(text) => handleChangeText(text, i)}
                ref={nextIndex === i ? input : null}
              />
            </View>
          ))}
        </View>
        {/* Verify button */}
        <TouchableOpacity onPress={handleVerify} style={styles.btnout}>
          <Text style={styles.btn}>Verify</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Status bar */}
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fff"
      />

      <Toast />
    </>
  );
};

export default Otp;

const inputWidth = Math.round(width / 6);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: '40%',
    paddingHorizontal: inputWidth / 2,
  },

  heading: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 10,
    color: colors.primary,
  },

  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 30,
  },

  input: {
    width: inputWidth,
    height: inputWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 20,
  },

  input_inner: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '500',
  },

  btnout: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    elevation: 10,
    marginVertical: 10,
    marginTop: 50,
  },

  btn: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
