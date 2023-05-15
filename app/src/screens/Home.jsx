import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, { useContext } from 'react';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import CommonBtn from '../components/CommonBtn';
import { AuthContext } from '../context/AppContext';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import { colors } from '../global/styles';

const { width, height } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const { logout, isLoading, userDetails, allDoctors } =
    useContext(AuthContext);
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Header
        userDetails={userDetails}
        title={'MediDoc'}
        icon={require('../images/logo.png')}
        navigation={navigation}
      />

      <View style={styles.container}>
        <ScrollView>
          <View style={{ width: '100%', height: height / 3.2 }}>
            <Image
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
              source={require('../images/banner.png')}
            />
          </View>

          {/* Slider  */}
          <View style={styles.slider1out}>
            <Text style={{ fontSize: 20, fontWeight: '500' }}>
              Popular Doctors
            </Text>
            <Text style={styles.bannerTxt}>Top rated doctor near you.</Text>
            <View style={styles.slider1Cardout}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={styles.slider1Cardinner}
              >
                {allDoctors?.map((item, i) => (
                  <Slider1Item
                    key={i}
                    imgUrl={item.avtar}
                    doctor={item.name}
                    degree={item.degree}
                    college={item.college}
                    email= {item.email}
                    navigation = {navigation}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>

        <Footer navigation={navigation} />
      </View>
    </>
  );
};

// Slider 1
const Slider1Item = ({ imgUrl, doctor, degree, college, email, navigation }) => (
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
      <TouchableOpacity onPress={() => navigation.navigate('BookApointment', {email, doctor})} style={[styles.btn, { marginTop: 5 }]}>
        <Text style={styles.btnTxt}>Vsit</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    zIndex: 1,
    paddingHorizontal: 20,
  },

  bannerTxt: {
    fontSize: 14,
    color: 'gray',
  },

  bannerImg: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginTop: 15,
  },

  slider1out: {
    width: '100%',
    marginTop: 40,
  },

  slider1Cardout: {
    width: '100%',
    marginTop: 12,
  },

  slider1Cardinner: {
    width: width - 40,
    height: 156,
  },

  slider1CardItem: {
    width: width - 40,
    height: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
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
