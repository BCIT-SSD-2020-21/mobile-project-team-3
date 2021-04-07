import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import base from '../styles/styles';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import UserModal from '../components/UserModal';
import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { getSymbolPrice } from '../api/finnhubNetwork';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const HomeScreen = ({ route, navigation }) => {
  const [user, setUser] = useState(route.params);
  const [modalVisible, setModalVisible] = useState(false);
  const [userPortfolio, setUserPortfolio] = useState([]);
  const [portfolioStats, setPortfolioStats] = useState(0);

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

  const getUserPortfolio = async () => {
    let portfolioPL = [];
    user.portfolio.forEach(async (item) => {
      //search API for item
      const quote = await getSymbolPrice(item.symbol);
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

      portfolioPL.push(portfolioItem);
    });
    return portfolioPL;
  };

  const formatMoney = (amt) => {
    const rounded = amt.toFixed(2);
    return rounded.toLocaleString();
  };

  const getPortfolioStats = (portfolio) => {
    let sumOfAllAvgPrice = 0;
    let sumOfAllCurrentPrice = 0;

    portfolio.forEach((item) => {
      console.log(`adding PL from ${item.PL}`);
      sumOfAllCurrentPrice += item.currentPrice;
      sumOfAllAvgPrice += item.avgPrice;
    });

    console.log('sum of avg prices', sumOfAllAvgPrice);
    console.log('sum of current prices', sumOfAllCurrentPrice);

    const portfolioStats = {
      marketValue: formatMoney(sumOfAllCurrentPrice),
      totalPLpercent: (
        (1 - sumOfAllCurrentPrice / sumOfAllAvgPrice) *
        100
      ).toFixed(2),
      totalPLdollars: formatMoney(sumOfAllCurrentPrice - sumOfAllAvgPrice),
    };

    console.log('portfolioStats Obj>>>>>', portfolioStats);
    return portfolioStats;
  };

  useEffect(() => {
    console.log('user received on homescreen>>>>', user);
    (async () => {
      const portfolioPL = await getUserPortfolio();
      setUserPortfolio(portfolioPL);
      const stats = getPortfolioStats(userPortfolio);
      setPortfolioStats(stats);
    })();
    //console.log('user portfolio>>>>>>>>>>>', userPL);
  }, []);

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
          {/* ========== P&L  ========= */}
          <View style={styles.pmContainer}>
            <View style={styles.PL}>
              <Text style={{ color: 'white', marginBottom: '10%' }}>
                <Foundation name='graph-trend' size={24} color='white' /> Profit
                &amp; Loss
              </Text>
              <Text style={base.headingSm}>P &amp; L Day</Text>
              <Text>${portfolioStats.totalPLdollars} CAD</Text>
              <Text>{portfolioStats.totalPLpercent}%</Text>
            </View>
            {/* ========== MARKET ========= */}
            <View style={styles.marketValue}>
              <Text style={{ color: 'white', marginBottom: '10%' }}>
                <FontAwesome5 name='money-check-alt' size={16} color='white' />{' '}
                Market Value
              </Text>
              <Text style={styles.headingSm}>Market Value</Text>
              <Text style={styles.headingSm}>Cash</Text>
              <Text>${user?.cash?.toLocaleString()}</Text>
            </View>
          </View>
          {/* ========== See Portfolio ========= */}

          <View style={styles.portfolioContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PortfolioListScreen', userPortfolio);
              }}
            >
              <Text style={base.headingSm}>See Portfolio Items</Text>
            </TouchableOpacity>
          </View>
          {/* ========== INVESTMENT HISTORY ========= */}
          {/* <View style={styles.summaryContainer}>
            <Text style={base.headingSm}>Investment History</Text>
          </View> */}
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
    minHeight: '100%',
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
  headingSm: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    alignSelf: 'center',
    margin: '5%',
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
