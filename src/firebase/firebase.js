import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD1Ym7ReHNqD4wpkEdEzrcbrmCfRrI-jB4",
  authDomain: "authentication-in-react-91e1c.firebaseapp.com",
  projectId: "authentication-in-react-91e1c",
  storageBucket: "authentication-in-react-91e1c.appspot.com",
  messagingSenderId: "977786452075",
  appId: "1:977786452075:web:066602a8d9f72a0dfa192e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app)
export default app