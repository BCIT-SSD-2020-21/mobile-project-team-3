import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MenuIcon from './MenuIcon';
import WatchScreen from '../../screens/WatchScreen';
import SearchNavigator from './SearchNavigator';
import HomeNavigator from './HomeNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <Drawer.Navigator
      // drawerStyle={{
      //   backgroundColor: '#22343C'
      // }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeNavigator}
        options={{ headerTitle: 'Home', headerRight: () => <MenuIcon /> }}
      />
      <Drawer.Screen
        name="WatchList"
        component={WatchScreen}
        options={{ headerTitle: 'WatchList', headerRight: () => <MenuIcon /> }}
      />
      <Drawer.Screen
        name="Search"
        component={SearchNavigator}
        options={{ headerTitle: 'Search', headerRight: () => <MenuIcon /> }}
      />
    </Drawer.Navigator>
  );
}
