import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDefi5Y5ABg_jlY3722RWqp_IHMJ3WzXas",
  authDomain: "todo-app-a1225.firebaseapp.com",
  projectId: "todo-app-a1225",
  storageBucket: "todo-app-a1225.appspot.com",
  messagingSenderId: "550093119110",
  appId: "1:550093119110:web:ac08407d9dd214d9ca3b07",
  measurementId: "G-J318YDF7ZK"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;



