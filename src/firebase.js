import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDU3h6CJJ9G1x5FQS9zC-TFXwkZ1RJ-aO4",
    authDomain: "crystal-17354.firebaseapp.com",
    databaseURL: "https://crystal-17354.firebaseio.com",
    projectId: "crystal-17354",
    storageBucket: "crystal-17354.appspot.com",
    messagingSenderId: "1033092807307",
    appId: "1:1033092807307:web:dd44c65d7e85f88749328e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()