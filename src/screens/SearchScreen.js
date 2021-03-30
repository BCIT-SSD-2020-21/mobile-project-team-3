import React, {useState}from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import finnhub from '../api/finnhub'

const SearchScreen = () => {
  const [stock, setStock] = useState('')
  return (
    <View>
        <SearchBar
        stock={stock}
        onStockChange={(newStock) => setStock(newStock)}
        onStockSubmit={() => searchApi()}/>
    </View>
  );
}

//api calls
const searchApi = async () => {
  const response = await finnhub.get('/webhook', {
      params: {
        'event': 'earnings', 
        'symbol': 'AAPL'
      }
  });
}

const styles = StyleSheet.create({});

export default SearchScreen;