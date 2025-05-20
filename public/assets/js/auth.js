// Firebase Configuração
const firebaseConfig = {
  apiKey: "AIzaSyBWF1lQmxzD6mLyGXb9HQNb0K3tu0rISJc",
  authDomain: "campo-vivo-website.firebaseapp.com",
  projectId: "campo-vivo-website",
  storageBucket: "campo-vivo-website.appspot.com",
  messagingSenderId: "822937869123",
  appId: "1:822937869123:web:d4823250ac2f802992adf6",
  measurementId: "G-19Y3XLPGF3"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Captura o formulário
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      // Redireciona para o painel se login for bem-sucedido
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      // Mostra mensagem de erro
      let msg = "E-mail ou senha incorretos.";
      if (error.code === "auth/user-not-found") msg = "Usuário não encontrado.";
      if (error.code === "auth/wrong-password") msg = "Senha incorreta.";
      if (error.code === "auth/invalid-email") msg = "E-mail inválido.";
      errorMessage.textContent = msg;
      errorMessage.classList.remove("hidden");
    });
});