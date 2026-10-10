import os
from pydantic import BaseModel

class Settings(BaseModel):
    APP_NAME: str = "DIGIRAKSHA API"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    API_PREFIX: str = "/api"
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "*",
    ]
    MODEL_PATH: str = os.path.join(os.path.dirname(__file__), "..", "ml", "saved_models", "xgboost_fraud_model.joblib")
    
    # Baseline benchmark constants
    INITIAL_TOTAL_TRANSACTIONS: int = 100000
    INITIAL_FLAGGED_TRANSACTIONS: int = 172
    INITIAL_HIGH_RISK: int = 48
    INITIAL_SUSPICIOUS: int = 124

settings = Settings()
