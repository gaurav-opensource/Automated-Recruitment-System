# 📊 AI Recruitment System - Visual Diagrams & Flows

## System Architecture Diagram

```
                     ┌─────────────────────────────────────────────────┐
                     │          CLIENT LAYER (Users)                    │
                     │  Students  │  HR/Recruiters  │  Admins          │
                     └────────┬──────────┬────────────────────────────┘
                              │          │
                     ┌────────▼──────────▼────────────────────────────┐
                     │    Frontend Layer (React + React Router)        │
                     │  • Student Dashboard                            │
                     │  • HR Dashboard                                 │
                     │  • Job Listings                                 │
                     │  • Test Editor (Monaco)                         │
                     │  • Authentication Pages                         │
                     └────────┬─────────────────────────────────────┘
                              │
                     ┌────────▼──────────────────────────────────────┐
                     │  API Layer (Node.js + Express)                 │
                     │                                                 │
                     │  ┌──────────────────────────────────────────┐ │
                     │  │ Routes & Controllers:                    │ │
                     │  │ • /api/auth (Login/Signup)              │ │
                     │  │ • /api/students (Profile/Apply)         │ │
                     │  │ • /api/hr (Job Mgmt/Evaluation)         │ │
                     │  │ • /api/job (Job Listing)                │ │
                     │  │ • /api/test (Test Management)           │ │
                     │  │ • /api/progress (Track Application)     │ │
                     │  │ • /api/email (Notifications)            │ │
                     │  └──────────────────────────────────────────┘ │
                     │                                                 │
                     │  ┌──────────────────────────────────────────┐ │
                     │  │ Middlewares:                             │ │
                     │  │ • auth.middleware (JWT Verification)    │ │
                     │  │ • role.middleware (Role-Based Access)   │ │
                     │  │ • error.middleware (Error Handling)     │ │
                     │  └──────────────────────────────────────────┘ │
                     └────────┬──────────┬──────────┬─────────────────┘
                              │          │          │
            ┌─────────────────┼──────────┼──────────┘
            │                 │          │
     ┌──────▼──────┐  ┌───────▼──────┐  └─────────────────────────────┐
     │  MongoDB    │  │  FastAPI     │                                 │
     │  Database   │  │  AI Service  │   External Services:           │
     │             │  │              │   • Judge0 API                 │
     │ Collections:│  │ Controllers: │     (Code Execution)           │
     │ • Users     │  │ • Resume     │   • Cloudinary                │
     │ • Jobs      │  │   Controller │     (File Storage)             │
     │ • Students  │  │              │   • Email SMTP                 │
     │ • HR        │  │ Algorithms:  │     (Email Sending)            │
     │ • Tests     │  │ • PDF Parse  │                                │
     │ • Questions │  │ • Text Clean │                                │
     │ • Results   │  │ • Keyword    │                                │
     │ • Apps      │  │   Score      │                                │
     │ • Emails    │  │ • Semantic   │                                │
     │             │  │   Score      │                                │
     └─────────────┘  │ • Final      │                                │
                      │   Scoring    │                                │
                      └──────────────┘                                │
                                                                       │
                      ┌────────────────────────────────────────────────┘
                      │
         ┌────────────▼──────────────┐
         │    Deployment (Docker)   │
         │                           │
         │ • Frontend Container     │
         │ • Backend Container      │
         │ • AI Service Container   │
         │ • MongoDB Container      │
         │                           │
         │ docker-compose.yml       │
         │ orchestrates all         │
         └───────────────────────────┘
```

---

## Resume Scoring Algorithm Flow

```
Resume PDF + Job Description
            ↓
    ┌───────────────────┐
    │  Extract Resume   │
    │  Text from PDF    │
    │  (pdfplumber)     │
    └────────┬──────────┘
             │
    ┌────────▼──────────┐
    │   Clean Text      │
    │ • Remove special  │
    │ • Lowercase       │
    │ • Standardize     │
    └────────┬──────────┘
             │
        ┌────┴────┐
        │          │
    ┌───▼──────┐ ┌─▼─────────┐
    │ Keyword  │ │  Semantic │
    │ Match(50)│ │  Sim (50) │
    │          │ │           │
    │Extract KW│ │ Extract   │
    │Count     │ │ Embeddings│
    │matches   │ │ Cosine    │
    │Score: 60%│ │ Score:85% │
    └───┬──────┘ └─┬─────────┘
        │          │
        └────┬─────┘
             │
        Final Score = (60×0.5) + (85×0.5) = 72.5%
```

---

## Complete Application Workflow

```
STUDENT              HR               BACKEND           AI SERVICE        DATABASE
  │                  │                  │                   │               │
  ├─Apply Job───────────────────────→│                   │               │
  │                  │                  │──Extract Resume──→│               │
  │                  │                  │←─Score Returned──│               │
  │                  │                  ├─Save Score──────────────────────→│
  │                  │                  │                   │               │
  │                  ├─View Apps────────→│                   │               │
  │                  ├─See Scores───────→│←─Fetch + Score─────────────────│
  │                  │                  │                   │               │
  │                  ├─Shortlist────────→│─Mark Shortlist────────────────→│
  │                  │                  ├─Send Test Email   │               │
  │                  │                  │                   │               │
  ├─Get Email────────────────────────←│←─Test Link        │               │
  │                  │                  │                   │               │
  ├─Take Test───────────────────────→│                   │               │
  │ • Read Qs        │                  │─Get Questions────────────────────│
  │ • Write Code     │                  │                   │               │
  │ • Run Code───────────────────────→│─Send to Judge0    │               │
  │ • See Results    │◄─────────────────│←Returns Results   │               │
  │ • Submit─────────────────────────→│─Save Submission───────────────────│
  │                  │                  │                   │               │
  │                  ├─Review Results───→│                   │               │
  │                  ├─Evaluate────────→│─Calc Final Score──────────────────│
  │                  ├─Final Decision───→│                   │               │
```

Good luck with interviews! All documents created successfully. 🎯🚀
