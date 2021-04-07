import React, { useEffect } from 'react';
import { Text, StyleSheet, FlatList, SafeAreaView, View, TouchableOpacity } from 'react-native';
import {Avatar} from 'react-native-elements';

const PortfolioListScreen = ({ route, navigation }) => {
  const userPL = route.params;
  // const {PL, avgPrice, currentPrice, numShares, symbol} = route.params;
  
  useEffect(() => {
    console.log('userPL on portfolioList screen>>>>', userPL);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Portfolio List</Text>
      <FlatList
        data={userPL}
        keyExtractor= {item => item.symbol}
        renderItem={({item}) =>{
          return <View flexDirection='row'>
            <Avatar
              rounded
              size="medium"
              title={item.symbol}
              titleStyle={{ fontSize: 15, fontWeight: 'bold' }}
              backgroundColor="#FF565E"
              activeOpacity={0.7}
            />
            <Text style={styles.flatText}>Number of Shares: {item.numShares}</Text>

            <TouchableOpacity
            style={styles.viewBtn}
            // onPress={() => navigation.navigate('PortfolioDetailScreen', {PL: item.PL, avgPrice: avgPrice, currentPrice: currentPrice, numShares: numShares, symbol: symbol  })} 
            >
            <Text 
            style={styles.viewBtnText}
            
            >View</Text>
          </TouchableOpacity>
            </View>
        }}
      />
    </SafeAreaView>
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
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 20,
      },
  flatText:{
    color: 'white',
    fontSize: 20,
    paddingTop: 10,
  }
});

export default PortfolioListScreen;
