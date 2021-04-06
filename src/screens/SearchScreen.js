import React, { useState } from 'react';
import {
  SafeAreaView,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import { FINNHUB_API } from '@env';
import base from '../styles/styles';
import QuoteListItem from '../components/QuoteListItem';
import { getQuote } from '../../network';

const SearchScreen = ({ navigation }) => {
  const [input, setInput] = useState('');
  const [quote, setQuote] = useState({});

  const searchAPI = async () => {
    // GET QUOTE
    const response = await getQuote(input, FINNHUB_API)
    setQuote(response);

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
