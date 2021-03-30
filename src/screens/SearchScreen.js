import React, {useState}from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';

const SearchScreen = () => {
  const [stock, setStock] = useState('')
  return (
    <View>
        <SearchBar
        stock={stock}
        onStockChange={(newStock) => setStock(newStock)}/>
    </View>
  );
}

const styles = StyleSheet.create({});

export default SearchScreen;