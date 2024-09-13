import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCD27KdxOx9ouRits7z00sqwPEEn8Zu69Y",
  authDomain: "todo-list-app-1425.firebaseapp.com",
  projectId: "todo-list-app-1425",
  storageBucket: "todo-list-app-1425.appspot.com",
  messagingSenderId: "194989590426",
  appId: "1:194989590426:web:12db7f9a68058e75a49c23",
  measurementId: "G-H6V62MHF94"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
