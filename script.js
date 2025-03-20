'use strict'

document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault()

    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    const response = await fetch('https://back-spider.vercel.app/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    });

    const data = await response.json()

    if (response.ok) {
        alert('Login bem-sucedido!')
        console.log(data)
    } else {
        alert('Erro no login: ' + (data.message || 'Credenciais inválidas'))
    }
})