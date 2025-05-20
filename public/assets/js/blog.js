// public/assets/js/blog.js
import { db, collection, getDocs } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', async () => {
  const postsContainer = document.getElementById('posts-container');

  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    
    postsContainer.innerHTML = '';
    
    if (querySnapshot.empty) {
      postsContainer.innerHTML = `
        <div class="col-span-3 text-center py-12">
          <p class="text-gray-500">Nenhum post publicado ainda.</p>
        </div>
      `;
      return;
    }

    // Converter para array e ordenar por data
    const posts = [];
    querySnapshot.forEach(doc => {
      posts.push(doc.data());
    });
    
    posts.sort((a, b) => {
      const dateA = a.dataPublicacao?.toDate() || new Date(0);
      const dateB = b.dataPublicacao?.toDate() || new Date(0);
      return dateB - dateA; // Ordem decrescente
    });

    // Exibir posts ordenados
    posts.forEach(post => {
      if (post.publicado) {
        const postDate = post.dataPublicacao?.toDate() || new Date();
        const formattedDate = postDate.toLocaleDateString('pt-BR');
        
        postsContainer.innerHTML += `
          <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <a href="post.html?id=${post.id}">
              <img src="${post.imagemUrl}" alt="${post.titulo}" class="w-full h-48 object-cover">
              <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">${post.titulo}</h3>
                <p class="text-gray-600 mb-4">${post.resumo}</p>
                <div class="flex justify-between items-center text-sm text-gray-500">
                  <span>${formattedDate}</span>
                  <span>${post.visualizacoes || 0} visualizações</span>
                </div>
              </div>
            </a>
          </div>
        `;
      }
    });

  } catch (error) {
    console.error('Erro ao carregar posts:', error);
    postsContainer.innerHTML = `
      <div class="col-span-3 text-center py-12">
        <p class="text-red-500">Erro ao carregar posts. Por favor, recarregue a página.</p>
      </div>
    `;
  }
});