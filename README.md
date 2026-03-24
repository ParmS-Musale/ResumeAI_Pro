# ResumeAI Pro 🚀

AI-powered ATS Resume Optimizer that builds professional, high-scoring resumes tailored to job descriptions.

## ✨ Features
- **AI Engine**: Advanced optimization using OpenAI/Claude.
- **ATS Analyzer**: Detailed match scoring and keyword analysis.
- **LaTeX Export**: Professional, Overleaf-compatible resume templates.
- **Premium UI**: Modern dark-mode interface with glassmorphism.

## 🏗️ Structure
- `/backend`: Node.js + Express API
- `/frontend`: React (Vite) + Tailwind CSS
- `.github/workflows`: CI/CD Pipeline

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas (or local instance)
- OpenAI API Key

### 2. Installation
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 3. Environment Variables
Create a `.env` in the `backend/` folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
OPENAI_API_KEY=your_openai_api_key
```

### 4. Running the App
```bash
# Start Backend
cd backend
npm run dev

# Start Frontend
cd frontend
npm run dev
```

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Zustand, Lucide Icons.
- **Backend**: Node.js, Express, Mongoose.
- **AI**: OpenAI GPT-4o.
- **PDF**: LaTeX (Overleaf compatible).
