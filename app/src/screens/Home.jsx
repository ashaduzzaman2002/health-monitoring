import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useContext } from 'react';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import CommonBtn from '../components/CommonBtn';
import { AuthContext } from '../context/AppContext';
import Spinner from '../components/Spinner'
import Footer from '../components/Footer';

const Home = ({ navigation }) => {
  const {logout, isLoading, userDetails} = useContext(AuthContext)
  if(isLoading) {
    return <Spinner />
  }
  
  return (
    <View style={styles.container}>
      <Header userDetails={userDetails} title={'MediDoc'} icon={require('../images/logo.png')} />
      <Text>{userDetails?.name}</Text>
      <ScrollView>
      <TouchableOpacity onPress={logout}>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000kkkk</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logout}>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000kkkk</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logout}>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000kkkk</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logout}>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000kkkk</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logout}>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000kkkk</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logout}>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000kkkk</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logout}>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000kkkk</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000kkkk</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logout}>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000kkkk</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000kkkk</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logout}>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000kkkk</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000kkkk</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000kkkk</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000kkkk</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logout}>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000</Text>
        <Text>Logout0000000000000000kkkk</Text>
      </TouchableOpacity>
      </ScrollView>
      
      <Footer navigation={navigation} />
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    zIndex: 1
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  heading: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 15,
    marginLeft: 15,
  },
  linearGradient: {
    width: 120,
    height: 80,
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  docItem: {
    width: '45%',

    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.2,
    margin: 10,
  },
  docImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 20,
  },
  docName: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: 10,
  },
  docSpl: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: '600',
    alignSelf: 'center',
    color: 'green',
    backgroundColor: '#f2f2f2',
    padding: 5,
    borderRadius: 10,
  },
  status: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: '600',
    alignSelf: 'center',
  },
  bottomView: {
    width: '90%',
    height: 60,
    borderRadius: 10,
    elevation: 5,
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  bottomIcon: {
    width: 30,
    height: 30,
  },
});
