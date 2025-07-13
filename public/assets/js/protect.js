// public/assets/js/protect.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Configuração do Firebase (mesma do seu firebase-config.js)
const firebaseConfig = {
  apiKey: "AIzaSyBWF1lQmxzD6mLyGXb9HQNb0K3tu0rISJc",
  authDomain: "campo-vivo-website.firebaseapp.com",
  projectId: "campo-vivo-website",
  storageBucket: "campo-vivo-website.appspot.com",
  messagingSenderId: "822937869123",
  appId: "1:822937869123:web:d4823250ac2f802992adf6",
  measurementId: "G-19Y3XLPGF3"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Verificar se o usuário está logado
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Usuário não está logado, redirecionar para a página de login
    window.location.href = "login.html";
  }
});