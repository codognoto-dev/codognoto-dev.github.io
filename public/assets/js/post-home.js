// posts-home.js
import { db, collection, getDocs } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('ultimos-posts');

  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const posts = [];

    querySnapshot.forEach(doc => {
      const data = doc.data();
      if (data.publicado) {
        posts.push(data);
      }
    });

    // Ordenar por data decrescente
    posts.sort((a, b) => {
      const dateA = a.dataPublicacao?.toDate() || new Date(0);
      const dateB = b.dataPublicacao?.toDate() || new Date(0);
      return dateB - dateA;
    });

    // Pegar os 3 mais recentes
    const recentes = posts.slice(0, 3);

    if (recentes.length === 0) {
      container.innerHTML = `
        <div class="col-span-3 text-center text-gray-500 py-12">
          Nenhum post publicado ainda.
        </div>`;
      return;
    }

    container.innerHTML = ''; // limpar "Carregando..."

    recentes.forEach(post => {
      const postDate = post.dataPublicacao?.toDate().toLocaleDateString('pt-BR') || '';
      container.innerHTML += `
        <div class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
          <a href="post.html?id=${post.id}">
            <img src="${post.imagemUrl}" alt="${post.titulo}" class="w-full h-48 object-cover">
            <div class="p-5">
              <h3 class="text-lg font-semibold text-[#2b4039] mb-2">${post.titulo}</h3>
              <p class="text-gray-600 text-sm">${post.resumo}</p>
            </div>
          </a>
        </div>
      `;
    });

  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    container.innerHTML = `
      <div class="col-span-3 text-center text-red-500 py-12">
        Erro ao carregar os posts.
      </div>`;
  }
});