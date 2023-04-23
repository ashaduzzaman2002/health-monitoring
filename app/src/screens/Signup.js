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
  Entypo
} from '@expo/vector-icons';
import { hr80 } from '../global/styles';
const Signup = ({navigation}) => {
  const [userFocus, setUserFocus] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.head1}>Sign Up</Text>

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
            setUserFocus(true)
            setEmailFocus(false);
            setPasswordFocus(false);
            setShowPassword(false);
          }}
        />
      </View>

      <View style={styles.inputout}>
      <Entypo name="email" size={24} color={emailFocus ? colors.primary : 'grey'} />
      
        <TextInput
          style={styles.input}
          placeholder="Email"
          onFocus={() => {
            setUserFocus(false)
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
            setUserFocus(false)
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
        <Text style={styles.btn}>Sign Up</Text>
      </TouchableOpacity>


      <View style={hr80} />

      <Text style={styles.signupout}>
        Already have an account?
        <Text
          onPress={() => navigation.navigate('Login ')}
          style={styles.signup}
        >
          {' '}
          Sign In
        </Text>
      </Text>

      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fff"
      />
    </SafeAreaView>
  )
}

export default Signup

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
})