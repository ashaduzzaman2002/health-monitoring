import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AppContext';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { colors, hr80 } from '../global/styles';
import { loaclURL } from '../../connection/config';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Apointment = ({ navigation }) => {
  const { allDoctors, isLoading, userDetails, apointments, userToken } =
    useContext(AuthContext);

  const [apointList, setApointList] = useState(apointments);
  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
      autoHide: true,
    });
  };

  const cancel = async (id) => {
    console.log(id);
    try {
      const { data } = await axios.post(`${loaclURL}api/apointment/delete`, {
        id,
        token: userToken,
      });

      setApointList(apointList.filter((item) => item._id !== id));
      showToast('success', data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }


  return (
    <>
      <Header
        userDetails={userDetails}
        title={'Apointment'}
        icon={require('../images/back.png')}
        navigation={navigation}
      />

      <SafeAreaView style={styles.container}>
        <ScrollView style={{ paddingHorizontal: 20 }}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {apointList?.map((item, i) => (
              <View key={i} style={styles.apointmentCard}>
                <Text style={{ fontSize: 25, fontWeight: '500' }}>
                  Your Apointment
                </Text>
                <Text style={{ marginTop: 10, fontSize: 16 }}>
                  Doctor: {item.doctorName}
                </Text>
                <Text style={{ color: 'gray', fontSize: 14 }}>{item.time}</Text>
                <TouchableOpacity
                  onPress={() => cancel(item._id)}
                  style={{ position: 'absolute', bottom: 10, right: 15 }}
                >
                  <Text style={{ color: 'red' }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={[styles.cardGroup, { marginBottom: 100 }]}>
            <Text style={{ fontSize: 20, fontWeight: '500' }}>All Doctors</Text>
            <Text style={styles.bannerTxt}>
              Find best doctor for your-self.
            </Text>

            <View styles={styles.cards}>
              {allDoctors?.map((item, i) => (
                <View key={i}>
                  <Slider1Item
                    imgUrl={item.avtar}
                    doctor={item.name}
                    degree={item.degree}
                    college={item.college}
                    navigation={navigation}
                    email={item.email}
                  />
                  <View style={[hr80, { width: width }]} />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <Footer navigation={navigation} />
        <Toast />
      </SafeAreaView>
    </>
  );
};

export default Apointment;

const Slider1Item = ({
  imgUrl,
  doctor,
  degree,
  college,
  navigation,
  email,
}) => (
  <View style={styles.slider1CardItem}>
    <Image
      resizeMode="cover"
      style={styles.slider1Img}
      source={{ uri: imgUrl }}
    />

    <View>
      <Text style={styles.slider1CardHeading}>{doctor}</Text>
      <View style={styles.ratingContainer}>
        <Image
          style={{ marginRight: 5, width: 26, height: 23 }}
          source={require('../images/star.png')}
        />
        <Text
          style={{
            color: '#000000',
            fontWeight: '900',
            fontSize: 14,
          }}
        >
          4.5(500+)
        </Text>
      </View>

      <Text style={styles.slider1Txt}>{degree}</Text>
      <Text style={styles.slider1Txt}>{college}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('BookApointment', { email, doctor })}
        style={[styles.btn, { marginTop: 5 }]}
      >
        <Text style={styles.btnTxt}>Vsit</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  apointmentCard: {
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 10,
    elevation: 10,
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  cardGroup: {
    width: '100%',
    marginTop: 20,
  },

  cards: {
    backgroundColor: 'red',

    width: '100%',
    height: 100,
  },

  slider1CardItem: {
    width: width - 40,
    height: 156,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    marginTop: 20,
  },

  slider1Img: {
    height: '100%',
    width: 125,
    borderRadius: 20,
  },

  btn: {
    width: 170,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 5,
  },

  btnTxt: {
    color: '#ffffff',

    fontWeight: '800',
    fontSize: 20,
  },

  slider1CardHeading: {
    fontWeight: '800',
    fontSize: 20,
    color: '#000000',
  },

  ratingContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },

  slider1Txt: {
    fontWeight: '400',
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
});
