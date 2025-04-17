'use strict'

document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault()
    const nome = document.getElementById('user').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    const senhaRecuperacao = document.getElementById('keyword').value

    const data =
    {
        nome: nome,
        email: email,
        senha: senha,
        premium:1,
        imagemPerfil:"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
        senhaRecuperacao: senhaRecuperacao
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( data)
    }
    const response = await fetch('https://back-spider.vercel.app/user/cadastrarUser', options )

    if (response.ok) {
        alert('voce conseguiu logar')
        window.location.href = 'index.html';
    } else {
        alert('nao deu')
    }
})