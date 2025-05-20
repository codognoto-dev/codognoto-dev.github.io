// public/assets/js/post.js
import { db, collection, getDocs } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  
  if (!postId) {
    window.location.href = 'blog.html';
    return;
  }

  const postLoading = document.getElementById('post-loading');
  const postContent = document.getElementById('post-content');
  
  try {
    // Encontrar o post específico
    const querySnapshot = await getDocs(collection(db, 'posts'));
    let post = null;
    
    querySnapshot.forEach(doc => {
      if (doc.data().id === postId) {
        post = doc.data();
      }
    });

    if (!post) {
      throw new Error('Post não encontrado');
    }

    // Atualizar contador de visualizações
    // Nota: Sem increment() precisamos fazer manualmente
    const updatedViews = (post.visualizacoes || 0) + 1;
    await addDoc(collection(db, 'posts'), {
      ...post,
      visualizacoes: updatedViews
    });

    const postDate = post.dataPublicacao?.toDate() || new Date();
    
    document.title = `${post.titulo} | Blog Campo Vivo`;
    document.getElementById('post-image').src = post.imagemUrl;
    document.getElementById('post-image').alt = post.titulo;
    document.getElementById('post-title').textContent = post.titulo;
    document.getElementById('post-date').textContent = postDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
    document.getElementById('post-views').textContent = `${updatedViews} visualizações`;
    document.getElementById('post-body').innerHTML = `
      <p class="text-lg mb-6">${post.resumo}</p>
      <div>${post.conteudo.replace(/\n/g, '<br>')}</div>
    `;
    
    postLoading.classList.add('hidden');
    postContent.classList.remove('hidden');
  } catch (error) {
    console.error('Erro ao carregar post:', error);
    postLoading.innerHTML = `
      <div class="text-center py-12">
        <p class="text-red-500 mb-4">Erro ao carregar o post.</p>
        <a href="blog.html" class="text-[#2b4039] hover:underline">Voltar para o blog</a>
      </div>
    `;
  }
});