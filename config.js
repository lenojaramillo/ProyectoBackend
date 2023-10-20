import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyCOtajlR4gWLghn_k6K4QkiOilm3Bdulpc",
  authDomain: "satm-proyecto-backfront.firebaseapp.com",
  projectId: "satm-proyecto-backfront",
  storageBucket: "satm-proyecto-backfront.appspot.com",
  messagingSenderId: "459208635120",
  appId: "1:459208635120:web:ddd463efc34702743dc835"
};

firebase.initializeAPP(firebaseConfig)
//const firebase = initializeApp(firebaseConfig)
const db = firebase.firestore()
const User = db.collection('Users') 

module.exports = User