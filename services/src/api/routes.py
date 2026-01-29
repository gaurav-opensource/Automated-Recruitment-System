from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from src.controllers.resume_controller import (
    calculate_resume_score,
    extract_text_from_pdf
)

router = APIRouter(prefix="/resume", tags=["Resume Scoring"])


@router.post("/score")
async def score_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    pdf_bytes = await file.read()
    resume_text = extract_text_from_pdf(pdf_bytes)

    if not resume_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Failed to extract text from PDF."
        )

    return calculate_resume_score(resume_text, job_description)
