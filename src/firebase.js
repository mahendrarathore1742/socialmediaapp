import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "Your Key",
  authDomain: "Your Domain",
  projectId: "Your project id",
  storageBucket: "Your firebase storage",
  messagingSenderId: "Your firebase Message",
  appId: "Your App ID"
};


const firebaseApp = firebase.default.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage };
