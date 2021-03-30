import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebaseConfig from './src/api/firebase';
import firebase from 'firebase/app';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import SearchScreen from './src/screens/SearchScreen';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  console.log(firebase);
  return (
    <View style={styles.container}>
      {/* <Login></Login> */}
      {/* <Register></Register> */}
      <SearchScreen></SearchScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#22343C',
    alignItems: 'flex-start',
    // justifyContent: 'center',
  },
});
