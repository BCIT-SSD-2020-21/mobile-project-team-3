import React from 'react';
import MenuIcon from './MenuIcon';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import Login from '../../screens/Login';
import HomeScreen from '../../screens/HomeScreen';

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName='LoginScreen'>
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
