import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import base from '../styles/styles';

const HomeScreen = () => {
  return (
    <SafeAreaView style={base.container}>
      <Text>This is the home screen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
