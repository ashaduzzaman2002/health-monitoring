import {
  Alert,
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
  const [isSend, setIsSend] = useState(true)
  const [showAlert, setShowAlert] = useState(false)

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
        setShowAlert(true)
            setIsSend(true)
        if(heartRate < 60 || heartRate > 100 || bloodPresure > 1.5  ){
          try {
            const {data} = await axios.post(`${loaclURL}api/alert/send`, {token: userToken, heartRate, bloodPresure})
          console.log(data);

            // if(showAlert){
            //   Alert.alert(
            //     'Alert',
            //     'Sending alert to email. Do you cant to cancel?',
            //     [
            //       { text: 'Cancel', onPress: () => setIsSend(true) }
            //     ],
            //     { cancelable: false }
            //   );
            // }

            // setTimeout(() => {
            //   if(isSend){
            //     console.log('0denger');
            //   }

            //   console.log(isSend);

            //   console.log('object');
            //   // setShowAlert(false)
            // }, 3000)
            
            // console.log('j',isSend);
          } catch (error) {
            console.log(error?.respose);
          }
            
        }


        setHeartRate('')
        setBloodPresure('')
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
