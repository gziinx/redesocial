'use strict';

document.getElementById('login-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  };

  const response = await fetch('https://back-spider.vercel.app/login', options);

  if (response.ok) {
    const usuario = await response.json();
    console.log('Resposta da API:', usuario); 

    localStorage.setItem('usuarioId', usuario.id);
    alert('Você conseguiu logar!');
    window.location.href = 'perfil.html';
  } else {
    alert('Não foi possível fazer login.');
  }
});
