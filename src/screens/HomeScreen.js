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
        // Sign-out successful.
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
  userIcon: {},
});

export default HomeScreen;
