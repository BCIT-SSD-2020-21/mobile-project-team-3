import React, {useState}from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const SearchBar = ({stock, onStockChange}) => {
    return (
        <View style={styles.background}>
            <EvilIcons style= {styles.icon} name="search"/>
            <TextInput
                value={stock}
                style={styles.input}
                placeholder="Search Stocks"
                onChangeText={newStock => onStockChange(newStock)}
                onSubmitEditing={() => onStockSubmit()} />
        </View>
    );

}


const styles = StyleSheet.create({
    background: {
      height: 50,
      borderRadius: 8,
      marginHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center'
    },
    input: {
        flex: 1
    },
    icon:{
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15
    }
  });
  
  export default SearchBar;