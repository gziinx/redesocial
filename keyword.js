// Função para fazer o PUT na API

function updatePassword(id, novaSenha, confirmarSenha) {
    // Verifica se as senhas são iguais
    if (novaSenha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    // Define o objeto que será enviado para a API
    const data = {
        senha: novaSenha
    };

    // Faz a requisição PUT usando fetch
    fetch(`https://back-spider.vercel.app/user/newPassword/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            alert("Senha atualizada com sucesso!");
        } else {
            alert("Erro ao atualizar a senha.");
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert("Erro na requisição.");
    });
}

// Evento para capturar o submit do formulário
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário

    // Pega os valores dos campos de senha
    const novaSenha = document.getElementById('password').value;
    const confirmarSenha = document.getElementById('password1').value;

    // Define o ID do usuário, você pode pegar isso de algum lugar, ou como um exemplo fixo
    const id = 2; // Exemplo, substitua com o valor real

    // Chama a função para atualizar a senha
    updatePassword(id, novaSenha, confirmarSenha);
});
