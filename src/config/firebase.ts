const env = process.env;

// const firebase = require('firebase');
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: env.API_KEY,
    authDomain: env.AUTH_DOMAIN,
    projectId: env.PROJECT_ID,
    storageBucket: env.STORAGE_BUCKET,
    messagingSenderId: '662196985552',
    appId: '1:662196985552:web:2a11ef912b69d593ec48d5'
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
