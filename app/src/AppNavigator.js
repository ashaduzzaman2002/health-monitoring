import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Signup from './screens/Signup';

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Welcome}
          name="Welcome"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={Home}
          name="Home"
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
