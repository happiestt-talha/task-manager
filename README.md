<div align="center">
  <h1>✨ Task Manager</h1>
  <p>A modern, full-stack Task Management application built with Next.js and FastAPI.</p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
    <img src="https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  </p>
</div>

## 🚀 Overview

Task Manager is a seamless full-stack application designed to help you stay organized. It features a beautifully designed, responsive user interface built with the latest **Next.js** and **Tailwind CSS v4**, paired with a lightning-fast Python backend powered by **FastAPI**.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** TypeScript

### Backend
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/)
- **Server:** Uvicorn
- **Language:** Python 3

---

## 🏁 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v20+ recommended)
- [Python](https://www.python.org/) (v3.8+)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/happiestt-talha/task-manager.git
cd task-manager
```

### 2. Backend Setup

Open a terminal and navigate to the `backend` directory:

```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn app.main:app --reload --port 8000
```
*The backend API will be running at [http://localhost:8000](http://localhost:8000)*

### 3. Frontend Setup

Open a new terminal and navigate to the `frontend` directory:

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
*The frontend application will be running at [http://localhost:3000](http://localhost:3000)*

---

## 📂 Project Structure

```text
task-manager/
├── backend/            # FastAPI python server
│   ├── app/            # API routes and logic
│   ├── requirements.txt
│   └── venv/           # Python virtual environment
├── frontend/           # Next.js web application
│   ├── app/            # Next.js App Router pages
│   ├── components/     # React UI components
│   ├── package.json
│   └── tailwind.config.ts
└── .gitignore          # Root gitignore rules
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

## 📄 License

This project is licensed under the MIT License.
