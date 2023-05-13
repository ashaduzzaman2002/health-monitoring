import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
const { width, height } = Dimensions.get('window');
import { useNavigationState } from '@react-navigation/native';

const Footer = ({navigation}) => {
  const navigationState = useNavigationState((state) => state);
  const currentRoute = navigationState.routes[navigationState.index];
  const currentScreen = currentRoute.name;

  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.iconout}
      >
        {currentScreen === 'Home' ? (
          <Image source={require('../images/homeActive.png')} />
        ) : (
          <Image source={require('../images/home.png')} />
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('MyWatch')} style={styles.iconout}>
      {currentScreen === 'MyWatch' ? (
          <Image source={require('../images/watchActive.png')} />
        ) : (
            <Image source={require('../images/watch.png')} />
        )}
        
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('MyWatch')} style={styles.iconout}>
        <Image source={require('../images/cardiogram.png')} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconout}>
        <Image source={require('../images/hospital.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 15,
    width: width - 40,
    height: height / 12,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    elevation: 15,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 40,
  },

  iconout: {
    // borderWidth: 1,
    // borderColor: '#00BCD4',
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    // elevation:
  },
});
