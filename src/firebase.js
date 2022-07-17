import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDE13aWhNIUJQqvGyeozDrG2CITMN04D38",
  authDomain: "reels-app-30417.firebaseapp.com",
  projectId: "reels-app-30417",
  storageBucket: "reels-app-30417.appspot.com",
  messagingSenderId: "1039743840969",
  appId: "1:1039743840969:web:204acc04ab079d7fef1318"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();

export const database = {
    users:firestore.collection("users"),
    getTimeStamp:firebase.firestore.FieldValue.serverTimestamp,
    posts:firestore.collection("posts"),
    comments:firestore.collection("comments")
}

export const storage = firebase.storage();