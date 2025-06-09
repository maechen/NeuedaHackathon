# Neueda Hackathon - Loan Pre-Approval System

A comprehensive loan pre-approval application built with React, Python ML backend, and Firebase authentication. Made within FOUR hours.

Check out our presentation slides: https://docs.google.com/presentation/d/1h4gpfzXfd7NH1MamE_8c6LulZfpvuGll2V421GNmVws/edit?usp=sharing

## 🚀 Quick Start

**One-command startup:**

```bash
./start_system.sh
```

This will automatically:

-   Set up the Python environment
-   Install all dependencies
-   Train the ML model (if needed)
-   Start both backend API and frontend
-   Open the application at http://localhost:5173

## 📖 Full Documentation

For complete documentation, see [LOAN_SYSTEM_README.md](./LOAN_SYSTEM_README.md)

## 🔧 Alternative Startup Methods

**Check system status:**

```bash
./check_status.sh
```

**Manual startup (separate terminals):**

```bash
# Terminal 1 - Backend
./start_backend.sh

# Terminal 2 - Frontend
npm run dev
```

## 🏗️ Tech Stack

-   **Frontend**: React + Vite with Firebase Authentication
-   **Backend**: Flask API with CORS support
-   **ML Model**: scikit-learn Decision Tree Classifier
-   **Database**: Firebase Realtime Database
-   **Deployment**: Local development servers
