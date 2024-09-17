import { initializeApp } from "firebase/app";
import { initializeAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
  apiKey: "AIzaSyDcBDqLPHyRsdqqkbA5O9cF48GLwaE4f7A",
  projectId: "react-native-c3cf5",
  authDomain: "react-native-c3cf5.firebaseapp.com",
  appId: "1:1024110346820:android:18cc0d4ad3ff62f51b3211",
  storageBucket: "react-native-c3cf5.appspot.com",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
});
const storage = getFirestore(app);
const db = getFirestore(app);
export { auth, app, db, storage };
