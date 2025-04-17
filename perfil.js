'use strict';

const usuarioId = parseInt(localStorage.getItem('usuarioId'));

if (!usuarioId) {
  alert('Usuário não logado!');
  window.location.href = "index.html";
}

const urlUsuarios = 'https://back-spider.vercel.app/user/listarUsers';
const urlPublicacoes = 'https://back-spider.vercel.app/publicacoes/listarPublicacoes';

// Buscar e exibir dados do usuário
fetch(urlUsuarios)
  .then(res => res.json())
  .then(usuarios => {
    const usuario = usuarios.find(u => u.id === usuarioId);
    if (!usuario) {
      alert('Usuário não encontrado!');
      return;
    }

    document.getElementById('imgg').src = usuario.imagemPerfil;
    document.getElementById('username').textContent = `@${usuario.nome.toLowerCase()}`;
    document.getElementById('nomeCompleto').textContent = usuario.nome;
    document.getElementById('created').innerHTML = 'Conta premium: <br>' + (usuario.premium === "1" ? 'Sim' : 'Não');
  });

// Buscar e exibir posts
fetch(urlPublicacoes)
  .then(res => res.json())
  .then(publicacoes => {
    const postsUsuario = publicacoes.filter(p => p.usuarioId === usuarioId);
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    if (postsUsuario.length === 0) {
      postsContainer.innerHTML = 'O usuário ainda não fez nenhum post...';
      return;
    }

    postsUsuario.forEach(post => {
      const div = document.createElement('div');
      div.style.marginBottom = '20px';
      div.style.background = '#fff';
      div.style.padding = '15px';
      div.style.borderRadius = '10px';
      div.style.boxShadow = '0 0 5px rgba(0,0,0,0.2)';
      
      div.innerHTML = `
        <img src="${post.imagem}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 10px;" alt="Imagem do post">
        <h3 style="margin-top: 10px;">${post.descricao}</h3>
        <p><strong>Local:</strong> ${post.local}</p>
        <p><strong>Data:</strong> ${post.dataPublicacao}</p>
        <p><strong>Comentários:</strong> ${post.comentarios.length} | <strong>Curtidas:</strong> ${post.curtidas.length}</p>
      `;
      postsContainer.appendChild(div);
    });
  });
