from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form, Header, Depends
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import uuid
import base64
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime, timezone
import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

UPLOADS_DIR = ROOT_DIR / "uploads"
UPLOADS_DIR.mkdir(exist_ok=True)

# MongoDB
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
OWNER_EMAIL = os.environ.get('OWNER_EMAIL', '')
ADMIN_TOKEN = os.environ.get('ADMIN_TOKEN', 'zenmarinero2026')

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

app = FastAPI(title="Zen Marinero API")
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


# ---------- Models ----------
class ReservationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    date: str  # ISO date
    time: str  # HH:MM
    guests: int = Field(ge=1, le=20)
    notes: Optional[str] = ""


class Reservation(ReservationCreate):
    id: str
    created_at: str
    status: str = "pending"


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    message: str


class Contact(ContactCreate):
    id: str
    created_at: str


class JobApplication(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    message: str
    cv_filename: Optional[str] = None
    created_at: str


# ---------- Admin auth ----------
def require_admin(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    token = authorization.split(" ", 1)[1]
    if token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid admin token")
    return True


# ---------- Email helper ----------
async def send_email_safe(subject: str, html: str, attachments: Optional[list] = None):
    if not RESEND_API_KEY or not OWNER_EMAIL:
        logger.info(f"Email skipped (no RESEND_API_KEY/OWNER_EMAIL): {subject}")
        return
    params = {
        "from": SENDER_EMAIL,
        "to": [OWNER_EMAIL],
        "subject": subject,
        "html": html,
    }
    if attachments:
        params["attachments"] = attachments
    try:
        await asyncio.to_thread(resend.Emails.send, params)
    except Exception as e:
        logger.error(f"Resend failed: {e}")


# ---------- Public routes ----------
@api_router.get("/")
async def root():
    return {"message": "Zen Marinero API", "status": "ok"}


@api_router.post("/reservations", response_model=Reservation)
async def create_reservation(payload: ReservationCreate):
    doc = {
        "id": str(uuid.uuid4()),
        **payload.model_dump(),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "pending",
    }
    await db.reservations.insert_one(doc.copy())
    html = f"""
    <h2>Nueva reserva - Zen Marinero</h2>
    <p><b>Nombre:</b> {doc['name']}</p>
    <p><b>Email:</b> {doc['email']}</p>
    <p><b>Teléfono:</b> {doc['phone']}</p>
    <p><b>Fecha:</b> {doc['date']} a las {doc['time']}</p>
    <p><b>Comensales:</b> {doc['guests']}</p>
    <p><b>Notas:</b> {doc.get('notes') or '-'}</p>
    """
    await send_email_safe(f"Nueva reserva: {doc['name']} ({doc['date']})", html)
    return Reservation(**doc)


@api_router.post("/contact", response_model=Contact)
async def create_contact(payload: ContactCreate):
    doc = {
        "id": str(uuid.uuid4()),
        **payload.model_dump(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.contacts.insert_one(doc.copy())
    html = f"""
    <h2>Nuevo mensaje de contacto</h2>
    <p><b>Nombre:</b> {doc['name']}</p>
    <p><b>Email:</b> {doc['email']}</p>
    <p><b>Teléfono:</b> {doc.get('phone') or '-'}</p>
    <p><b>Mensaje:</b></p>
    <p>{doc['message']}</p>
    """
    await send_email_safe(f"Contacto: {doc['name']}", html)
    return Contact(**doc)


@api_router.post("/jobs", response_model=JobApplication)
async def create_job_application(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    message: str = Form(...),
    cv: Optional[UploadFile] = File(None),
):
    job_id = str(uuid.uuid4())
    cv_filename = None
    cv_bytes = None
    if cv is not None:
        safe_name = cv.filename.replace("/", "_").replace("\\", "_")
        cv_filename = f"{job_id}_{safe_name}"
        cv_bytes = await cv.read()
        (UPLOADS_DIR / cv_filename).write_bytes(cv_bytes)

    doc = {
        "id": job_id,
        "name": name,
        "email": email,
        "phone": phone,
        "message": message,
        "cv_filename": cv_filename,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.jobs.insert_one(doc.copy())

    attachments = None
    if cv_bytes is not None and cv_filename is not None:
        attachments = [{
            "filename": cv.filename,
            "content": base64.b64encode(cv_bytes).decode("utf-8"),
        }]
    html = f"""
    <h2>Nueva solicitud de empleo - Zen Marinero</h2>
    <p><b>Nombre:</b> {doc['name']}</p>
    <p><b>Email:</b> {doc['email']}</p>
    <p><b>Teléfono:</b> {doc['phone']}</p>
    <p><b>Mensaje:</b></p>
    <p>{doc['message']}</p>
    """
    await send_email_safe(f"Empleo: {doc['name']}", html, attachments)
    return JobApplication(**doc)


# ---------- Admin routes ----------
@api_router.get("/admin/reservations", response_model=List[Reservation])
async def list_reservations(_: bool = Depends(require_admin)):
    items = await db.reservations.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return items


@api_router.get("/admin/contacts", response_model=List[Contact])
async def list_contacts(_: bool = Depends(require_admin)):
    items = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return items


@api_router.get("/admin/jobs", response_model=List[JobApplication])
async def list_jobs(_: bool = Depends(require_admin)):
    items = await db.jobs.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return items


@api_router.get("/admin/jobs/{job_id}/cv")
async def download_cv(job_id: str, _: bool = Depends(require_admin)):
    job = await db.jobs.find_one({"id": job_id}, {"_id": 0})
    if not job or not job.get("cv_filename"):
        raise HTTPException(status_code=404, detail="CV not found")
    path = UPLOADS_DIR / job["cv_filename"]
    if not path.exists():
        raise HTTPException(status_code=404, detail="CV file missing")
    return FileResponse(str(path), filename=job["cv_filename"])


@api_router.post("/admin/verify")
async def verify_admin(_: bool = Depends(require_admin)):
    return {"ok": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
