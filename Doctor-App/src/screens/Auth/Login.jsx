import {
    BackHandler,
    Keyboard,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, { useEffect, useState, useContext } from 'react';
  
  import {
    AntDesign,
    Octicons,
    MaterialCommunityIcons,
  } from '@expo/vector-icons';
  import { hr80, colors } from '../../global/styles';
  
  import Toast from 'react-native-toast-message';
  import axios from 'axios';
  import { loaclURL } from '../../../connection/config';
import { AppContext } from '../../context/AppContext';
  
  const Login = ({ navigation }) => {
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const { login } = useContext(AppContext);
  
    useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          // Navigate to the home page
          navigation.navigate('Welcome');
          return true; // Prevent default back behavior
        }
      );
  
      return () => backHandler.remove();
    }, [navigation]);
  
    // Show toast message
    const showToast = (type, text1, text2) => {
      Toast.show({
        type,
        text1,
        text2,
        autoHide: true,
      });
    };
  
    const loginHandler = async () => {
      setError('');
  
      setEmail(email.toLowerCase());
  
      if (!email?.trim().length) return setError('Email required!');
  
      if (!password.trim().length) return setError('Password required!');
  
      let user = {
        email: email.toLowerCase(),
        password,
      };
  
  
      try {
        const { data } = await axios.post(`${loaclURL}api/doctor/login`, user);
        // setEmail('');
        // setPassword('');
  
        showToast('success', 'Logged-in successfully', 'Welcome back to MediDoc');
        setTimeout(() => {
          login(data.doctor.token);
          navigation.navigate('Home');
        }, 1000);
      } catch (error) {
        if (error?.response?.data) {
          const { data } = error.response;
          if (!data.success) {
            showToast('error', 'Unauthorized', data.error);
            console.log(error.response.data);
          }
        }
        console.log(error);
      }
  
      Keyboard.dismiss();
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.head1}>Sign In</Text>
  
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
              setPasswordFocus(false);
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
              setEmailFocus(false);
              setPasswordFocus(true);
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
  
        {/* Sigin button */}
        <TouchableOpacity onPress={loginHandler} style={styles.btnout}>
          <Text style={styles.btn}>Sign In</Text>
        </TouchableOpacity>
  
        {/* Forgot password */}
        <Text
          onPress={() => navigation.navigate('ForgotPass')}
          style={styles.forgot}
        >
          Forgot Password
        </Text>
  
        <View style={hr80} />
  
        
  
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
  
  export default Login;
  
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
  