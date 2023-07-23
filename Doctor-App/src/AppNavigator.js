import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Welcome from './screens/Welcome';
import Login from './screens/Auth/Login';
import { AppContext } from './context/AppContext';

const Stack = createStackNavigator();
const AppNavigator = () => {
  const { userToken,isloading } = useContext(AppContext);

  if (isloading) <Text>Loading...</Text>;

  return (
    <NavigationContainer>
      {!userToken ? (
        <Stack.Navigator initialRouteName='Welcome'>
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

          {/* <Stack.Screen
            component={ForgotPass}
            name="ForgotPass"
            options={{ headerShown: false }}
          /> */}
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            component={Home}
            name="Home"
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
