from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.settings import settings
from app.api.endpoints import router as api_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="DIGIRAKSHA - Quantum-Enhanced Digital Payment Fraud Detection REST API"
)

# Configure CORS for local development and demo access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_PREFIX)

@app.get("/")
def root_info():
    return {
        "project": "DIGIRAKSHA",
        "description": "Quantum-Enhanced Digital Payment Fraud Detection",
        "api_docs": "/docs",
        "health_check": f"{settings.API_PREFIX}/health",
        "dashboard_summary": f"{settings.API_PREFIX}/dashboard/summary",
        "initial_fraud_detection_rate": "0.172%",
        "status": "Online"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
