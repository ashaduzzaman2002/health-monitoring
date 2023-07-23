import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import { colors } from '../global/styles';
import { loaclURL } from '../../connection/config';
const { width, height } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const { apointments, userToken } = useContext(AppContext);
  return (
    <View style={styles.cotainer}>
      <Header
        title={'MediDoc'}
        navigation={navigation}
        icon={require('../images/logo.png')}
      />

      <Text style={styles.heading}>Upcoming Apointment</Text>

      <ScrollView>
        {apointments?.map((item, i) => (
          <Card data={item} key={i} userToken={userToken} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;

const Card = ({ data, userToken }) => {
  const sendReminder = async (email, time) => {
    try {
      const { data } = await axios.post(
        `${loaclURL}api/alert/send-reminder`,
        { token: userToken, email, time }
      );
      toast.success('Add doctor successfully', {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>
          {data.patientName.length > 12
            ? `${data.patientName.slice(0, 12)}...`
            : data.patientName}
        </Text>
        <Text style={styles.time}>{data.time}</Text>
      </View>

      <TouchableOpacity onPress={() => sendReminder(data.patientEmail, data.time)} style={styles.btn}>
        <Text style={styles.btnTxt}>Reminder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cotainer: {
    minHeight: height,
  },

  heading: {
    fontSize: 30,
    textAlign: 'center',
    paddingLeft: 20,
    marginVertical: 10,
    color: colors.primary,
  },

  card: {
    width: width - 40,
    backgroundColor: '#fff',
    elevation: 10,
    marginVertical: 20,
    alignSelf: 'center',
    height: 70,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 22,
    fontWeight: '400',
  },

  time: {
    color: 'gray',
    fontSize: 13,
  },

  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    elevation: 10,
    borderRadius: 25,
  },

  btnTxt: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
});
