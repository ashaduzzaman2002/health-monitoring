import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext } from 'react';
import Header from '../components/Header';
import { AuthContext } from '../context/AppContext';
import { colors, hr80 } from '../global/styles';
const { width, height } = Dimensions.get('window');

const Profile = ({ navigation }) => {
  const { userDetails } = useContext(AuthContext);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ImageBackground>
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
        </ImageBackground>

        <View style={styles.card}>
          <View style={[styles.row]}>
            <Text style={styles.rowText1}>Email</Text>
            <Text style={styles.rowText2}>{userDetails.email}</Text>
          </View>
          <View style={[hr80, { width: '100%', marginTop: 10 }]} />
          <View style={[styles.row]}>
            <Text style={styles.rowText1}>Age</Text>
            <Text style={styles.rowText2}>{userDetails.age}</Text>
          </View>
          <View style={[hr80, { width: '100%', marginTop: 10 }]} />

          <View style={[styles.row]}>
            <Text style={styles.rowText1}>Gender</Text>
            <Text style={styles.rowText2}>{userDetails.gender}</Text>
          </View>
          <View style={[hr80, { width: '100%', marginTop: 10 }]} />

          <View style={[styles.row]}>
            <Text style={styles.rowText1}>Blood Group</Text>
            <Text style={styles.rowText2}>{userDetails.bloodGroup}</Text>
          </View>
          <View style={[hr80, { width: '100%', marginTop: 10 }]} />

          <View style={[styles.row]}>
            <Text style={styles.rowText1}>Height</Text>
            <Text style={styles.rowText2}>{userDetails.height}</Text>
          </View>
          <View style={[hr80, { width: '100%', marginTop: 10 }]} />

          <View style={[styles.row]}>
            <Text style={styles.rowText1}>Weight</Text>
            <Text style={styles.rowText2}>{userDetails.weight}</Text>
          </View>
          <View style={[hr80, { width: '100%', marginTop: 10 }]} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          style={styles.btnout}
        >
          <Text style={styles.btn}>Edit Profile</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  profileCover: {
    width: width,
    height: height / 2.5,
    alignItems: 'center',
    // justifyContent: 'center',
    // marginTop: 10,
    borderBottomEndRadius: 120,
    borderBottomStartRadius: 120,
    overflow: 'hidden',
    elevation: 20,
  },

  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 999,
    overflow: 'hidden',
    elevation: 20,
    marginTop: 40,
  },

  userName: {
    color: '#ffffff',
    fontSize: 23,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },

  card: {
    width: width - 40,
    backgroundColor: '#fff',
    position: 'relative',
    bottom: 80,
    borderRadius: 20,
    elevation: 20,
    height: height / 2,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'center',
  },

  btnout: {
    width: width - 40,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    elevation: 10,
    position: 'relative',
    bottom: 35,
  },

  btn: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rowText1: {
    fontSize: 16,
    fontWeight: '500',
  },

  rowText2: {
    color: 'gray',
    fontSize: 13,
    fontWeight: '500',
  },
});
