document.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.getElementById("chat-box");
  const chatInput = document.getElementById("chat-input");
  const chatSend = document.getElementById("chat-send");

  let history = [];

  function addMessage(text, sender = "bot") {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // primeira mensagem automática
  addMessage("Olá, eu sou o Ciro, ChatBot do EducaCeará. Como posso te ajudar?", "bot");
  history.push({ role: "assistant", content: "Olá, eu sou o Ciro, ChatBot do EducaCeará. Como posso te ajudar?" });

  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    history.push({ role: "user", content: text });
    chatInput.value = "";

    // mensagem temporária
    const typingMsg = document.createElement("div");
    typingMsg.classList.add("message", "bot");
    typingMsg.innerText = "Digitando...";
    chatBox.appendChild(typingMsg);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
      const res = await fetch("https://educaceara.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: history }),
      });

      const data = await res.json();

      // remover "Digitando..."
      typingMsg.remove();

      // resposta do backend ou mensagem de erro amigável
      const reply = data.reply || "Ops, não consegui responder.";
      addMessage(reply, "bot");
      history.push({ role: "assistant", content: reply });

    } catch (err) {
      console.error(err);

      // remover "Digitando..."
      typingMsg.remove();

      // exibir erro de conexão de forma amigável
      addMessage("Ops! Não consegui responder agora. Verifique sua conexão ou tente mais tarde.", "bot");
    }
  }

  chatSend.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
  });
});
