import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { loaclURL } from '../../connection/config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isConnected, setIsConnected] = useState(null);
  const [currentHeartRate, setCurrentHeartRate] = useState(null);
  const [currentBloodPresure, setCurrentBloodPresure] = useState(null);
  const [allDoctors, setAllDoctors] = useState([])
  const [apointments, setApointments] = useState([])




  const login = async (token) => {
    setIsLoading(true);
    setUserToken(token);
    AsyncStorage.setItem('userToken', token);
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem('userToken');

      const { data } = await axios.post(`${loaclURL}api/patient/get-user`, {
        token: userToken,
      });
      setUserDetails(data?.user);
      setUserToken(userToken);
      setIsLoading(false);
      getAllDoctor(userToken)
      getApointments(userToken)
    } catch (error) {
      console.log(error?.response?.data?.msg);
      setIsLoading(false);
    }
  };

  const isWatchConnected = () => {
    setIsLoading(true);
    setIsConnected({ succuess: true, uuid: 'BSW005' });
    setIsLoading(false);
  };

  const watchDisconnect = () => {
    setIsLoading(true);
    setIsConnected(null);
    setIsLoading(false);
  };

  const currentData = async () => {
    let heartRate = await AsyncStorage.getItem('heartRate');
    setCurrentHeartRate(heartRate);

    let bloodPresure = await AsyncStorage.getItem('bloodPresure');
    setCurrentBloodPresure(bloodPresure);
  };

  const updateDetails = async (
    profilePic,
    age,
    gender,
    bloodGroup,
    height,
    weight
  ) => {
    try {
      const { data } = await axios.post(
        `${loaclURL}api/patient/update-details`,
        {
          token: userToken,
          avtar: profilePic,
          age: age,
          gender,
          bloodGroup,
          height,
          weight,
        }
      );

      console.log('object', data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDoctor = async (token) => {
    try {
      setIsLoading(true)
      const {data} = await axios.post(`${loaclURL}api/doctor/all-doctor`, {token})
      setAllDoctors(data.doctors);
      setIsLoading(false)
    } catch (error) {
      console.log(error?.response.data);
    }
  }

  const getApointments = async (token) => {
    try {
      const {data} = await axios.post(`${loaclURL}api/apointment/view`, {token})
      setApointments([...data.reverse()])
    } catch (error) {
      console.log(error);
    }
  }

  
  useEffect(() => {
    isLoggedIn();
    currentData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        userToken,
        isLoading,
        userDetails,
        isWatchConnected,
        isConnected,
        watchDisconnect,
        currentHeartRate,
        currentBloodPresure,
        currentData,
        updateDetails,
        allDoctors,
        apointments,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
