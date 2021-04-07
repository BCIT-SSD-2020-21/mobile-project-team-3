import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {TouchableOpacity } from 'react-native';

const PortfolioListScreen = ({ route, navigation }) => {
  const userPL = route.params;

  useEffect(() => {
    console.log('userPL on portfolioList screen>>>>', userPL);
  }, []);

  return (
    <View style={styles.container}>
       <TouchableOpacity
            style={styles.viewBtn}
            onPress={() => navigation.navigate('PortfolioDetailScreen', {symbol: "TSLA", numShares: 3, avgPrice: 111, PL: "+22" })}
          >
            <Text style={styles.viewBtnText}>View</Text>
          </TouchableOpacity>
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
