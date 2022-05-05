import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyD01fCvb0JfhopAMoN3NLJupHmM7F74jj8",
  authDomain: "teddys-9f474.firebaseapp.com",
  databaseURL:
    "https://teddys-9f474-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "teddys-9f474",
  storageBucket: "teddys-9f474.appspot.com",
  messagingSenderId: "449415977332",
  appId: "1:449415977332:web:7887025540be60bcfb3421",
  measurementId: "G-1N21B99WLV",
};

const app = initializeApp(firebaseConfig);

export const firebase = getDatabase(app);
export const auth = getAuth();