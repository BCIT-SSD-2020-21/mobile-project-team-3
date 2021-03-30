import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import base from '../styles/styles';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import UserModal from '../components/UserModal';
import firebase from 'firebase';

const HomeScreen = ({ route, navigation }) => {
  const user = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('Logout successful');
        navigation.navigate('LoginScreen');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('Error>>', errorMessage);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <UserModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        handleLogOut={handleLogOut}
        user={user}
      />
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
      {/* ========== INVESTMENT HISTORY ========= */}
      <View style={styles.summaryContainer}>
        <Text style={base.headingSm}>Investment History</Text>
      </View>
    </SafeAreaView>
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
});

export default HomeScreen;
