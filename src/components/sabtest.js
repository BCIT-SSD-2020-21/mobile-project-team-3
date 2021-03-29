import React from 'react';
import firebase from 'firebase';

const sabtest = () => {
  const onLoginPressed = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        setPassword('');
        // navigate
        //navigation.navigate('UserDashboardScreen', user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };

  const onRegisterPressed = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        setPassword('');
        console.log('user>>', user);
        // navigate
        //navigation.navigate('UserDashboardScreen', user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('Error>>', errorMessage);
      });
  };

  return <div></div>;
};

export default sabtest;
