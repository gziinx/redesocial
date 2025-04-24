document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('publicacoes-container');
    
    fetch('https://back-spider.vercel.app/publicacoes/listarPublicacoes')
      .then(response => response.json())
      .then(data => {
        data.forEach(post => {
          const card = document.createElement('div');
          card.className = 'card';
  
          const header = document.createElement('div');
          header.className = 'card-header';
  
          const userHandle = document.createElement('span');
          userHandle.className = 'user-handle';
          userHandle.textContent = `@usuario${post.idUsuario}`;
  
          const postText = document.createElement('span');
          postText.className = 'post-text';
          postText.textContent = post.descricao;
  
          header.appendChild(userHandle);
          header.appendChild(postText);
  
          const imageContainer = document.createElement('div');
          imageContainer.className = 'card-image';
  
          const image = document.createElement('img');
          image.src = post.imagem;
          image.alt = 'Imagem da postagem';
  
          imageContainer.appendChild(image);
  
          const actions = document.createElement('div');
          actions.className = 'card-actions';
  
          // Cria o span de likes
const likes = document.createElement('span');
likes.textContent = `👍 ${post.curtidas ? post.curtidas.length : 0}`;

// Adiciona o event listener só DEPOIS de ter criado o elemento
likes.addEventListener('click', () => {
  fetch(`https://back-spider.vercel.app/publicacoes/likePublicacao/${post.id}`, {
    method: 'PUT',
  })
  .then(res => res.json())
  .then(res => {
    console.log('Curtida registrada:', res);
    likes.textContent = `👍 ${res.curtidas.length}`;
  })
  .catch(err => console.error('Erro ao curtir:', err));
});

  
          const comments = document.createElement('span');
          comments.textContent = `💬 ${post.comentarios ? post.comentarios.length : 0}`;
  
          
          actions.appendChild(likes);
          actions.appendChild(comments);

  
          card.appendChild(header);
          card.appendChild(imageContainer);
          card.appendChild(actions);
  
          container.appendChild(card);

          const commentBox = document.createElement('input');
commentBox.placeholder = 'Escreva um comentário...';
commentBox.className = 'comment-box';

const sendComment = document.createElement('button');
sendComment.textContent = 'Comentar';
sendComment.className = 'comment-button';

sendComment.addEventListener('click', () => {
  const comentario = commentBox.value.trim();
  if (!comentario) return;

  fetch(`https://back-spider.vercel.app/publicacoes/commentPublicacao/${post.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comentario }),
  })
  .then(res => res.json())
  .then(res => {
    console.log('Comentário adicionado:', res);
    comments.textContent = `💬 ${res.comentarios.length}`;
    commentBox.value = '';
  })
  .catch(err => console.error('Erro ao comentar:', err));
});

card.appendChild(commentBox);
card.appendChild(sendComment);
    
        });
          // Campo de comentário

      })
      
      .catch(error => {
        console.error('Erro ao buscar publicações:', error);
      });
  });
  