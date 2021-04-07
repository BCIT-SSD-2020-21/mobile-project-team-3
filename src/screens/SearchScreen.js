import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import SearchBar from '../components/SearchBar';
import base from '../styles/styles';
import QuoteListItem from '../components/QuoteListItem';
import { getSymbolPrice } from '../api/finnhubNetwork';
import AsyncStorage from '@react-native-community/async-storage';
import { getUser } from '../../network';

const SearchScreen = ({ navigation }) => {
  const [input, setInput] = useState('');
  const [quote, setQuote] = useState({});
  const [user, setUser] = useState({})

  const searchAPI = async () => {
    // GET QUOTE
    const result = await getSymbolPrice(input);
    setQuote(result);
  };

  useEffect(() => {
    (async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        if (keys.length > 0) {
          const uid = await AsyncStorage.getItem(keys[0]);
          const currentUser = await getUser(JSON.parse(uid))
          setUser(currentUser);
        }
      } catch (err) {
        console.log('Error Getting Data', err);
      }
    })();
  }, [])

  return (
    <SafeAreaView style={base.container}>
      <SearchBar
        input={input}
        onInputChange={(newInput) => setInput(newInput)}
        onInputSubmit={() => searchAPI()}
      />
      <QuoteListItem
        user={user}
        input={input}
        quote={quote}
        navigation={navigation}
      ></QuoteListItem>
    </SafeAreaView>
  );
};

export default SearchScreen;
