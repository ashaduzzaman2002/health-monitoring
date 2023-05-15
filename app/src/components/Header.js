import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  Animated,
  ImageBackground,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { hr80 } from '../global/styles';
import { useNavigationState } from '@react-navigation/native';
import { AuthContext } from '../context/AppContext';
const { height, width } = Dimensions.get('window');

const Header = ({ title, icon, userDetails, navigation }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const linkList = [
    {title: 'Home', name: 'Home'},
    {title: 'My Watch', name: 'MyWatch'},
    { title: 'Profile', name: 'Profile' },
    { title: 'Edit Profile', name: 'EditProfile' },
    { title: 'Health Logs', name: 'HealthLog' },
    { title: 'Apointment', name: 'Apointment' },
  ];
  const navigationState = useNavigationState((state) => state);
  const currentRoute = navigationState.routes[navigationState.index];
  const currentScreen = currentRoute.name;

  const handleBack = () => {
    if (currentScreen !== 'Home') {
      navigation.goBack()
    }
  }

  const {logout} = useContext(AuthContext)

  return (
    <View style={styles.header}>
      <View style={styles.firstHalf}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn} underlayColor="#ffffff00">
          <Image source={icon} style={styles.back} />
        </TouchableOpacity>

        <Text style={[styles.title, { marginLeft: 10 }]}>{title}</Text>
      </View>

      <TouchableOpacity
        onPress={() => setToggleMenu(true)}
        style={styles.backBtn}
        underlayColor="#ffffff00"
      >
        <Image
          source={require('../images/menu.png')}
          style={[styles.back, styles.menu]}
        />
      </TouchableOpacity>

      <View style={[styles.drawer, !toggleMenu ? { display: 'none' } : null]}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => setToggleMenu(false)}
        >
          <Image
            style={{ width: 22, height: 22 }}
            source={require('../images/close.png')}
          />
        </TouchableOpacity>

        <View>
          <ImageBackground
            style={styles.profileCover}
            source={require('../images/cover.jpg')}
          >
            <View style={styles.profilePic}>
              <Image
                resizeMode="cover"
                style={{ width: '100%', height: '100%' }}
                source={{ uri: userDetails?.avtar }}
              />
            </View>

            <Text style={styles.userName}>{userDetails?.name}</Text>
          </ImageBackground>
        </View>

        <View style={styles.links}>
          {linkList.map((item, i) => (
            <TouchableOpacity
              style={[
                styles.link,
                item.name === currentScreen ? styles.active : null,
              ]}
              key={i}
              onPress={() => {
                navigation.navigate(item.name)
                setToggleMenu(false)
              }}
            >
              <Text
                style={[
                  styles.linkTxt,
                  item.name === currentScreen ? styles.activeLinkTxt : null,
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={hr80} />
          <TouchableOpacity onPress={logout} style={[styles.link, { marginTop: -10 }]}>
            <Text style={styles.linkTxt}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.test, !toggleMenu ? { display: 'none' } : null]}>
        </View>

      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#00BCD4"
      />
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  header: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#00BCD4',
    // elevation: 5,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    // marginBottom: 2,
    zIndex: 100,
  },

  firstHalf: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  back: {
    width: 24,
    height: 24,
    marginTop: 5,
    tintColor: '#fff',
  },
  backBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },

  menu: {},

  drawer: {
    height: height,
    width: width - width / 3,
    position: 'absolute',
    backgroundColor: '#fff',
    elevation: 20,
    right: 0,
    top: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: 20,
  },

  closeBtn: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 10,
  },

  profileCover: {
    width: width - width / 3,
    height: 150,
    margin: -20,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 999,
    overflow: 'hidden',
    elevation: 20,
  },

  userName: {
    position: 'absolute',
    bottom: 10,
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },

  links: {
    marginTop: 40,
    width: '100%',
  },

  link: {
    marginBottom: 15,
    paddingHorizontal: 5,
  },

  linkTxt: {},

  active: {
    paddingVertical: 7,
    backgroundColor: '#00BCD4',
  },

  linkTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: 'gray',
  },

  activeLinkTxt: {
    color: '#fff',
  },

  test: {
    width: width,
    height: height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    zIndex: 10,
    top: 20,
  },
});
