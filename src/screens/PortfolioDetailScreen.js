import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {TouchableOpacity } from 'react-native';

const PortfolioDetailScreen = ({ route }) => {
    const { symbol, numShares, avgPrice, PL } = route.params;


    return (
      <View style={styles.container}>
         <Text>Detail Screen</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    padding: 40,
    backgroundColor: '#22343C',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

export default PortfolioDetailScreen;
