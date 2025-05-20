// public/assets/js/ibge-api.js
function carregarEstadosECidades() {
  const estadoSelect = document.getElementById('estado');
  const cidadeSelect = document.getElementById('cidade');

  if (!estadoSelect || !cidadeSelect) return;

  // Carregar estados
  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then(response => response.json())
    .then(estados => {
      estados.forEach(estado => {
        const option = document.createElement('option');
        option.value = estado.sigla;
        option.textContent = estado.nome;
        estadoSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar estados:', error);
      estadoSelect.innerHTML = '<option value="">Erro ao carregar estados</option>';
    });

  // Quando um estado é selecionado
  estadoSelect.addEventListener('change', function() {
    const uf = this.value;
    cidadeSelect.innerHTML = '<option value="">Carregando cidades...</option>';
    cidadeSelect.disabled = true;

    if (uf) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
        .then(response => response.json())
        .then(cidades => {
          cidadeSelect.innerHTML = '<option value="">Selecione sua cidade</option>';
          cidades.forEach(cidade => {
            const option = document.createElement('option');
            option.value = `${cidade.nome}, ${uf}`;
            option.textContent = cidade.nome;
            cidadeSelect.appendChild(option);
          });
          cidadeSelect.disabled = false;
        })
        .catch(error => {
          console.error('Erro ao carregar cidades:', error);
          cidadeSelect.innerHTML = '<option value="">Erro ao carregar cidades</option>';
        });
    } else {
      cidadeSelect.innerHTML = '<option value="">Selecione o estado primeiro</option>';
      cidadeSelect.disabled = true;
    }
  });
}

// Inicia quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', carregarEstadosECidades);