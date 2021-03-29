import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import { FontAwesome } from '@expo/vector-icons';
import GlobalNavigator from './GlobalNavigator';
import UserNavigator from './UserNavigator';
import WatchScreen from '../../screens/WatchScreen';
import SearchScreen from '../../screens/SearchScreen';

const BottomTab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <BottomTab.Navigator initialRouteName='Home'>
      <BottomTab.Screen
        name='Watch'
        component={WatchScreen}
        options={{
          tabBarIcon: () => <FontAwesome name='bell' size={30} />,
        }}
      />
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{ tabBarIcon: () => <FontAwesome name='home' size={30} /> }}
      />
      <BottomTab.Screen
        name='Search'
        component={SearchScreen}
        options={{ tabBarIcon: () => <FontAwesome name='search' size={30} /> }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNav;
