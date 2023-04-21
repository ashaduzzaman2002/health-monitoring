import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const Header = ({ title, icon }) => {
  return (
    <View style={styles.header}>
      <View style={styles.firstHalf}>
        <TouchableOpacity style={styles.backBtn} underlayColor="#ffffff00">
          <Image source={icon} style={styles.back} />
        </TouchableOpacity>

        <Text style={[styles.title, { marginLeft: 10 }]}>{title}</Text>
      </View>

      <TouchableOpacity style={styles.backBtn} underlayColor="#ffffff00">
        <Image
          source={require('../images/menu.png')}
          style={[styles.back, styles.menu]}
        />
      </TouchableOpacity>
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
  },

  firstHalf: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  back: {
    width: 24,
    height: 24,
    marginTop: 5,
    tintColor: '#fff'
  },
  backBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff'
  },

  menu: {},
});
