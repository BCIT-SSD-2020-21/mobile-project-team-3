import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import base from '../styles/styles';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import UserModal from '../components/UserModal';
import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { getSymbolPrice } from '../api/finnhubNetwork';
import { getUser } from '../../network';
import { useIsFocused } from '@react-navigation/native'

const HomeScreen = ({ route, navigation }) => {
  const [user, setUser] = useState(route.params)
  const [modalVisible, setModalVisible] = useState(false);
  const [userPL, setUserPL] = useState([]);
  const isFocused = useIsFocused();

  const handleLogOut = async () => {
    try {
      await firebase.auth().signOut();
      try {
        await AsyncStorage.clear();
        alert('Storage successfully cleared!');
      } catch (e) {
        console.log(e);
        alert('Failed to clear the async storage.');
      }
      console.log('Logout successful');
      navigation.navigate('LoginScreen');
    } catch (err) {
      // var errorCode = error.code;
      var errorMessage = error.message;
      console.log('Error>>', errorMessage);
    }
  };

  const getUserProfitLoss = async () => {
    let userPortfolio = [];
    user.portfolio.forEach(async (item) => {
      //search API for item
      const quote = await getSymbolPrice(item.symbol);
      console.log(`Quote for ${item.symbol} >>> ${quote.c}`);
      //calculate P/L using average price
      const profitOrLoss = quote.c - item.avgPrice;

      //create object and push to userPL array
      const portfolioItem = {
        symbol: item.symbol,
        numShares: item.numShares,
        avgPrice: item.avgPrice,
        currentPrice: quote.c,
        PL: profitOrLoss,
      };

      userPortfolio.push(portfolioItem);
    });
    return userPortfolio;
  };

  useEffect(() => {
    (async () => {
      const userPortfolio = await getUserProfitLoss();
      setUserPL(userPortfolio);
    })();
  }, [isFocused]);

  return (
    <>
      <UserModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        handleLogOut={handleLogOut}
        user={user}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.userIconContainer}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.userIcon}
            >
              <FontAwesome name='user' color='white' size={20} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={base.headingLg}>Your Porfolio</Text>
          </View>
          {/* ========== SUMMARY ========= */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryGraph}></View>
            <View>
              <Text style={base.headingSm}>Summary</Text>
            </View>
          </View>
          {/* ========== P&L / MARKET ========= */}
          <View style={styles.pmContainer}>
            <View style={styles.PL}>
              <Text style={base.headingSm}>P&L Day</Text>
            </View>
            <View style={styles.marketValue}>
              <Text style={base.headingSm}>Market Value</Text>
            </View>
          </View>
          {/* ========== See Portfolio ========= */}

          <View style={styles.portfolioContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PortfolioListScreen', userPL);
              }}
            >
              <Text style={base.headingSm}>See Portfolio Items</Text>
            </TouchableOpacity>
          </View>
          {/* ========== INVESTMENT HISTORY ========= */}
          <View style={styles.summaryContainer}>
            <Text style={base.headingSm}>Investment History</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    padding: 40,
    backgroundColor: '#22343C',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  scrollView: {
    margin: 0,
    padding: 0,
    width: '100%',
    paddingVertical: 0,
  },
  userIconContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  summaryContainer: {
    width: '100%',
    padding: 40,
    flexDirection: 'row',
    backgroundColor: '#30444E',
    borderRadius: 30,
    height: '25%',
    marginBottom: 15,
  },
  summaryGraph: {
    backgroundColor: '#FF575F',
    height: '100%',
    width: '35%',
    borderRadius: 50,
  },
  pmContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '30%',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  PL: {
    backgroundColor: '#3DD598',
    height: '100%',
    width: '45%',
    padding: 20,
    borderRadius: 15,
  },
  marketValue: {
    backgroundColor: '#FFC542',
    height: '100%',
    width: '45%',
    padding: 20,
    borderRadius: 15,
  },
  portfolioContainer: {
    width: '100%',
    padding: 40,
    flexDirection: 'row',
    backgroundColor: '#96A7AF',
    borderRadius: 30,
    height: '20%',
    marginBottom: 15,
  },
});

export default HomeScreen;
