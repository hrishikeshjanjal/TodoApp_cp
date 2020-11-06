// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyATPgWvxJ_v4B_L6I4MbDHEV9EYWIc47aA",
  authDomain: "todo-app-cp-7510b.firebaseapp.com",
  databaseURL: "https://todo-app-cp-7510b.firebaseio.com",
  projectId: "todo-app-cp-7510b",
  storageBucket: "todo-app-cp-7510b.appspot.com",
  messagingSenderId: "485050024490",
  appId: "1:485050024490:web:6eda9f48b26a6a3a78f953",
  measurementId: "G-9M4BF6QNV6",
});

const db = firebase.firestore();

export default db;
// or export {db};
