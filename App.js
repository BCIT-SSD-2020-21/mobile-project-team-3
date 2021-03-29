import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Login></Login> */}
      <Register></Register>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#22343C',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
