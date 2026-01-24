from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# Contact Form Models
class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=5000)

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_read: bool = False


# Resume Download Tracking Model
class ResumeDownload(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    downloaded_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    user_agent: Optional[str] = None
    ip_address: Optional[str] = None


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# ============ Contact Form Endpoints ============

@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact_form(input: ContactMessageCreate):
    """Submit a contact form message"""
    try:
        contact_obj = ContactMessage(**input.model_dump())
        
        # Convert to dict and serialize datetime to ISO string for MongoDB
        doc = contact_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        await db.contact_messages.insert_one(doc)
        logger.info(f"New contact message from {input.email}: {input.subject}")
        return contact_obj
    except Exception as e:
        logger.error(f"Error saving contact message: {e}")
        raise HTTPException(status_code=500, detail="Failed to save message")


@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    """Get all contact messages (for admin purposes)"""
    messages = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
    
    for msg in messages:
        if isinstance(msg.get('created_at'), str):
            msg['created_at'] = datetime.fromisoformat(msg['created_at'])
    
    return messages


# ============ Resume Download Tracking Endpoints ============

@api_router.post("/resume/download")
async def track_resume_download(user_agent: Optional[str] = None):
    """Track when resume is downloaded"""
    try:
        download_obj = ResumeDownload(user_agent=user_agent)
        
        doc = download_obj.model_dump()
        doc['downloaded_at'] = doc['downloaded_at'].isoformat()
        
        await db.resume_downloads.insert_one(doc)
        
        # Get total download count
        count = await db.resume_downloads.count_documents({})
        logger.info(f"Resume downloaded. Total downloads: {count}")
        
        return {"message": "Download tracked", "total_downloads": count}
    except Exception as e:
        logger.error(f"Error tracking resume download: {e}")
        raise HTTPException(status_code=500, detail="Failed to track download")


@api_router.get("/resume/stats")
async def get_resume_stats():
    """Get resume download statistics"""
    try:
        total_downloads = await db.resume_downloads.count_documents({})
        
        # Get recent downloads (last 30 days)
        thirty_days_ago = datetime.now(timezone.utc).replace(day=1).isoformat()
        recent_downloads = await db.resume_downloads.count_documents({
            "downloaded_at": {"$gte": thirty_days_ago}
        })
        
        return {
            "total_downloads": total_downloads,
            "recent_downloads": recent_downloads
        }
    except Exception as e:
        logger.error(f"Error getting resume stats: {e}")
        raise HTTPException(status_code=500, detail="Failed to get stats")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()