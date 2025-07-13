// public/assets/js/post.js
import { db, doc, getDoc, updateDoc, increment } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('post-container');

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  if (!postId) {
    container.innerHTML = `<p class="text-center text-red-500">Post inválido.</p>`;
    return;
  }

  try {
    const docRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(docRef);

    if (!postSnap.exists()) {
      container.innerHTML = `<p class="text-center text-gray-500">Post não encontrado.</p>`;
      return;
    }

    const post = postSnap.data();
    await updateDoc(docRef, { visualizacoes: increment(1) });

    const postDate = post.dataPublicacao?.toDate()?.toLocaleDateString('pt-BR') || '';

    container.innerHTML = `
      <h1 class="text-3xl font-bold text-[#2b4039]">${post.titulo}</h1>
      <p class="text-gray-500 text-sm">${postDate} • ${post.visualizacoes + 1 || 1} visualizações</p>
      <img src="${post.imagemUrl}" alt="${post.titulo}" class="w-full rounded-lg shadow-md my-6">
      <p class="text-lg text-gray-700">${post.resumo}</p>
      <div class="prose prose-lg max-w-none pt-4">${post.conteudo.replace(/\n/g, '<br>')}</div>
    `;
  } catch (error) {
    console.error(error);
    container.innerHTML = `<p class="text-center text-red-500">Erro ao carregar o post.</p>`;
  }
});