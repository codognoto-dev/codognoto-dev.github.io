import { db, collection, getDocs } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', async () => {
  const loadingState = document.getElementById('loadingState');
  const emptyState = document.getElementById('emptyState');
  const formList = document.getElementById('formList');
  
  try {
    console.log("Iniciando busca de dados..."); // Debug
    const querySnapshot = await getDocs(collection(db, 'formularios_catalogo'));
    console.log("Dados recebidos:", querySnapshot.docs.length); // Debug
    
    loadingState.classList.add('hidden');
    
    if (querySnapshot.empty) {
      emptyState.classList.remove('hidden');
      return;
    }

    let html = '';
    querySnapshot.forEach(doc => {
      const data = doc.data();
      console.log("Documento:", data); // Debug
      const date = data.data_envio?.toDate() || new Date();
      
      html += `
        <div class="p-6 hover:bg-gray-50 transition">
          <div class="flex flex-col md:flex-row md:justify-between">
            <div class="mb-3 md:mb-0">
              <h3 class="font-semibold text-[#2b4039]">${escapeHtml(data.nome)}</h3>
              <p class="text-gray-600 text-sm">${escapeHtml(data.email)}</p>
              <p class="text-gray-500 text-sm mt-1">
                ${escapeHtml(data.cidade)} • ${escapeHtml(data.profissao)}
              </p>
            </div>
            <div class="text-sm text-gray-400">
              ${formatDate(date)}
            </div>
          </div>
        </div>
      `;
    });

    formList.innerHTML = html;
    formList.classList.remove('hidden');

  } catch (error) {
    console.error("Erro completo:", error); // Debug mais detalhado
    loadingState.classList.add('hidden');
    emptyState.querySelector('h3').textContent = 'Erro ao carregar';
    emptyState.querySelector('p').textContent = error.message || 'Ocorreu um erro ao buscar os dados.';
    emptyState.classList.remove('hidden');
  }
});

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatDate(date) {
  return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
}