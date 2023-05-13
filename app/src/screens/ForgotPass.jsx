import {
  Dimensions,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { colors } from '../global/styles';

import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { loaclURL } from '../../connection/config';

const { height } = Dimensions.get('window');

const ForgotPass = ({ navigation }) => {
  const [emailFocus, setEmailFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Show toast message
  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
      autoHide: true,
    });
  };

  const forgotHandler = async () => {
    setError('');
    setError('');
    var validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    setEmail(email.toLowerCase());

    if (!email?.trim().length) return setError('Email required!');
    if (!email.match(validEmail)) return setError('Invalid email!');

    if (email?.trim().split('.')[1]?.length < 2)
      return setError('Invalid email!');

    try {

        const {data} = await axios.post(`${loaclURL}api/patient/forgot-password`, {email})
        
        console.log(data);
        showToast('success', 'Forgot Password', 'Forgot password link sent to your email');

      setTimeout(() => {
        navigation.navigate('Login')
      }, 3000)
    } catch (error) {
        if (error?.response?.data) {
            const { data } = error.response;
            if (!data.success) {
              showToast('error', 'Unauthorized', data.messsage);
            }
          }
          console.log(error);
    }

    Keyboard.dismiss()
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Forgot Password</Text>
      {/* Show error */}
      {error?.length ? (
        <Text
          style={{ color: 'red', marginBottom: 5, fontSize: 14, marginTop: -5 }}
        >
          {error}
        </Text>
      ) : (
        ''
      )}

      {/* Email input */}
      <View style={styles.inputout}>
        <AntDesign
          name="user"
          size={24}
          color={emailFocus ? colors.primary : 'grey'}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onFocus={() => {
            setEmailFocus(true);
          }}
          value={email}
          onChange={(e) => setEmail(e.nativeEvent.text)}
        />
      </View>

      {/* Sigin button */}
      <TouchableOpacity onPress={forgotHandler} style={styles.btnout}>
        <Text style={styles.btn}>Send Link</Text>
      </TouchableOpacity>

      {/* Status bar */}
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fff"
      />
      <Toast />
    </SafeAreaView>
  );
};

export default ForgotPass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: height / 10,
    paddingHorizontal: 20,
  },

  heading: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 10,
    color: colors.primary,
  },

  inputout: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 20,
    marginTop: 30,
  },

  input: {
    fontSize: 18,
    marginLeft: 10,
    width: '80%',
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
    marginTop: 10,
  },

  btn: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
