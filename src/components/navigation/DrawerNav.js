import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../screens/HomeScreen';
import MenuIcon from './MenuIcon';
import WatchScreen from '../../screens/WatchScreen';
import SearchScreen from '../../screens/SearchScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name='Home'
        component={HomeScreen}
        options={{ headerTitle: 'Home', headerRight: () => <MenuIcon /> }}
      />
      <Drawer.Screen
        name='WatchList'
        component={WatchScreen}
        options={{ headerTitle: 'WatchList', headerRight: () => <MenuIcon /> }}
      />
      <Drawer.Screen
        name='Search'
        component={SearchScreen}
        options={{ headerTitle: 'Search', headerRight: () => <MenuIcon /> }}
      />
    </Drawer.Navigator>
  );
}
