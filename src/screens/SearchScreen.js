import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import base from '../styles/styles';

const SearchScreen = () => {
  return (
    <SafeAreaView style={base.container}>
      <Text>This is the search screen</Text>
    </SafeAreaView>
  );
};

export default SearchScreen;
