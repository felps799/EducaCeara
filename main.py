# main.py (versão sugerida para deploy)
from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ciro-backend")

# Carregar variáveis (em produção use env vars)
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    logger.warning("GROQ_API_KEY não está definida — verifique variáveis de ambiente")

client = Groq(api_key=GROQ_API_KEY)

app = FastAPI()

ALLOWED_ORIGINS = [
    "https://educaceara.infinityfreeapp.com",
    "https://projeto2.fwh.is",
    "http://127.0.0.1:5500",
    "http://localhost:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    message: str
    history: list = []

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/api/chat")
async def chat_endpoint(data: ChatMessage):
    try:
        messages = [
            {"role": "system",
             "content": "Você é o Ciro, ChatBot educacional do EducaCeará. Responda de forma clara, amigável e útil para ajudar alunos e professores nas disciplinas de educação ambiental, empreendedorismo sustentável, relações interpessoais, entre outras."}
        ]
        for msg in data.history:
            if "role" in msg and "content" in msg:
                messages.append(msg)
        messages.append({"role": "user", "content": data.message})

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages,
            max_tokens=300,
            temperature=0.7
        )

        reply = response.choices[0].message.content.strip()
        return {"reply": reply}

    except Exception as e:
        logger.exception("Erro ao processar /api/chat")
        # não vaze detalhes internos para o cliente em produção
        return {"reply": "Desculpe — ocorreu um erro no servidor. Tente novamente mais tarde."}
