// public/assets/js/formHandler.js
import { db, collection, addDoc, serverTimestamp } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('catalogoForm');
  const msgSucesso = document.getElementById('msgSucesso');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const loadingIcon = document.getElementById('loadingIcon');
  
  // Criar mensagem de erro dinamicamente
  let msgErro = document.getElementById('msgErro');
  if (!msgErro) {
    msgErro = document.createElement('div');
    msgErro.id = 'msgErro';
    msgErro.className = 'hidden mb-4 p-4 bg-red-100 text-red-700 rounded-lg';
    form.parentNode.insertBefore(msgErro, form.nextSibling);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    submitBtn.disabled = true;
    btnText.textContent = 'Enviando...';
    loadingIcon.classList.remove('hidden');

    try {
      // Validar campos
      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const estado = form.estado.value;
      const cidade = form.cidade.value.trim();
      const profissao = form.profissao.value.trim();

      if (!nome || !email || !estado || !cidade || !profissao) {
        throw new Error('Por favor, preencha todos os campos.');
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Por favor, insira um e-mail válido.');
      }

      // Enviar para Firestore
      await addDoc(collection(db, 'formularios_catalogo'), {
        nome,
        email,
        estado,
        cidade,
        profissao,
        data_envio: serverTimestamp()
      });

      // Feedback visual
      msgSucesso.classList.remove('hidden');
      msgErro.classList.add('hidden');
      form.reset();

      // Resetar selects
      document.getElementById('estado').selectedIndex = 0;
      document.getElementById('cidade').innerHTML = '<option value="">Selecione um estado primeiro</option>';
      document.getElementById('cidade').disabled = true;

      // Baixar catálogo após 500ms
      setTimeout(() => {
        window.open('public/assets/imagens/catalogo.pdf', '_blank');
      }, 500);

    } catch (error) {
      console.error('Erro:', error);
      msgErro.textContent = error.message;
      msgErro.classList.remove('hidden');
    } finally {
      submitBtn.disabled = false;
      btnText.textContent = 'Baixar Catálogo';
      loadingIcon.classList.add('hidden');
    }
  });
});