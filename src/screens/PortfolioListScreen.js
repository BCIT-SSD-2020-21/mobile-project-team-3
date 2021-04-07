import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PortfolioListScreen = ({ route }) => {
  const userPortfolio = route.params;

  useEffect(() => {
    console.log('userPortfolio on portfolioList screen>>>>', userPortfolio);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Portfolio List Screen</Text>
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

export default PortfolioListScreen;
