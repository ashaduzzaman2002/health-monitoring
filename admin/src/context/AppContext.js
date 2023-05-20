import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [allDoctors, setAllDoctors] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const [allApointments, setAllApointments] = useState([]);

  const login = (token) => {
    setIsLoading(true);
    setUserToken(token);
    localStorage.setItem('userToken', token);
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    localStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      let token = localStorage.getItem('userToken');
      setUserToken(token);
      allDoctor(token);
      allPatient(token);
      allApointment(token);
    } catch (error) {}
  };

  const allDoctor = async (token) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `http://localhost:8000/api/doctor/all-doctor`,
        { token }
      );
      setAllDoctors(data.doctors);
      setIsLoading(false);
    } catch (error) {
      console.log(error?.response.data);
    }
  };

  const allPatient = async (token) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `http://localhost:8000/api/admin/all-patients`,
        { token }
      );
      setAllPatients(data.patients);
      setIsLoading(false);
    } catch (error) {
      console.log(error?.response.data);
    }
  };

  const allApointment = async (token) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `http://localhost:8000/api/admin/all-apointments`,
        { token }
      );
      setAllApointments(data.apointments);
      setIsLoading(false);
    } catch (error) {
      console.log(error?.response.data);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AppContext.Provider
      value={{
        userToken,
        login,
        isLoading,
        logout,
        allDoctors,
        allPatients,
        allApointments,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
