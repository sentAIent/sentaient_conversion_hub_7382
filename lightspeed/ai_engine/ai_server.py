from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import uvicorn
from transformer_models import AIEngine
import logging
import psutil
import os

# Initialize FastAPI app
app = FastAPI(title="LightSpeed AI Engine", description="Hugging Face Transformers Microservice")
engine = AIEngine()

# Enforce strict CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://lightspeed.sentaient.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

class ErrorTrace(BaseModel):
    logs: str = Field(..., min_length=1, max_length=10000)

class TextPayload(BaseModel):
    text: str = Field(..., min_length=1, max_length=50000)

class ImagePayload(BaseModel):
    image_path: str = Field(..., min_length=1, max_length=1000)

@app.post("/csp-report")
async def csp_report(request: Request):
    """
    Endpoint to collect Content Security Policy violations from the client.
    """
    try:
        report = await request.json()
        logging.warning(f"CSP Violation: {report}")
        return {"status": "recorded"}
    except Exception as e:
        logging.error(f"Error parsing CSP report: {e}")
        return {"status": "error"}

@app.get("/telemetry/memory")
def get_memory_telemetry():
    """
    Returns memory allocation metrics for the AI Engine container.
    """
    process = psutil.Process(os.getpid())
    memory_info = process.memory_info()
    return {
        "rss_mb": memory_info.rss / 1024 / 1024,
        "vms_mb": memory_info.vms / 1024 / 1024,
        "cpu_percent": process.cpu_percent()
    }

class CompanyProfile(BaseModel):
    industry: str = Field(..., min_length=2, max_length=100)
    operating_regions: list[str]
    products_services: list[str]

@app.post("/generate-compliance-checklist")
def generate_compliance_checklist(profile: CompanyProfile):
    """
    Mock AI endpoint that generates compliance tasks based on company profile.
    """
    tasks = [
        {
            "title": "Register as Foreign Entity",
            "description": f"Must register in jurisdictions where operating: {', '.join(profile.operating_regions)}",
            "status": "To Do",
            "jurisdiction": "State",
            "required_role": "admin"
        },
        {
            "title": "File Annual Report",
            "description": "Standard annual corporate filing requirement.",
            "status": "To Do",
            "jurisdiction": "Federal",
            "required_role": "admin"
        }
    ]
    if profile.industry.lower() in ['healthcare', 'health tech']:
        tasks.append({
            "title": "HIPAA Compliance Audit",
            "description": "Ensure BAA agreements are in place for all subprocessors.",
            "status": "To Do",
            "jurisdiction": "Federal",
            "required_role": "secops"
        })
    if 'eu' in [r.lower() for r in profile.operating_regions]:
        tasks.append({
            "title": "GDPR DPA Review",
            "description": "Review Data Processing Agreements for EU citizens.",
            "status": "To Do",
            "jurisdiction": "International",
            "required_role": "ciso"
        })
    return {"tasks": tasks}

@app.post("/trigger-crawl")
async def trigger_crawl():
    """
    Triggers the Crawlee bot to scrape regulatory sources and returns the newly found compliance tasks/alerts.
    """
    try:
        from crawlers.regulations_crawler import run_compliance_crawler
        # Run the crawler
        scraped_updates = await run_compliance_crawler()
        
        # Transform scraped data into tasks and alerts
        new_tasks = []
        new_alerts = []
        
        for item in scraped_updates:
            new_tasks.append({
                "title": f"Review: {item['title']}",
                "description": f"Source: {item['source']} - {item['content']}",
                "status": "To Do",
                "jurisdiction": item.get("jurisdiction", "Federal"),
                "required_role": "ciso"
            })
            new_alerts.append({
                "message": f"New Regulation Detected: {item['title']}",
                "severity": item.get("severity", "high")
            })
            
        return {"tasks": new_tasks, "alerts": new_alerts}
    except Exception as e:
        logging.error(f"Error running crawler: {e}")
        raise HTTPException(status_code=500, detail=str(e))

class RepoScanPayload(BaseModel):
    repo_url: str

@app.post("/scan-repository")
def scan_repository(payload: RepoScanPayload):
    """
    Mocks a GitNexus codebase scan. Analyzes dependencies and data flows for compliance issues.
    """
    # In a real app, this would use `gitnexus analyze` locally or via MCP.
    mock_tasks = [
        {
            "title": "GDPR PII Leak in User Model",
            "description": "GitNexus detected unencrypted user email addresses being logged in src/utils/logger.js.",
            "status": "To Do",
            "jurisdiction": "International",
            "required_role": "devops"
        },
        {
            "title": "Open Source License Violation",
            "description": "Dependency 'left-pad-gpl' violates company policy of only using MIT/Apache licenses.",
            "status": "To Do",
            "jurisdiction": "Federal",
            "required_role": "secops"
        }
    ]
    return {"tasks": mock_tasks}

@app.post("/auto-remediate")
async def auto_remediate():
    """
    Simulates using Browser-Use and LangGraph to autonomously log into a cloud console
    and execute a remediation playbook.
    """
    logging.info("Initializing Browser-Use agent for AWS console remediation...")
    logging.info("Checking Solvent Wallet for auto-spend limit...")
    logging.info("Purchased premium threat-intel from CrowdStrike for $0.15 (Deducted from Wallet)")
    logging.info("LangGraph orchestrating steps: Login -> Navigate to WAF -> Block IP -> Verify")
    
    return {
        "status": "success",
        "message": "Autonomous remediation executed via Browser-Use and LangGraph.",
        "financials": {
            "cost_incurred": 0.15,
            "vendor": "CrowdStrike API"
        },
        "steps_taken": ["Logged in", "Navigated to AWS WAF", "Blocked IP 192.168.1.55", "Verified blocking rules"]
    }

@app.post("/sync-helu-financials")
def sync_helu():
    """
    Simulates transmitting wallet transaction history and risk API costs to Helu.
    """
    logging.info("Transmitting Q4 budget data to Helu...")
    return {"status": "synced", "message": "Financial data successfully exported to Helu."}

@app.post("/transmit-legal-eagle")
def transmit_legal_eagle():
    """
    Simulates securely transmitting a compliance PDF to external legal counsel.
    """
    logging.info("Transmitting SOC2 report to Legal Eagle portal via secure webhook...")
    return {"status": "transmitted", "message": "Compliance report securely sent to external counsel."}

@app.post("/remember-preference")
def remember_preference(preference: str):
    """
    Simulates using Mem0 to store a CISO's preference across sessions.
    """
    # Mocking mem0ai integration
    # e.g., m = Memory(); m.add(preference, user_id="ciso_1")
    logging.info(f"Mem0 storing preference: {preference}")
    
    return {"status": "stored", "memory": preference}

class PhishingRequest(BaseModel):
    trend: str
    target_count: int

@app.post("/generate-phishing-campaign")
def generate_phishing_campaign(req: PhishingRequest):
    """
    Simulates AI generating a personalized phishing test based on trends and dispatching via SES.
    """
    themes = {
        "tax": ("URGENT: W2 Form Update Required", "hr@company-secure-portal.com"),
        "hr": ("Mandatory Security Awareness Training", "compliance@internal-portal.net"),
        "it": ("Password Expiration Notice - Action Required", "it-support@it-desk.io")
    }
    
    subject, sender = themes.get(req.trend.lower(), ("Urgent Account Update", "admin@secure-update.com"))
    
    body = f"Hello,\n\nPlease click the link below to verify your recent activity regarding {req.trend}. Failure to do so will result in account suspension.\n\n[Tracked SES Link: https://auth-verify-sentaient.com/t/1x9f]\n\nThank you,\nManagement"
    
    logging.info(f"Dispatching AWS SES phishing campaign to {req.target_count} targets...")
    
    return {
        "campaign": {
            "name": f"Q4 {req.trend.upper()} Live Simulation",
            "trend_theme": req.trend,
            "email_subject": subject,
            "sender_spoof": sender,
            "email_body": body,
            "target_count": req.target_count
        }
    }

@app.get("/phishing/track/{event_type}/{target_id}")
def phishing_webhook(event_type: str, target_id: str):
    """
    Simulates a webhook from AWS SES receiving an Open or Click event from an employee.
    """
    logging.info(f"Phishing Webhook Received: Target {target_id} triggered a {event_type.upper()} event.")
    return {"status": "recorded", "event": event_type, "target": target_id}

@app.get("/compile-report-data")
def compile_report_data(company_id: str):
    """
    Aggregates mock DB data into a JSON structure ready for client-side PDF generation.
    """
    # Mocking fetching all relevant SOC2/HIPAA data from DB
    return {
        "company_id": company_id,
        "report_date": "2026-09-14",
        "executive_summary": "All critical controls are active and passing. Geospatial threat map is operational.",
        "controls": [
            {"id": "CC1.1", "name": "Access Control", "status": "Passed"},
            {"id": "CC2.1", "name": "Incident Response", "status": "Passed"},
            {"id": "CC3.1", "name": "Risk Assessment", "status": "Passed"}
        ],
        "open_tasks": 2,
        "recent_alerts": 0
    }

@app.get("/health")
def health_check():
    return {"status": "ok", "mode": "mock" if engine.use_mock else "production"}

@app.post("/analyze-error")
def analyze_error(payload: ErrorTrace):
    """
    Takes a stack trace or error log and returns a human-readable Root Cause Analysis (RCA).
    """
    try:
        summary = engine.generate_rca(payload.logs)
        return {"summary": summary}
    except Exception as e:
        logging.error(f"Error generating RCA: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/redact-pii")
def redact_pii(payload: TextPayload):
    """
    Takes raw text, scans for PII (Names, Passwords, etc) using NER, and returns the redacted text.
    """
    try:
        result = engine.redact_pii(payload.text)
        return result
    except Exception as e:
        logging.error(f"Error redacting PII: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze-ui")
def analyze_ui(payload: ImagePayload):
    """
    Simulated Vision Transformer endpoint to detect UI regressions.
    """
    try:
        result = engine.analyze_ui_regression(payload.image_path)
        return result
    except Exception as e:
        logging.error(f"Error analyzing UI: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
