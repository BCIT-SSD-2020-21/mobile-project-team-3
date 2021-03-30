import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import { Avatar } from 'react-native-elements';
import axios from 'axios';
import { FINNHUB_API } from '@env';

const SearchScreen = () => {
  const [input, setInput] = useState('');
  const [stocks, setStocks] = useState([]);
  const [quotes, setQuotes] = useState([])

  const searchAPI = async () => {
    // GET QUOTE
    try {
      const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${input}&token=${FINNHUB_API}`);
      console.log('API RESPONSE:', response.data)
      setQuotes(response.data);
    } catch (err) {
      console.log(err)
    }

    // SYMBOL LOOKUP
    // try {
    //   const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${input}&token=${FINNHUB_API}`);
    //   console.log('API RESPONSE:', response.data)
    //   setStocks(response.data)
    // } catch (err) {
    //   console.log(err)
    // }

  }

  // const onViewClicked = async () => {

  // }

  // useEffect(() => {
  //     searchAPI();
  // }, [])

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        input={input}
        onInputChange={(newInput) => setInput(newInput)}
        onInputSubmit={() => searchAPI()}
      />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={stocks}
        renderItem={({ item }) => {
          return (
            <View style={styles.listContainer}>
              <View style={styles.avatarTextContainer}>
                <Avatar
                  rounded
                  size="medium"
                  backgroundColor="#FF565E"
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
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  listContainer: {
    height: 60,
    marginVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#B8C2C0',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatarTextContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    marginLeft: '5%',
  },
  symbolText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffff',
  },
  changeText: {
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

export default SearchScreen;
