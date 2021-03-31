import React from 'react';
import MenuIcon from './MenuIcon';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import SearchScreen from '../../screens/SearchScreen';
import BuySellScreen from '../../screens/BuySellScreen';

const SearchStack = createStackNavigator();

const SearchNavigator = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{ headerShown: true }}
      initialRouteName='SearchScreen'
    >
      <SearchStack.Screen
        name='SearchScreen'
        component={SearchScreen}
        options={
          Platform.OS === 'android'
            ? {
                headerRight: () => <MenuIcon />,
              }
            : {
                headerTitle: 'Search',
              }
        }
      />
      <SearchStack.Screen
        name='BuySellScreen'
        component={BuySellScreen}
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
    </SearchStack.Navigator>
  );
};

export default SearchNavigator;
