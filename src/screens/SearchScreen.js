import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, View, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar } from "react-native-elements";

const SearchScreen = () => {
    
    
    // const searchAPI = async () => {

    // }

  
    
    // useEffect(() => {
    //     searchAPI();
    // }, [])
    
    const stokes = [
        { symbol: "GOOGL", change: -.01 },
        { symbol: "TSLA", change: +.01 }, 
        { symbol: "RBA", change: -.02},
        { symbol: "LMT", change: -.07 }
    ]
    
    return (
    <SafeAreaView style={styles.container}>
        <FlatList
        keyExtractor={stock => stock.symbol}
        data={stokes}
        renderItem={({ item }) => {
            return (
                
            <Text style={styles.symbolText}>{item.symbol}</Text>
    
            )
        }}
        />
        </SafeAreaView>
        );
    }
    
    const styles = StyleSheet.create({
        container: {
            width: '100%',
          },
          symbolText:{
            fontWeight: 'bold',
            color: '#ffff',
          },

    });
    
    export default SearchScreen