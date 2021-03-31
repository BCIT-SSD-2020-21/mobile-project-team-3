import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';

export default function QuoteListItem({ quote, input, navigation }) {
  return (
    <View style={styles.listContainer}>
      {Object.keys(quote).length > 0 && (
        <>
          <View style={styles.avatarTextContainer}>
            <Avatar
              rounded
              size="medium"
              title={input}
              titleStyle={{ fontSize: 15, fontWeight: 'bold' }}
              backgroundColor="#FF565E"
              activeOpacity={0.7}
            />
            <View style={styles.textContainer}>
              <Text style={styles.symbolText}>Current Price: {quote.c}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.viewBtn}
            onPress={() => navigation.navigate('BuySellScreen', {symbol: input, price: quote.c})}
          >
            <Text style={styles.viewBtnText}>View</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
