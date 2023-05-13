import { BackHandler, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { colors, hr80 } from '../global/styles';
import { AuthContext } from '../context/AppContext';
import Spinner from '../components/Spinner';

const Welcome = ({ navigation }) => {
  const {isLoading} = useContext(AuthContext)

  const handleBackButton = () => {
    BackHandler.exitApp(); // Exit the app
    return true; // Prevent default back button behavior
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  if(isLoading) {
    return <Spinner />
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MediDoc</Text>

      <View style={styles.bannerContainer}>
        <Image source={require('../images/banner.png')} style={styles.banner} />
      </View>

      <View style={hr80} />
      <Text style={styles.text}>
        Track your health data and Find the best Doctor at lowest price.
      </Text>
      <View style={hr80} />

      <View style={styles.btnout}>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.btn}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btn}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#00BCD4"
      />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00BCD4',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 50,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: '200',
  },

  bannerContainer: {
    width: '80%',
    height: '30%',
    alignItems: 'center',
  },

  banner: {
    width: '100%',
    height: '100%',
  },

  text: {
    color: '#fff',
    fontSize: 18,
    width: '80%',
    textAlign: 'center',
  },

  btnout: {
    flexDirection: 'row',
  },

  btn: {
    backgroundColor: '#fff',
    fontSize: 20,
    color: colors.primary,
    textAlign: 'center',
    marginVertical: 30,
    marginHorizontal: 10,
    fontWeight: '700',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
});
