import React from 'react';
import MenuIcon from './MenuIcon';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import Login from '../../screens/Login';
import HomeScreen from '../../screens/HomeScreen';
import Register from '../../screens/Register';

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='RegisterScreen'
    >
      <HomeStack.Screen
        name='LoginScreen'
        component={Login}
        options={
          Platform.OS === 'android'
            ? {
                headerRight: () => <MenuIcon />,
              }
            : {
                headerTitle: 'User Login',
              }
        }
      />
      <HomeStack.Screen
        name='RegisterScreen'
        component={Register}
        options={
          Platform.OS === 'android'
            ? {
                headerRight: () => <MenuIcon />,
              }
            : {
                headerTItle: 'Register User',
              }
        }
      />
      <HomeStack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={
          Platform.OS === 'android'
            ? {
                headerRight: () => <MenuIcon />,
              }
            : {
                headerTitle: 'User Dashboard',
              }
        }
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
