import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext } from 'react';
import Header from '../components/Header';
import { AuthContext } from '../context/AppContext';
import Footer from '../components/Footer';
import { colors } from '../global/styles';

const MyWatch = ({ navigation }) => {
  const {
    isLoading,
    userDetails,
    isConnected,
    isWatchConnected,
    watchDisconnect,
  } = useContext(AuthContext);
  

  if (isLoading) {
    return <Spinner />;
  }

 

  return (
    <SafeAreaView style={styles.container}>
      <Header
        userDetails={userDetails}
        title={'My Watch'}
        icon={require('../images/back.png')}
        navigation={navigation}
      />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.banner}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('../images/smart-watch-big.png')}
          />
        </View>
        {!isConnected ? (
          <TouchableOpacity onPress={isWatchConnected} style={styles.btnout}>
            <Text style={styles.btn}>Connect</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 25, fontWeight: '500' }}>
              {isConnected?.uuid}
            </Text>
            <Text style={{ color: 'gray' }}>Watch is conneted</Text>

            <TouchableOpacity
              onPress={watchDisconnect}
              style={{ marginTop: 10 }}
            >
              <Image
                style={{ width: 40, height: 40 }}
                source={require('../images/switch.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Demo')} style={{marginTop: 10, padding: 10}}>
              <Text>Demo</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};

export default MyWatch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  mainContainer: {
    paddingHorizontal: 20,
  },

  banner: {
    width: '100%',
    height: 190,
    marginVertical: 30,
    marginLeft: 10,
  },

  image: {
    width: '100%',
    height: '100%',
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
});
