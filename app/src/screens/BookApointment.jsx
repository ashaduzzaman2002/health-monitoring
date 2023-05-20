import {
    Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import { AuthContext } from '../context/AppContext';
import Toast from 'react-native-toast-message';
import { colors, hr80 } from '../global/styles';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { loaclURL } from '../../connection/config';
const {height} = Dimensions.get('window')


const BookApointment = ({ navigation }) => {
  const {email, doctor} = useRoute().params
  const { userDetails, userToken} = useContext(AuthContext);
  const [time, setTime] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
      autoHide: true,
    });
  };

  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  const currentDate = new Date();
  const year = Number(currentDate.getFullYear());
  const currentMonth = Number(currentDate.getMonth()) ;
  const days = getDaysInMonth(year, currentMonth + 1);
  // const currentDay = Number(currentDate.getDate())

  let timeList = [
    { name: '10:00 AM' },
    { name: '10:30 AM' },
    { name: '11:00 AM' },
    { name: '11:30 AM' },
    { name: '12:00 PM' },
    { name: '12:30 PM' },
    { name: '1:00 PM' },
    { name: '1:30 PM' },
    { name: '2:00 PM' },
    { name: '2:30 PM' },
    { name: '3:00 PM' },
    { name: '3:30 PM' },
    { name: '4:00 PM' },
    { name: '4:30 PM' },
    { name: '5:00 PM' },
    { name: '5:30 PM' },
    { name: '6:00 PM' },
    { name: '6:30 PM' },
    { name: '7:00 PM' },
    { name: '7:30 PM' },
    { name: '8:00 PM' },
    { name: '8:30 PM' },
    { name: '9:00 PM' },
    { name: '9:30 PM' },
    { name: '10:00 PM' },
    { name: '10:30 PM' },
  ];

  let dayList = Array(Number(days)).fill();
  let monthList = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  monthList =monthList.filter((item, i) => i >= currentMonth? item: null)

  const handleSubmit = async () => {

    if (time.length < 1) return showToast('error', 'Please select time')
    if (day.length < 1) return showToast('error', 'Please select day')
    if (month.length < 1) return showToast('error', 'Please select month')

    const newApointment = {
      time: `${time}, ${day} ${month}`,
      patient: userDetails.userId,
      patientName: userDetails.name,
      patientEmail: userDetails.email,
      doctorName: doctor,
      doctorEmail: email,
      token: userToken

    }

    try {
      const {data} = await axios.post(`${loaclURL}api/apointment/book`, newApointment)
      
      showToast('success', data.msg)

      setTime('')
      setDay('')
      setMonth('')
      
      setTimeout(() => {
        navigation.navigate('Apointment')
      }, 1000)
    } catch (error) {
      if(error?.respose?.data) return showToast('error', error?.respose?.data.msg)
      console.log(error);
    }

    
  }

  return (
    <>
      <Header
        userDetails={userDetails}
        title={'Book Apointment'}
        icon={require('../images/back.png')}
        navigation={navigation}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={{ paddingHorizontal: 20, paddingTop: 30, width: '100%' }}
        >
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Select Time</Text>
            <Picker
              selectedValue={time}
              onValueChange={(itemValue, itemIndex) => setTime(itemValue)}
              style={styles.dropdown}
            >
              <Picker.Item  label={'Select time'} value={''} />
              {timeList?.map((item, i) => (
                <Picker.Item key={i} label={`${item.name}`} value={item.name} />
              ))}
            </Picker>
          </View>

          {/* Day */}

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={[styles.dropdownContainer, { width: '48%' }]}>
              <Picker
                selectedValue={day}
                onValueChange={(itemValue, itemIndex) => setDay(itemValue)}
                style={styles.dropdown}
              >
                <Picker.Item  label={'Select day'} value={''} />
                {dayList?.map((item, i) => (
                  <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
                ))}
              </Picker>
            </View>
            <View style={[styles.dropdownContainer, { width: '48%' }]}>
              
              <Picker
                selectedValue={month}
                onValueChange={(itemValue, itemIndex) => setMonth(itemValue)}
                style={styles.dropdown}
              >
                <Picker.Item  label={'Select month'} value={''} />
                {monthList?.map((item, i) => (
                  <Picker.Item key={i} label={item} value={item} />
                ))}
              </Picker>
            </View>
            
          </View>
          {/* Sigin button */}
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.btnout}
          >
            <Text style={styles.btn}>Book Now</Text>
          </TouchableOpacity>
          
          {/* Status bar */}
          <StatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor="#00BCD4"
          />
          
        </ScrollView>
        <Toast />
      </SafeAreaView>
      
    </>
  );
};

export default BookApointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    height: height
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

  dropdownContainer: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  dropdownLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#00BCD4',
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: '#fff',
    fontSize: 18,
  },
});
