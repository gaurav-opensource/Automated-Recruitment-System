# 🚀 Automated Recruitment System

### AI-Powered End-to-End Hiring Platform

🔗 **GitHub Repository:**
[https://github.com/gaurav-opensource/Automated-Recruitment-System](https://github.com/gaurav-opensource/Automated-Recruitment-System)

## 🎥 YouTube Project Walkthrough

[![Watch the video](./frontend/src/assets/home_page.png)](https://youtu.be/oFAwrTyHF_4)


---

<p align="center">
  <img src="./frontend/src/assets/home_page.png" alt="Automated Recruitment System Banner" width="90%"/>
</p>

---

## 📌 Problem Statement (Why This Project?)

Modern recruitment suffers from **major inefficiencies**:

* Recruiters manually screen **hundreds of resumes**
* Skill mismatch despite good resumes
* No integrated system for **resume + coding test + evaluation**
* Fragmented tools for ATS, coding platforms, and communication

❌ **Manual hiring = time-consuming, biased, and error-prone**

---

## 💡 Solution (What This Project Solves)

The **Automated Recruitment System** is a **full-stack, AI-powered hiring platform** that automates the **entire recruitment lifecycle** in one place:

> From **job posting → resume screening → coding test → shortlisting**

It combines:

* 🤖 **AI Resume Scoring**
* 💻 **Online Coding Assessments**
* 📊 **Automated Candidate Evaluation**
* 🔐 **Secure Role-Based Dashboards**

---

## 🧠 What Makes This Project Special?

✅ Real-world **ATS + Coding Platform**
✅ AI-based **semantic resume analysis**
✅ Microservice architecture (ML separated)
✅ Production-style authentication & workflows
✅ Designed for **scalability & extensibility**

This is **not just CRUD** — it’s a **system**.

---

## 🧭 High-Level System Architecture

```
Frontend (React)
     |
Backend API (Node + Express)
     |
MongoDB
     |
AI Resume Scoring Service (FastAPI + NLP)
     |
Judge0 API (Coding Test Execution)
```

---

## 🎯 Core Features

### 👨‍🎓 Student Portal

* Profile creation
* Resume upload (PDF)
* Job application
* Online coding tests
* Real-time application status tracking

### 🧑‍💼 HR / Recruiter Portal

* Job posting & management
* AI-based resume screening
* Candidate ranking dashboard
* Coding test evaluation
* Interview shortlisting

---

## 🤖 AI Resume Scoring System (Deep Dive)

A dedicated **FastAPI microservice** performs intelligent resume evaluation.

### 🔍 How It Works

1. PDF resume → text extraction
2. Text cleaning & preprocessing
3. Keyword matching with job description
4. **Semantic similarity using MiniLM (Sentence Transformers)**
5. Weighted final score generation

### 📊 Sample Output

```json
{
  "final_score": 87.45,
  "keyword_score": 82.33,
  "semantic_score": 92.57,
  "missing_keywords": ["react", "mongodb"]
}
```

✔ This reduces bias
✔ Improves matching accuracy
✔ Scales better than manual screening

---

## 💻 Coding Test System

* Integrated **Judge0 API**
* Real-time code execution
* Language-agnostic support
* Automatic evaluation of submissions
* Used as a **second-round filter** after resume screening

---

## 🛠️ Technology Stack

### Frontend

* React
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB

### AI / ML Microservice

* FastAPI
* pdfplumber
* SentenceTransformers (MiniLM-L3-v2)
* scikit-learn

### Dev & Infra

* JWT Authentication
* Bcrypt
* Nodemailer
* Judge0 API

---

## 🖼️ Screenshots

### 🧑‍🎓 Student Dashboard

![Student Dashboard](./frontend/src/assets/student_dashboard.png)

### 👩‍💼 HR Dashboard

![HR Dashboard](./frontend/src/assets/hr_dashboard.png)

### 📊 Resume Score Analysis

![Resume Score](./frontend/src/assets/resume_score.png)

---

## 🧭 End-to-End Project Flow

### Student Flow

* Register → Create Profile → Upload Resume
* Apply to Job
* Attempt Coding Test
* Track Application Status

### HR Flow

* Create Job Listing
* AI Resume Screening
* Review Coding Test Results
* Shortlist for Interview

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/gaurav-opensource/Hiring-Platefrom.git
cd hiring-project
```

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

### AI Microservice

```bash
cd ml_api
python app.py
```

---

## 🧗 Challenges Faced (Important for Interviewers)

* Designing **AI scoring logic** that balances keywords + semantics
* Handling **PDF parsing inconsistencies**
* Microservice communication between Node & FastAPI
* Securing role-based access (Student vs HR)
* Integrating third-party Judge0 reliably

✅ Solved using modular design & clean APIs

---

## 🚀 Future Enhancements

* Video Interview Module
* Real-time Notifications (Socket.IO)
* Advanced NLP (BERT / SBERT)
* HR Analytics Dashboard
* Bulk Email & SMS Automation

---

## 👨‍💻 Author

**Gaurav Yadav**
📧 Email: [gauravyadavgh@example.com](mailto:gauravyadavgh@example.com)
🔗 LinkedIn: [https://www.linkedin.com/in/gauravyadav95/](https://www.linkedin.com/in/gauravyadav95/)
🐙 GitHub: [https://github.com/gaurav-opensource](https://github.com/gaurav-opensource)

---

## ⭐ Final Note

> This project reflects my ability to build **real-world, scalable, AI-powered systems** using modern full-stack technologies.

If you like this project, ⭐ the repo — it motivates me to build more 🚀

---

If you want next:

* 🔥 **Resume bullet points from this project**
* 🎤 **Interview explanation (how to explain this in 2 minutes)**
* 🎥 **Perfect YouTube voice-over script**
* 📈 **How to present this to recruiters**

Just say it.
