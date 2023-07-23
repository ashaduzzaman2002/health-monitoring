import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { loaclURL } from '../../connection/config';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [apointments ,setApointments] = useState([])

  const login = async (token) => {
    setIsLoading(true);
    setUserToken(token);
    AsyncStorage.setItem('userToken', token);
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem('userToken');
      const { data } = await axios.post(`${loaclURL}api/doctor/get-doctor`, {
        token: userToken,
      });

      setUserDetails(data?.user);
      setUserToken(userToken);
      setIsLoading(false);
        getApointments(userToken)
    } catch (error) {
      console.log({error: error?.response?.data?.msg});
      setIsLoading(false);
    }
  };

  const getApointments = async (token) => {
    try {
      const {data} = await axios.post(`${loaclURL}api/apointment/view`, {token, doctorEmail: userDetails.email})
      setApointments(data)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AppContext.Provider
      value={{ login, isLoading, logout, userToken, userDetails, apointments }}
    >
      {children}
    </AppContext.Provider>
  );
};
