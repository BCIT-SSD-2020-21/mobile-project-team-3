import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import base from '../styles/styles';

const WatchScreen = () => {
  return (
    <SafeAreaView style={base.container}>
      <Text>This is the Watch screen</Text>
    </SafeAreaView>
  );
};

export default WatchScreen;
