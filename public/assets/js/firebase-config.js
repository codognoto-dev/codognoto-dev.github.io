import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc,
  getDocs, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBWF1lQmxzD6mLyGXb9HQNb0K3tu0rISJc",
  authDomain: "campo-vivo-website.firebaseapp.com",
  projectId: "campo-vivo-website",
  storageBucket: "campo-vivo-website.appspot.com",
  messagingSenderId: "822937869123",
  appId: "1:822937869123:web:d4823250ac2f802992adf6",
  measurementId: "G-19Y3XLPGF3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Adicione getDocs aos exports
export { db, collection, addDoc, getDocs, serverTimestamp };