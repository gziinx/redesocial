'use strict'

document.addEventListener("DOMContentLoaded", function () {

    const formRedefinir = document.getElementById('login-form'); // Corrigido o ID do formulário
    if (formRedefinir) {
        formRedefinir.addEventListener('submit', async function (event) {
            event.preventDefault();

            const novaSenha = document.querySelector('#password').value; // Corrigido o seletor
            const confirmarSenha = document.querySelector('#password1').value; // Corrigido o seletor
            const userId = localStorage.getItem('userId');

            if (!userId) {
                alert('Erro: ID do usuário não encontrado. Refaça o processo de recuperação.');
                return;
            }

            if (novaSenha !== confirmarSenha) {
                alert('As senhas não coincidem!');
                return;
            }

            const data = { novaSenha: novaSenha };
            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };

            try {
                console.log(`Enviando requisição para: https://back-spider.vercel.app/user/newPassword/${userId}`);
                const response = await fetch(`https://back-spider.vercel.app/user/newPassword/${userId}`, options);
                const responseData = await response.json();
                console.log('Resposta da API (Redefinir Senha):', responseData);

                if (response.ok) {
                    alert('Senha redefinida com sucesso! Faça login novamente.');
                    localStorage.removeItem('userId');
                    window.location.href = 'login.html';
                } else {
                    alert('Erro: ' + (responseData.message || 'Não foi possível redefinir a senha.'));
                }
            } catch (error) {
                console.error('Erro ao conectar-se à API:', error);
                alert('Erro ao tentar redefinir a senha. Tente novamente.');
            }
        });
    }
});