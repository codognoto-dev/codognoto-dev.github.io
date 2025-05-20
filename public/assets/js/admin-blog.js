// public/assets/js/admin-blog.js
import { db, collection, addDoc, serverTimestamp } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('postForm');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const loadingIcon = document.getElementById('loading-icon');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    submitBtn.disabled = true;
    btnText.textContent = 'Publicando...';
    loadingIcon.classList.remove('hidden');

    try {
      const titulo = form.titulo.value.trim();
      const resumo = form.resumo.value.trim();
      const conteudo = form.conteudo.value.trim();
      const imagemUrl = form.imagemUrl.value.trim();
      const publicado = form.publicado.checked;

      if (!titulo || !resumo || !conteudo) {
        throw new Error('Por favor, preencha todos os campos obrigatórios.');
      }

      // Gerar um ID único para o post
      const postId = generatePostId(titulo);

      // Salvar no Firestore
      await addDoc(collection(db, 'posts'), {
        id: postId,
        titulo,
        resumo,
        conteudo,
        imagemUrl: imagemUrl || 'public/assets/imagens/blog-default.jpg',
        publicado,
        dataPublicacao: serverTimestamp(),
        visualizacoes: 0
      });

      alert('Post publicado com sucesso!');
      form.reset();

    } catch (error) {
      console.error('Erro ao publicar post:', error);
      alert(error.message);
    } finally {
      submitBtn.disabled = false;
      btnText.textContent = 'Publicar';
      loadingIcon.classList.add('hidden');
    }
  });

  function generatePostId(titulo) {
    return titulo
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
      .substring(0, 50) + '-' + Date.now();
  }
});