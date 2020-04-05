
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBaw4-KtRh4nZnSBfqW4jbmkruGZ_jB9pI",
    authDomain: "myfirstapp-bd655.firebaseapp.com",
    databaseURL: "https://myfirstapp-bd655.firebaseio.com",
    projectId: "myfirstapp-bd655",
    storageBucket: "myfirstapp-bd655.appspot.com",
    messagingSenderId: "36524473012",
    appId: "1:36524473012:web:7fd1a243290a443361f5e1",
    measurementId: "G-Y28FZBGDHY"
  };

  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();


