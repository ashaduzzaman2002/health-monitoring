import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext,useEffect,useState  } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [userToken, setUserToken] = useState(null)

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
            setUserToken(userToken)
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
      isLoggedIn()
    }, [])
    

  return <AuthContext.Provider value={{login, logout, userToken, isLoading}}>{children}</AuthContext.Provider>;
};
