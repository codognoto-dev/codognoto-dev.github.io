import { db, sanitizeInput } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (!postId || !/^[\w-]+$/.test(postId)) {
      throw new Error('ID do post inválido');
    }

    const doc = await db.collection('posts').doc(postId).get();

    if (!doc.exists) {
      throw new Error('Post não encontrado');
    }

    const post = doc.data();
    const postDate = post.data.toDate().toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    document.getElementById('post-title').textContent = sanitizeInput(post.titulo);
    document.getElementById('post-date').textContent = postDate;
    document.getElementById('post-author').textContent = `Por ${sanitizeInput(post.autor || 'Equipe Campo Vivo')}`;
    document.getElementById('post-content').innerHTML = DOMPurify.sanitize(post.conteudo);

    const img = document.getElementById('post-image');
    img.src = post.imagemUrl || '../public/assets/imagens/default-post.jpg';
    img.alt = sanitizeInput(post.titulo);

    document.title = `${sanitizeInput(post.titulo)} | Blog Campo Vivo`;

  } catch (error) {
    console.error('Erro ao carregar post:', error);
    alert('Post não encontrado. Você será redirecionado para a página do blog.');
    window.location.href = 'blog.html';
  }
});