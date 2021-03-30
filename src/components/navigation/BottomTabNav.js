import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import WatchScreen from '../../screens/WatchScreen';
import SearchScreen from '../../screens/SearchScreen';
import HomeNavigator from './HomeNavigator';

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
        component={HomeNavigator}
        options={{
          tabBarIcon: () => <FontAwesome5 name='comment-dollar' size={30} />,
        }}
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
