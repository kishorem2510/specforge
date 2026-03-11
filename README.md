# ⚡ SpecForge AI — Requirements → Developer Specifications

> **NeuroStack GenAI Build Sprint — Problem Statement 2: Requirements → User Stories & API Copilot**

---

## 🔗 Live Links

| | URL |
|---|---|
| 🌐 **Frontend (Live App)** | https://specforge-frontend.vercel.app |
| ⚙️ **Backend API** | https://kishorem2510-specforge-backend.hf.space |
| 📖 **API Docs (Swagger)** | https://kishorem2510-specforge-backend.hf.space/docs |
| 💻 **GitHub Repository** | https://github.com/kishorem2510/specforge |

> ⚠️ Update these URLs after deployment

---

## 📌 Overview

**SpecForge AI** is a production-ready GenAI tool that converts messy, unstructured product requirement notes into clean, developer-ready specifications — instantly.

Product Managers type raw requirements. SpecForge runs a 3-step LangChain pipeline powered by **Llama 3.1 (via Groq)** and outputs:
- Extracted features/modules
- Structured user stories
- REST API endpoints + database schema + edge cases

---

## 🏗️ Architecture

```
User (Browser)
     │
     ▼
Next.js Frontend (Vercel)
     │  JWT Token in header
     ▼
FastAPI Backend (Hugging Face Spaces)
     │
     ├──► Authentication Layer (JWT + SQLite)
     │
     └──► 3-Step LangChain Pipeline
               │
               ├── Step 1: Extract Features
               │         └── Groq (Llama 3.1) → Key modules/features
               │
               ├── Step 2: Generate User Stories
               │         └── Groq (Llama 3.1) → Agile user stories
               │
               └── Step 3: API + DB Schema
                         └── Groq (Llama 3.1) → Endpoints + tables + edge cases
                                   │
                                   ▼
                         Response: { features, user_stories, api_and_schema }
```

---

## 🔄 GenAI Workflow

### 3-Step LangChain Pipeline:

**Step 1 — Feature Extraction:**
- User's raw requirements are sent to Llama 3.1 via Groq
- Prompt instructs the model to extract exactly 5 key features
- Output: numbered list of specific features

**Step 2 — User Story Generation:**
- Features + original requirements passed to Llama 3.1
- Prompt uses agile PM format: "As a [role], I want to [action] so that [benefit]"
- Output: one user story per feature, role-specific

**Step 3 — API + DB Schema:**
- Features + requirements sent to Llama 3.1
- Model suggests REST endpoints, database tables, and edge cases
- Output: structured technical specification

---

## 🧠 Why Groq + Llama 3.1?

| Model | Quality | Speed | Free |
|---|---|---|---|
| Flan-T5 (original) | ❌ Poor | ✅ Fast | ✅ Yes |
| GPT-4 | ✅ Excellent | ✅ Fast | ❌ Paid |
| **Llama 3.1 via Groq** | ✅ Excellent | ✅ Fastest | ✅ Yes |

Groq provides free inference for open-source models with no credit card required — perfectly within hackathon rules.

---

## 🛠️ Tech Stack

### Backend
| Tool | Purpose |
|---|---|
| FastAPI | REST API framework |
| SQLAlchemy + SQLite | User database |
| JWT (python-jose) | Authentication tokens |
| Passlib + bcrypt | Password hashing |
| LangChain | Pipeline orchestration |
| Groq API | LLM inference (free) |
| Llama 3.1 8B | Feature/story/schema generation |

### Frontend
| Tool | Purpose |
|---|---|
| Next.js 15 | React framework |
| Tailwind CSS v3 | Styling |
| Axios | HTTP requests |
| React Hot Toast | Notifications |
| Lucide React | Icons |

### Deployment
| Service | Purpose |
|---|---|
| Hugging Face Spaces | Backend hosting (Docker) |
| Vercel | Frontend hosting |
| GitHub | Source code |

---

## 📁 Project Structure

```
specforge/
├── backend/
│   ├── main.py           # FastAPI app, routes, auth endpoints
│   ├── pipeline.py       # 3-step LangChain + Groq pipeline
│   ├── auth.py           # JWT token creation and validation
│   ├── database.py       # SQLAlchemy database setup
│   ├── models.py         # User model
│   ├── Dockerfile        # HF Spaces deployment
│   └── requirements.txt  # Python dependencies
└── frontend/
    ├── app/
    │   ├── login/page.tsx    # Login page
    │   ├── signup/page.tsx   # Signup page
    │   ├── generate/page.tsx # Main generation page
    │   └── layout.tsx        # Root layout
    └── package.json
```

---

## 🚀 Local Setup & Installation

### Prerequisites
- Python 3.10+
- Node.js 18+
- Groq API key (free at https://console.groq.com)

### Backend Setup

```bash
git clone https://github.com/kishorem2510/specforge.git
cd specforge/backend

pip install -r requirements.txt

# Create .env file
echo "GROQ_API_KEY=your_key_here" > .env

uvicorn main:app --reload
```

Backend runs at: `http://127.0.0.1:8000`

### Frontend Setup

```bash
cd specforge/frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

---

## 🧪 Sample Test Inputs

Try these in the generate page:

```
Build a food delivery app where users can order food, 
track delivery in real-time, and pay online. 
Restaurants can manage menus and orders.
```

```
Build an employee timesheet management system where 
employees log daily work hours. Managers can approve 
or reject timesheets and view reports.
```

```
Create an e-learning platform where students enroll 
in courses, watch videos, take quizzes, and get certificates.
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/signup` | Register new user | ❌ |
| POST | `/login` | Login and get JWT token | ❌ |
| POST | `/generate` | Generate specifications | ✅ Bearer Token |

### Example `/generate` Request:
```json
POST /generate
Authorization: Bearer <token>

{
  "requirements": "Build a food delivery app..."
}
```

### Example `/generate` Response:
```json
{
  "features": "1. User Authentication\n2. Restaurant Menu Management\n...",
  "user_stories": "1. As a user, I want to browse restaurants...\n...",
  "api_and_schema": "API Endpoints:\n- POST /auth/signup\n...\nDatabase Tables:\n- users(...)\n..."
}
```

---

## 🎥 Demo Video

> 📹 [Watch Demo Video](#) *(Add your Loom/YouTube link here)*

---

## 🔮 Future Improvements

1. **PM vs Developer View** — toggle between simplified and technical output
2. **Refine Specs** — follow-up prompt to improve generated specs
3. **Export to PDF/Word** — download specs as formatted documents
4. **Conversation history** — save and revisit past generations
5. **Multi-language support** — generate specs in different languages
6. **Figma integration** — auto-generate wireframe suggestions

---

## 👨‍💻 Author

**Kishore M**
- GitHub: [@kishorem2510](https://github.com/kishorem2510)
- Hugging Face: [@kishorem2510](https://huggingface.co/kishorem2510)

---

## 📄 License

MIT License — free to use and modify.
