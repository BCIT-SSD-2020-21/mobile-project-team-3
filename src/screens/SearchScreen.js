import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import { FINNHUB_API } from '@env';
import base from '../styles/styles';
import QuoteListItem from '../components/QuoteListItem';
import AsyncStorage from '@react-native-community/async-storage';

const SearchScreen = ({ navigation }) => {
  const [input, setInput] = useState('');
  const [quote, setQuote] = useState({});

  const searchAPI = async () => {
    // GET QUOTE
    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${input}&token=${FINNHUB_API}`
      );
      console.log('API RESPONSE:', response.data);
      setQuote(response.data);
    } catch (err) {
      console.log(err);
    }

    // SYMBOL LOOKUP
    // try {
    //   const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${input}&token=${FINNHUB_API}`);
    //   console.log('API RESPONSE:', response.data)
    //   setStocks(response.data)
    // } catch (err) {
    //   console.log(err)
    // }
  };

  // const onViewClicked = async () => {

  // }

  useEffect(() => {
    (async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        if (keys.length > 0) {
          let currentUser = await AsyncStorage.getItem(keys[0]);
          currentUser = JSON.parse(currentUser)
          console.log('User:', currentUser.providerData[0].uid)
          console.log('User UID:', uid)
        }
      } catch (err) {
        console.log('Error Getting Data', err)
      }
      // try {
      //   await AsyncStorage.clear()
      //   alert('Storage successfully cleared!')
      // } catch (e) {
      //   alert('Failed to clear the async storage.')
      // }
      // try {
      //   const uid = await AsyncStorage.getItem('nick@nick.com')
      //   console.log('User UID:', uid)
      // } catch (err) {
      //   console.log('Error Getting Data', err)
      // }
    })();
  }, [])

  return (
    <SafeAreaView style={base.container}>
      <SearchBar
        input={input}
        onInputChange={(newInput) => setInput(newInput)}
        onInputSubmit={() => searchAPI()}
      />
      <QuoteListItem input={input} quote={quote} navigation={navigation}></QuoteListItem>
    </SafeAreaView>
  );
};

export default SearchScreen;
