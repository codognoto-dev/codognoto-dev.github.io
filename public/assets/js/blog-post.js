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
    const postDate = post.dataPublicacao?.toDate().toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    // Preencher os campos do post
    document.getElementById('post-title').textContent = sanitizeInput(post.titulo);
    document.getElementById('post-date').textContent = postDate || '';
    document.getElementById('post-views').textContent = `${post.visualizacoes || 0} visualizações`;
    document.getElementById('post-image').src = post.imagemUrl || '../public/assets/imagens/blog-default.jpg';
    document.getElementById('post-image').alt = sanitizeInput(post.titulo);
    document.getElementById('post-body').innerHTML = DOMPurify.sanitize(post.conteudo);

    document.title = `${sanitizeInput(post.titulo)} | Blog Campo Vivo`;

    // Mostrar o conteúdo e esconder o loading
    document.getElementById('post-loading').classList.add('hidden');
    document.getElementById('post-content').classList.remove('hidden');

  } catch (error) {
    console.error('Erro ao carregar post:', error);
    alert('Post não encontrado. Você será redirecionado para a página do blog.');
    window.location.href = 'blog.html';
  }
});