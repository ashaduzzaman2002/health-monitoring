import {
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
import { colors } from '../global/styles';

import {
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  Entypo,
} from '@expo/vector-icons';
import { hr80 } from '../global/styles';
import Toast from 'react-native-toast-message';

import axios from 'axios';

const Signup = ({ navigation }) => {
  // onfocus events
  const [userFocus, setUserFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [cpasswordFocus, setCpasswordFocus] = useState(false);

  // show password
  const [showPassword, setShowPassword] = useState(false);
  const [showCpassword, setShowCpassword] = useState(false);

  // handle inputs value
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [error, setError] = useState('');

  // Show toast message
  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      autoHide: true,
    });
  };

  const handleRegister = async () => {
    // Input validation
    setError('');
    var validEmail =
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    setEmail(email.toLowerCase());
    if (!name?.trim().length) return setError('Name required!');

    if (!email?.trim().length) return setError('Email required!');

    if (!email.match(validEmail)) return setError('Invalid email!');

    if (email?.trim().split('.')[1]?.length < 2)
      return setError('Invalid email!');

    if (!password.trim().length) return setError('Password required!');

    if (password.trim().length < 8)
      return setError('Password should be atleast 8 character!');

    if (password?.trim() !== cpassword.trim())
      return setError('Password should match!');

    user = {
      name,
      email: email.toLowerCase(),
      password,
    };

    try {
      const { data } = await axios.post(
        'http://192.168.229.6:8000/api/patient/create',
        user
      );

      setName('');
      setEmail('');
      setPassword('');
      setCpassword('');
      showToast(
        'success',
        'Account created successfully',
        'Please verify your email!'
      );

      console.log(data);
      if (data.success === true) {
        setTimeout(() => {
          navigation.navigate('Otp', {id: data.user.id});
        }, 3000);
      }
     
    } catch (error) {
      if (error?.response?.data) {
        const { data } = error.response;
        console.log(data);
        if (!data.success) {
          showToast(
            'error',
            data.msg,
            data.msg === 'After 10 minutes you can request for your OTP'
              ? ''
              : 'Login with your email or you can try with diffrent email!'
          );

          if (data.msg === 'After 10 minutes you can request for your OTP') {
            setTimeout(() => {
              navigation.navigate('Otp', {id: data.user.id});
            }, 3000);
          }
        }
      }
      console.log(error);
    }

    Keyboard.dismiss();
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.head1}>Sign Up</Text>

        {/* Show error */}
        {error?.length ? (
          <Text
            style={{
              color: 'red',
              marginBottom: 5,
              fontSize: 14,
              marginTop: -5,
            }}
          >
            {error}
          </Text>
        ) : (
          ''
        )}

        {/* Name input */}
        <View style={styles.inputout}>
          <AntDesign
            name="user"
            size={24}
            color={userFocus ? colors.primary : 'grey'}
          />
          <TextInput
            style={styles.input}
            placeholder="Name"
            onFocus={() => {
              setUserFocus(true);
              setEmailFocus(false);
              setPasswordFocus(false);
              setShowPassword(false);
              setCpasswordFocus(false);
              setShowCpassword(false);
              setShowPassword(false);
            }}
            value={name}
            onChange={(e) => setName(e.nativeEvent.text)}
          />
        </View>

        {/* Email input */}
        <View style={styles.inputout}>
          <Entypo
            name="email"
            size={24}
            color={emailFocus ? colors.primary : 'grey'}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            onFocus={() => {
              setUserFocus(false);
              setEmailFocus(true);
              setPasswordFocus(false);
              setShowPassword(false);
              setCpasswordFocus(false);
              setShowCpassword(false);
              setShowPassword(false);
            }}
            value={email}
            onChange={(e) => setEmail(e.nativeEvent.text)}
          />
        </View>

        {/* Password input */}
        <View style={styles.inputout}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={24}
            color={passwordFocus ? colors.primary : 'grey'}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onFocus={() => {
              setUserFocus(false);
              setEmailFocus(false);
              setPasswordFocus(true);
              setCpasswordFocus(false);
              setShowCpassword(false);
            }}
            secureTextEntry={!showPassword}
            value={password}
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />

          <Octicons
            name={!showPassword ? 'eye-closed' : 'eye'}
            size={24}
            color={'black'}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>

        {/* Confirm Password input */}
        <View style={styles.inputout}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={24}
            color={cpasswordFocus ? colors.primary : 'grey'}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onFocus={() => {
              setUserFocus(false);
              setEmailFocus(false);
              setPasswordFocus(false);
              setCpasswordFocus(true);
              setShowPassword(false);
            }}
            secureTextEntry={!showCpassword}
            value={cpassword}
            onChange={(e) => setCpassword(e.nativeEvent.text)}
          />

          <Octicons
            name={!showCpassword ? 'eye-closed' : 'eye'}
            size={24}
            color={'black'}
            onPress={() => setShowCpassword(!showCpassword)}
          />
        </View>

        {/* Signup button */}
        <TouchableOpacity onPress={handleRegister} style={styles.btnout}>
          <Text style={styles.btn}>Sign Up</Text>
        </TouchableOpacity>

        <View style={hr80} />

        {/* Sigin navigation */}
        <Text style={styles.signupout}>
          Already have an account?
          <Text
            onPress={() => navigation.navigate('Login')}
            style={styles.signup}
          >
            {' '}
            Sign In
          </Text>
        </Text>

        {/* Status bar */}
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#fff"
        />
      </SafeAreaView>
      <Toast />
    </>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  head1: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 10,
    color: colors.primary,
  },

  inputout: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 20,
  },

  input: {
    fontSize: 18,
    marginLeft: 10,
    width: '80%',
  },

  btnout: {
    width: '80%',
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    elevation: 10,
    marginVertical: 10,
  },

  btn: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  forgot: {
    color: 'grey',
    marginTop: 20,
    marginBottom: 10,
  },

  signupout: {
    fontSize: 15,
  },

  signup: {
    color: colors.primary,
  },
});
