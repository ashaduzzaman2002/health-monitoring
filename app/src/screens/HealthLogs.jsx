import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AppContext';
import Spinner from '../components/Spinner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { loaclURL } from '../../connection/config';
import { colors } from '../global/styles';

const HealthLogs = ({ navigation }) => {
  const {
    userToken,
    isLoading,
    userDetails,
    currentHeartRate,
    currentBloodPresure,
  } = useContext(AuthContext);
  const [healdhData, setHealthData] = useState([]);
  const [todaysData, setTodaysData] = useState([]);
  const [highestHeartrate, setHighestHeartrate] = useState(0);
  const [highestBloodPresure, setHighestBloodPresure] = useState(0);
  const [lowestHeartrate, setLowestHeartrate] = useState(0);
  const [lowestBloodPresure, setLowestBloodPresure] = useState(0);

  const getData = async () => {
    try {
      const { data } = await axios.post(`${loaclURL}api/smart-watch/data/get`, {
        token: userToken,
      });

      setHealthData(data.data)

      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

      // Filter the data array to include entries from the last 24 hours
      const last24Hours = data.data.filter((entry) => {
        const entryTime = new Date(entry.time);
        return entryTime >= twentyFourHoursAgo;
      });

      setTodaysData(last24Hours);

      console.log(last24Hours);
      if (last24Hours?.length) {
        const maxHeartRate = last24Hours.reduce((max, obj) => {
          const heartRate = parseInt(obj.heartRate);
          return heartRate > max ? heartRate : max;
        }, 0);

        setHighestHeartrate(maxHeartRate);

        const maxBloodPressure = last24Hours.reduce((max, obj) => {
          const bloodPressure = parseInt(obj.bloodPresure);
          return bloodPressure > max ? bloodPressure : max;
        }, 0);

        setHighestBloodPresure(maxBloodPressure);

        const lowestHeartRate = last24Hours.reduce((min, obj) => {
          const heartRate = parseInt(obj.heartRate);
          return heartRate < min ? heartRate : min;
        }, Infinity);

        setLowestHeartrate(lowestHeartRate);

        const lowestBloodPressure = last24Hours.reduce((min, obj) => {
          const bloodPressure = parseInt(obj.bloodPresure);
          return bloodPressure < min ? bloodPressure : min;
        }, Infinity);

        setLowestBloodPresure(lowestBloodPressure);
      } else {
        setHighestHeartrate(currentHeartRate);
        setLowestHeartrate(currentHeartRate);
        setHighestBloodPresure(currentBloodPresure);
        setLowestBloodPresure(currentBloodPresure);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Header
        userDetails={userDetails}
        title={'Health Logs'}
        icon={require('../images/back.png')}
        navigation={navigation}
      />

      <SafeAreaView style={styles.container}>
        {!healdhData.length ? (
          <Spinner />
        ) : (
          <View>
            <View>
              <Text style={styles.heading}>Current</Text>

              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-around',
                }}
              >
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 30, fontWeight: '500' }}>
                    {currentHeartRate || 0}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'gray',
                      marginTop: -5,
                      fontWeight: '600',
                    }}
                  >
                    Heart rate
                  </Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 30, fontWeight: '500' }}>
                    {currentBloodPresure || 0}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'gray',
                      marginTop: -5,
                      fontWeight: '600',
                    }}
                  >
                    Blood Presure
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 20, marginTop: 20, fontWeight: '500' }}>
                More info
              </Text>
              <Text style={{ fontSize: 14, color: 'gray' }}>
                Today's highest
              </Text>
              <View style={styles.cardGroup}>
                <View style={[styles.card, { backgroundColor: '#FF5B5B' }]}>
                  <Text style={styles.cardNumber}>{highestHeartrate}</Text>
                  <Text style={styles.cardTxt}>Heart rate</Text>
                </View>

                <View style={[styles.card, { backgroundColor: '#038D00' }]}>
                  <Text style={styles.cardNumber}>{highestBloodPresure}</Text>
                  <Text style={styles.cardTxt}>Blood presure</Text>
                </View>
              </View>

              <Text style={{ fontSize: 14, color: 'gray', marginTop: 10 }}>
                Today's lowest
              </Text>
              <View style={styles.cardGroup}>
                <View style={[styles.card, { backgroundColor: '#E17000' }]}>
                  <Text style={styles.cardNumber}>{lowestHeartrate}</Text>
                  <Text style={styles.cardTxt}>Heart rate</Text>
                </View>

                <View style={[styles.card, { backgroundColor: '#0074A9' }]}>
                  <Text style={styles.cardNumber}>{lowestBloodPresure}</Text>
                  <Text style={styles.cardTxt}>Blood presure</Text>
                </View>
              </View>
            </View>

            <View style={{ paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 20, marginTop: 20, fontWeight: '500' }}>
                Chart
              </Text>
              <View style={styles.chart}>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="stretch"
                  source={require('../images/bar-chart.png')}
                />
              </View>
            </View>
          </View>
        )}

        <Footer navigation={navigation} />
      </SafeAreaView>
    </>
  );
};

export default HealthLogs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  heading: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 10,
    color: colors.primary,
  },

  cardGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  card: {
    width: '48%',
    height: 85,
    justifyContent: 'center',
    paddingHorizontal: 11,
    alignItems: 'center',
    borderRadius: 10,
  },

  cardTxt: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.75)',
    marginBottom: 3.5,
  },

  cardNumber: {
    fontWeight: '600',
    fontSize: 26,
    lineHeight: 29,
    color: '#FFFFFF',
    marginTop: 3.5,
  },

  chart: {
    width: '100%',
    height: 180,
  },
});
