# StepMind

Assistente de organização com IA para pessoas com TDAH. Converte tarefas em linguagem natural em passos simples e rotinas estruturadas. Inclui gamificação com pontos ⭐, streak 🔥 e progresso diário 🎯 para aumentar motivação e reduzir procrastinação.

---

## 📌 Sumário

- [O que é](#o-que-é)
- [Como funciona](#como-funciona)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Motivação / Sistema de Dopamina](#motivação--sistema-de-dopamina)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Usadas](#tecnologias-usadas)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Contribuição](#contribuição)

---

## 🧠 O que é

O **stepmind** é um assistente inteligente que ajuda pessoas com TDAH a transformar tarefas confusas em passos simples, claros e executáveis, reduzindo ansiedade e facilitando a organização do dia.

O usuário pode falar ou escrever o que precisa fazer e a IA transforma isso em um plano estruturado de ação.

---

## ⚙️ Como funciona

1. O usuário envia um áudio ou texto em linguagem natural.
2. A IA interpreta o pedido e automaticamente:
   - quebra a atividade em passos simples
   - cria uma rotina organizada
   - sugere tempo para cada etapa
   - ajuda a iniciar a tarefa sem sobrecarga mental

### Exemplo de entrada

> "Preciso estudar para a prova às 15h."

### Exemplo gerado pela IA

- **Estudar para prova – 15h**
  - Organizar materiais (5 min)
  - Revisar anotações principais (20 min)
  - Resolver exercícios (30 min)
  - Fazer pausa rápida (5 min)
  - Revisão final (10 min)

---

## 🎮 Motivação / Sistema de Dopamina

Para ajudar na motivação — algo essencial para pessoas com TDAH — o sistema usa reforço dopaminérgico através de gamificação.

Cada tarefa concluída gera pequenas recompensas visuais e progressivas:

- ⭐ **Pontos**
  - Cada tarefa completada gera pontos, criando sensação de recompensa imediata.
- 🔥 **Streak (sequência)**
  - Completar tarefas em dias consecutivos aumenta o streak, incentivando consistência.
- 🎯 **Progresso do dia**
  - Uma barra de progresso mostra quanto do planejamento diário já foi concluído.

### Exemplo

- Tarefa concluída → +10 pontos ⭐
- 3 tarefas seguidas → streak 🔥
- 70% do dia completo → progresso 🎯

Esses pequenos estímulos ajudam o cérebro a associar produtividade com recompensa, aumentando a motivação e reduzindo a procrastinação.

---

## ✅ Funcionalidades Principais

### Backend

- Sistema de login e cadastro
- API de comunicação com IA
- Processamento de áudio para texto
- Armazenamento do histórico de chats
- Sistema de pontuação, streak e progresso diário

### Frontend

- Interface simples e minimalista para reduzir distrações
- Campo para digitar tarefas
- Botão para enviar áudio
- Login e cadastro
- Visualização de chats anteriores
- Conversas organizadas por dia
- Dashboard com:
  - ⭐ Pontos
  - 🔥 Streak
  - 🎯 Progresso diário

---

## 🗂️ Estrutura do Projeto

```
stepmind/
├─ front/                    # Aplicação Next.js (frontend)
│  ├─ app/
│  │  ├─ calendar/
│  │  ├─ history/
│  │  ├─ login/
│  │  ├─ signup/
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components/
│  │  ├─ Header/
│  │  ├─ ui/
│  │  ├─ BackButton.tsx
│  │  ├─ login-form.tsx
│  │  ├─ signup-form.tsx
│  │  ├─ PageContainer.tsx
│  │  └─ theme-provider.tsx
│  ├─ hooks/
│  ├─ lib/
│  │  ├─ auth.ts
│  │  └─ utils.ts
│  ├─ public/
│  ├─ next.config.mjs
│  ├─ package.json
│  └─ tsconfig.json
├─ README.md
```

---

## 🛠️ Tecnologias Usadas

- **Next.js** (App Router)
- **React** + **TypeScript**
- **Tailwind CSS** (presumido no estilo global)
- **OpenAI / IA** (API de linguagem para transformar texto/voz em passos)
- **Speech-to-Text** (para processamento de áudio)

---

## ▶️ Como Rodar Localmente

1. Vá para o diretório do frontend:

```bash
cd front
```

2. Instale dependências:

```bash
npm install
```

3. Rode em modo de desenvolvimento:

```bash
npm run dev
```

O front-end deve estar disponível em `http://localhost:3000`.

> ⚠️ Certifique-se de configurar as variáveis de ambiente necessárias (por exemplo, chaves de API de IA) antes de iniciar.

---

## 🤝 Contribuição

Se quiser contribuir:

1. Faça um fork do repositório.
2. Crie uma branch (`git checkout -b feature/minha-nova-funcao`).
3. Faça commits claros e atômicos.
4. Abra um Pull Request descrevendo o que foi feito.

---

## 🎯 Objetivo do projeto

Criar uma ferramenta que ajude pessoas com TDAH a:

- transformar tarefas confusas em passos claros
- reduzir ansiedade ao planejar o dia
- manter motivação através de pequenas recompensas
- desenvolver consistência e organização
