import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import env from "./env.json";
import { LogBox } from "react-native";

// 特定のWARNINGを非表示する
// LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

const fireConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  databaseURL: env.FIREBASE_DB_URL,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE,
  messagingSenderId: env.FIREBASE_SENDER_ID,
  appId: env.FIREBASE_APP_ID
  // measurementId: env.FIREBASE_MEASUREMENT_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(fireConfig);
}

export default firebase;
