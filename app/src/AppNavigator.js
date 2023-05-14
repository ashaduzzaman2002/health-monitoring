import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Otp from './screens/Otp';
import { AuthContext } from './context/AppContext';
import ForgotPass from './screens/ForgotPass';
import MyWatch from './screens/MyWatch';
import HealthLogs from './screens/HealthLogs';
import Apointment from './screens/Apointment';
import Demo from './screens/Demo';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';

const Stack = createStackNavigator();
const AppNavigator = () => {
  const { isloading, userToken } = useContext(AuthContext);

  if (isloading) <Text>Loading...</Text>;
  return (
    <NavigationContainer>
      {userToken === null ? (
        <Stack.Navigator>
          <Stack.Screen
            component={Welcome}
            name="Welcome"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            component={Login}
            name="Login"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            component={Signup}
            name="Signup"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            component={ForgotPass}
            name="ForgotPass"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            component={Otp}
            name="Otp"
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            component={Home}
            name="Home"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            component={MyWatch}
            name="MyWatch"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            component={HealthLogs}
            name="HealthLog"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            component={Apointment}
            name="Apointment"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            component={Demo}
            name="Demo"
            options={{ headerShown: false }}
          />

<Stack.Screen
            component={Profile}
            name="Profile"
            options={{ headerShown: false }}
          />

<Stack.Screen
            component={EditProfile}
            name="EditProfile"
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
