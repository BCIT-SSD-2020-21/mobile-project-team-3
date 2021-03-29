import { FIREBASE_API } from 'dotenv';

var firebaseConfig = {
  apiKey: FIREBASE_API,
  authDomain: 'robdemgood.firebaseapp.com',
  projectId: 'robdemgood',
  storageBucket: 'robdemgood.appspot.com',
  messagingSenderId: '348118800335',
  appId: '1:348118800335:web:7e16a3461333f6debda4ba',
};

firebase.initializeApp(firebaseConfig);
