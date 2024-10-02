import { initializeApp } from 'firebase/app';
import { getFirestore ,collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx8I28UknUGdKi8wI9lMZjYD1CqPQ7i0Y",
  authDomain: "library-40763.firebaseapp.com",
  projectId: "library-40763",
  storageBucket: "library-40763.appspot.com",
  messagingSenderId: "866593721099",
  appId: "1:866593721099:web:4b307b4b00e31d7756f00e",
  measurementId: "G-0FRH1LY9TC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, collection, auth };



