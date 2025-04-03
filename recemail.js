document.addEventListener("DOMContentLoaded", function () {
    const Recuperar = document.getElementById("login-form");

    if (Recuperar) {
        Recuperar.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const palavraChave = document.getElementById("password").value;

            if (!email || !palavraChave) {
                alert("Preencha todos os campos!");
                return;
            }

            const data = {
                email: email,
                wordKey: palavraChave
            };

            try {
                const response = await fetch("https://back-spider.vercel.app/user/RememberPassword", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                const responseData = await response.json();

                if (response.ok) {
                    alert("Palavra-chave confirmada! Você será redirecionado para redefinir sua senha.");
                    localStorage.setItem("emailRecuperacao", email);
                    window.location.href = 'keyword.html';
                } else {
                    alert("Erro: " + (responseData.message || "Verifique os dados e tente novamente."));
                }
            } catch (error) {
                alert("Erro ao conectar ao servidor. Tente novamente mais tarde.");
            }
        });
    }
});