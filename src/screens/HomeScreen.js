import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import base from '../styles/styles';

const HomeScreen = ({ route }) => {
  const user = route.params;

  return (
    <SafeAreaView style={base.container}>
      <Text style={{ color: 'white' }}>Welcome, {user.email}! </Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
