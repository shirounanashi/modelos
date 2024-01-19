const REPO_NAME = 'ShiromiyaGamer/modelos-canal'; // Substitua pelo nome do repositório desejado
const HF_API_TOKEN = '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'; // Substitua pelo seu token de acesso à API do Hugging Face

const apiUrl = `https://huggingface.co/api/models/${REPO_NAME}`;

function formatSize(size) {
    if (size < 1024) {
      return size + ' bytes';
    } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + ' KB';
    } else {
      return (size / (1024 * 1024)).toFixed(2) + ' MB';
    }
  }


  
// Função para carregar os arquivos ao carregar a página
window.onload = function () {
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          const fileList = document.getElementById('fileList');
          if (data.siblings && data.siblings.length > 0) {
              data.siblings.forEach(file => {
                  // Verifica se o nome do arquivo é .gitattributes e ignora se for
                  if (file.rfilename !== '.gitattributes') {
                      const row = fileList.insertRow();
                      var nome = file.rfilename;
                      var nomeCortado = nome.slice(0, -4);
                      row.innerHTML = `
                          <td>${nomeCortado}</td>
                          <td>${formatSize(file.rfilesize)}</td>
                          <td>${file.rfiletype}</td>
                          <td><a href="https://huggingface.co/ShiromiyaGamer/modelos-canal/resolve/main/${file.rfilename}" target="_blank">Baixar</a></td>
                      `;
                  }
              });
          }
      })
      .catch(error => console.error('Erro ao recuperar a lista de arquivos:', error));
};
