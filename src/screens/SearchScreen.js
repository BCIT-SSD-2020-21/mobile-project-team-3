import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, View, ScrollView, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar';
import { Avatar } from "react-native-elements";

const SearchScreen = () => {
    
    // const searchAPI = async () => {

    // }

    // const onViewClicked = async () => {

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
                <View style={styles.listContainer}>
                   
                    <View style={styles.avatarTextContainer}>
                    <Avatar
                    rounded
  size="medium"
  backgroundColor= "#FF565E"
  activeOpacity={0.7}
/>
<View style={styles.textContainer}>
            <Text style={styles.symbolText}>{item.symbol}</Text>
            <Text style={styles.changeText}>{item.change}</Text>
            </View>
            </View>
            <TouchableOpacity 
            style={styles.viewBtn} 
            // onPress={() => onViewClicked()}
            >
<Text style={styles.viewBtnText}>View</Text>
                </TouchableOpacity>
    
            </View>
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
          listContainer:{
            // height: 60,
            marginVertical: 10,
              borderBottomWidth: 2,
              borderBottomColor: "#B8C2C0",
              flexDirection: 'row',
              justifyContent: "space-between"
          },
          avatarTextContainer:{
            flexDirection: 'row',
          },
          textContainer:{
              marginLeft: '5%'
          },
          symbolText:{
            fontWeight: 'bold',
            color: '#ffff',
          },
          changeText:{
            fontSize: 12,
            color: '#FF565E',
          },
          viewBtn: {
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '20%',
            height: 30,
            backgroundColor: '#40DF9F',
            marginLeft: '10%',
        },
        viewBtnText: {
            fontWeight: 'bold',
            color: 'white',
          },

    });
    
    export default SearchScreen