import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import base from '../styles/styles';
import { getUser, removeFromWatchlist } from '../../network';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native'

export default function WatchScreen({ navigation }) {
  const [user, setUser] = useState({});
  const isFocused = useIsFocused();
  const [removed, setRemoved] = useState(false)

  async function removeQuote(uid, symbol, price) {
    const response = await removeFromWatchlist({ uid, symbol, price });
    setRemoved(true)
    console.log('Response From QLI:', response)
  }

  useEffect(() => {
    (async () => {
      setRemoved(false);
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
  }, [isFocused, removed])

  return (
    <SafeAreaView style={base.container}>
      <FlatList
        data={user.watchlist}
        renderItem={({ item }) => {
          return (
            <View style={styles.listContainer}>
              <>
                <View style={styles.avatarTextContainer}>
                  <Avatar
                    rounded
                    size="medium"
                    title={item.symbol}
                    titleStyle={{ fontSize: 15, fontWeight: 'bold' }}
                    backgroundColor="#FF565E"
                    activeOpacity={0.7}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.symbolText}>${item.price}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.viewBtn}
                  onPress={() => removeQuote(user.uid, item.symbol, item.price)}
                >
                  <Text style={styles.viewBtnText}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.viewBtn}
                  onPress={() => navigation.navigate('BuySellScreen', {symbol: item.symbol, price: item.price})}
                >
                  <Text style={styles.viewBtnText}>View</Text>
                </TouchableOpacity>
              </>
          </View>
          )
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  quoteActions: {
    display: 'flex',
    flexDirection: 'row'
  },
  listContainer: {
    height: 60,
    marginVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#B8C2C0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  avatarTextContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    marginLeft: '5%',
    justifyContent: 'center'
  },
  symbolText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffff',
  },
  viewBtn: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '24%',
    height: 30,
    backgroundColor: '#40DF9F',
  },
  viewBtnText: {
    fontWeight: 'bold',
    color: 'white',
  },
});
