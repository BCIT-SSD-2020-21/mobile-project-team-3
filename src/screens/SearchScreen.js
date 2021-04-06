import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import SearchBar from '../components/SearchBar';
import base from '../styles/styles';
import QuoteListItem from '../components/QuoteListItem';
import { getSymbolPrice } from '../api/finnhubNetwork';

const SearchScreen = ({ navigation }) => {
  const [input, setInput] = useState('');
  const [quote, setQuote] = useState({});

  const searchAPI = async () => {
    // GET QUOTE
    const result = await getSymbolPrice(input);
    setQuote(result);
  };

  return (
    <SafeAreaView style={base.container}>
      <SearchBar
        input={input}
        onInputChange={(newInput) => setInput(newInput.toUpperCase())}
        onInputSubmit={() => searchAPI()}
      />
      <QuoteListItem
        input={input}
        quote={quote}
        navigation={navigation}
      ></QuoteListItem>
    </SafeAreaView>
  );
};

export default SearchScreen;
