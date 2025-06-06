# 🧠 FlowBit + LangFlow Automation Orchestrator

This project integrates visual AI agents built using **LangFlow** with a workflow frontend powered by **FlowBit (Next.js)**. It supports Email parsing, PDF extraction, JSON processing, and Classification workflows.

---

## 📦 Features

- ⚡ Trigger workflows via **Manual**, **Webhook**, or **Cron**
- 🎯 Built-in support for **LangFlow** agents
- 📊 Track executions in a dashboard
- 🧩 Flows: `Email`, `PDF`, `JSON`, `Classifier`

---

## 🏗️ Project Structure

flowbit-langflow-project/
│
├── app/                          # Next.js app routes
│   ├── api/                      # API routes (trigger endpoints, SSE, etc.)
│   ├── sample-data/              # Sample JSON data or config files
│   ├── layout.tsx
│   ├── page.tsx
│
├── components/                  # Frontend components
│   └── ui/                      # Reusable UI components (sidebar, modals, etc.)
│
├── data/
│   └── langflow.db              # LangFlow SQLite DB
│
├── flows/                       # Visual LangFlow JSON flow definitions
│   ├── email.json
│   ├── pdf.json
│   ├── json.json
│   └── classifier.json
│
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
│
├── lib/
│   └── utils.ts                 # Utilities
│
├── public/                      # Static assets
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   └── ...
│
├── styles/
│   └── globals.css              # Global CSS
│
├── .env.local                   # Local environment variables
├── .gitignore
├── components.json              # Custom component configs
├── docker-compose.yml          # Docker orchestration
├── langflow.config.json        # LangFlow specific config
├── next.config.mjs             # Next.js config
├── package.json
├── pnpm-lock.yaml              # Lock file (use npm/yarn/pnpm)
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md                   # ← You will add the following README here


---

## 🚀 Getting Started

### 1. Clone & Setup

```bash
git clone <https://github.com/Shannuuu2012/-FlowBit-LangFlow-Docker-based-Orchestration-Project.git>
cd flowbit-langflow-project
```

### 2. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
LANGFLOW_API_URL=http://localhost:7860
```

### 3. Start Docker

This will spin up LangFlow + PostgreSQL (if needed):

```bash
docker-compose up --build
```

> 📝 If you face auth issues or connection refused, ensure port `7860` is open and not blocked by a firewall.

---

## 🧠 Agents

Place your flow files inside the `flows/` folder:

- `flows/email.json`
- `flows/pdf.json`
- `flows/json.json`
- `flows/classifier.json`

These will be loaded by the frontend automatically.

---

## 💻 Run FlowBit Frontend

```bash
pnpm install  # or npm install
pnpm dev      # or npm run dev
```

App will be live at: [http://localhost:3000](http://localhost:3000)

---

## 🔧 Add New Agent

To add a new LangFlow agent:

1. Open LangFlow (http://localhost:7860)
2. Create your flow visually
3. Export as JSON
4. Save under `flows/` folder
5. Restart frontend to load updated sidebar

---

## ✅ Trigger Types Supported

- 🔘 **Manual** — Run from dashboard with input
- 🔁 **Webhook** — Externally trigger via API
- 🕓 **Cron** — Run on a schedule

---

## 📂 API Routes (Next.js)

- `POST /api/trigger/:flowId`
- `GET /api/flows` — Lists flows
- `GET /api/status/:executionId`

---

## 🐳 Docker Overview

Ensure `docker-compose.yml` includes:

```yaml
services:
  langflow:
    image: langflow:latest
    ports:
      - 7860:7860
    volumes:
      - ./flows:/app/flows
```

---

## 📸 Screenshot

![running backend](docs/log1.png)
![UI](docs/log2.png)
![Lang-flow](docs/log3.png)
![flowbit](docs/log4.png)
![demo-flow](docs/log5.png)

---

## 🛠️ Tech Stack

- ⚙️ LangFlow
- ⚛️ Next.js (App Router)
- 🐳 Docker
- 🎨 TailwindCSS
- 🔁 SSE / Webhooks / Cron

---

## 🧑‍💻 Author

- Built by Shanmukh


---

## 📃 License

MIT © 2025
