function toggleMenu() {
    const menu = document.getElementById("menu-mobile");
    menu.classList.toggle("show");
    if(menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

// FORMULÁRIO FALE CONOSCO
const form = document.getElementById("formFaleConosco");

if (form) {
    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const formData = new FormData(form);

        try {
            const resposta = await fetch("processar.php", {
                method: "POST",
                body: formData
            });

            const resultado = await resposta.text();

            if (resposta.ok && resultado.includes("sucesso")) {
                mostrarPopup(
                    "Mensagem enviada!",
                    "Sua mensagem foi enviada com sucesso. Obrigado pelo contato! 💚"
                );

                form.reset();
            } else {
                mostrarPopup(
                    "Ops!",
                    "Não foi possível enviar sua mensagem. Tente novamente."
                );
            }

        } catch (erro) {
            console.error(erro);

            mostrarPopup(
                "Erro de conexão",
                "Não conseguimos enviar sua mensagem. Tente novamente."
            );
        }
    });
}

function mostrarPopup(titulo, mensagem) {
    document.getElementById("popupTitulo").textContent = titulo;
    document.getElementById("popupMensagem").textContent = mensagem;

    document.getElementById("popupSucesso").classList.add("ativo");
}

function fecharPopup() {
    document.getElementById("popupSucesso").classList.remove("ativo");
}