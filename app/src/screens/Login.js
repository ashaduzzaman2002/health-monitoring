import {
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
} from '@expo/vector-icons';
import { hr80 } from '../global/styles';

const Login = ({ navigation }) => {
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.head1}>Sign In</Text>

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
        />
      </View>

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
        />

        <Octicons
          name={!showPassword ? 'eye-closed' : 'eye'}
          size={24}
          color={'black'}
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>

      <TouchableOpacity style={styles.btnout}>
        <Text style={styles.btn}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.forgot}>Forgot Password</Text>

      <View style={hr80} />

      <Text style={styles.signupout}>
        Don't have an account?
        <Text
          onPress={() => navigation.navigate('Signup')}
          style={styles.signup}
        >
          {' '}
          Sign Up
        </Text>
      </Text>

      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fff"
      />
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
