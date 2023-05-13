import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext,useEffect,useState  } from 'react';
import { loaclURL } from '../../connection/config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [userToken, setUserToken] = useState(null)
    const [userDetails, setUserDetails] = useState(null)

    const login = async (token) => {
        setIsLoading(true)
        setUserToken(token)
        AsyncStorage.setItem('userToken', token)
        setIsLoading(false)
    }

    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        AsyncStorage.removeItem('userToken')
        setIsLoading(false)
    }


    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            let userToken = await AsyncStorage.getItem('userToken')
            console.log(userToken);

            const {data} = await axios.post(`${loaclURL}api/patient/get-user`, {token: userToken})
            setUserDetails(data?.user);
            setUserToken(userToken)
            setIsLoading(false)
        } catch (error) {
            console.log(error?.response?.data?.msg);
            setIsLoading(false)
        }
        
    }

    useEffect(() => {
      isLoggedIn()
    }, [])
    

  return <AuthContext.Provider value={{login, logout, userToken, isLoading, userDetails}}>{children}</AuthContext.Provider>;
};
