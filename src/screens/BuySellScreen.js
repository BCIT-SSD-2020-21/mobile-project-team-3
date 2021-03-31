import React from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity} from 'react-native';
import { LineChart } from 'react-native-chart-kit'

const BuySellScreen = () => {
    const line = {
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
          },
        ],
      };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
        <Text style={styles.symbolHeader}>Symbol</Text>
        <Text style={styles.priceHeader}>-0.02</Text>
        </View>
        <View>
 
  <LineChart
    data={line}
    width={Dimensions.get('window').width -80}
    height={220}
    chartConfig={{
      backgroundColor: '#30444E',
      backgroundGradientFrom: '#30444E',
      backgroundGradientTo: '#30444E',
      decimalPlaces: 2,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    }}
    style={{
      marginVertical: '5%',
      padding: '5%',
      borderRadius: 16
    }}
  />
</View>

<View style={styles.btnContainer}>
    <Text style={styles.text}>Buy</Text>
    <TouchableOpacity 
            style={styles.filterBtn} 
            onPress={() => onInputSubmit()}>
                <AntDesign
                name="arrowdown"
                color="white"
                size={40}
                />
                </TouchableOpacity>
</View>
<View style={styles.btnContainer}>
    <Text style={styles.text}>Sell</Text>
    <TouchableOpacity 
            style={styles.filterBtn} 
            onPress={() => onInputSubmit()}>
                
                <AntDesign 
                name="arrowup"
                color="white"
                size={40}
                />
                </TouchableOpacity>
</View>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    padding: '10%',
    flexDirection: 'column',
    backgroundColor: '#22343C',
    },
    symbolHeader: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 48
      },
      text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40
      },
      priceHeader: {
        color: '#3DD598',
        fontSize: 48
      },
      headerContainer:{
          flexDirection: 'row',
          justifyContent:'space-between'
      },
      btnContainer:{
          flexDirection: 'row',
          backgroundColor: '#30444E',
          borderRadius: 16,
          justifyContent: 'space-between',
          padding: 20,
          marginVertical: 10
      },
      filterBtn: {
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
        height: 60,
        backgroundColor: '#40DF9F',
        marginLeft: '10%'
    },
});

export default BuySellScreen;
