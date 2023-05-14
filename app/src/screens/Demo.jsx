import {
    Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import { AuthContext } from '../context/AppContext';
import { colors } from '../global/styles';
import axios from 'axios';
import { loaclURL } from '../../connection/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Demo = ({ navigation }) => {
  const { userDetails, userToken, currentData } = useContext(AuthContext);
  const [heartRate, setHeartRate] = useState(null);
  const [bloodPresure, setBloodPresure] = useState(null);
  const handleSendData = async () => {
    const watchData = {
      token: userToken,
      heartRate,
      bloodPresure,
    };

    AsyncStorage.setItem('heartRate', heartRate);
    AsyncStorage.setItem('bloodPresure', bloodPresure);
    currentData()

    // console.log(data);

    try {
        const {data} = await axios.post(`${loaclURL}api/smart-watch/data/collect`, watchData)
        if(heartRate < 60 || heartRate > 100  ){
            console.log('Denger');
        }

        if(bloodPresure > 1.5 ){
            console.log('Denger');
        }

        setHeartRate('')
        setBloodPresure('')
        console.log(data);
    } catch (error) {
        console.log('error:', error);
    }

    Keyboard.dismiss()
  };
  return (
    <>
      <Header
        userDetails={userDetails}
        title={'Demo'}
        icon={require('../images/back.png')}
        navigation={navigation}
      />
      <View style={styles.container}>
        <View style={styles.inputout}>
          <TextInput
            value={heartRate}
            onChangeText={(text) => setHeartRate(text)}
            style={styles.input}
            keyboardType="numeric"
            placeholder="Heart Rate"
          />
        </View>

        <View style={styles.inputout}>
          <TextInput
            style={styles.input}
            value={bloodPresure}
            onChangeText={(text) => setBloodPresure(text)}
            keyboardType="numeric"
            placeholder="Blood Presure"
          />
        </View>
        <TouchableOpacity onPress={handleSendData} style={styles.btnout}>
          <Text style={styles.btn}>Send Data</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Demo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  inputout: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 20,
    marginTop: 20,
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
