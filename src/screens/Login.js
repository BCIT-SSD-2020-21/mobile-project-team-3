import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <View style={styles.box}></View>
      <Text style={styles.header}>Welcome!</Text>
      <Text style={styles.subHeader}>Sign in to continue</Text>
      <View style={styles.inputView}>
        <View style={styles.userIconContainer}>
          <FontAwesome 
            name="user" 
            color="orange"
            size={20} 
          />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor="grey"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <View style={styles.lockIconContainer}>
          <FontAwesome 
            name="unlock" 
            color="red"
            size={20}
          />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="grey"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>Sign in</Text>
          <FontAwesome 
            name="sign-in" 
            color="white"
            size={20}
            style={{marginLeft: 20}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerBtn}>
          <Text style={styles.registerBtnText}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '100%'
  },
  loginBtnText: {
    color: 'white'
  },
  registerBtnText: {
    color: 'lightgreen'
  },
  loginBtn: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 60,
    marginBottom: 60,
    backgroundColor: 'lightgreen'
  },
  registerBtn: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 60,
    backgroundColor: 'rgba(144,238,144, 0.3)'
  },
  textInput: {
    color: 'white',
  },
  userIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 40,
    backgroundColor: 'rgba(255, 165, 0, 0.5)',
    borderRadius: 8,
    marginRight: 15
  },
  lockIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 40,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    borderRadius: 8,
    marginRight: 15

  },
  inputView: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 48,
  },
  subHeader: {
    color: 'grey',
    fontSize: 24,
    marginBottom: 50
  },
  box: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'lightgreen',
  },
})
