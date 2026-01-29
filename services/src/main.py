from fastapi import FastAPI
from src.api.routes import router


app = FastAPI(title="Resume Scoring API")

app.include_router(router)

@app.get("/")
def home():
    return {"message": "AI Resume Scoring API is running successfully!"}
