from enum import Enum
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class PaymentMethod(str, Enum):
    UPI = "UPI"
    CREDIT_CARD = "Credit Card"
    NET_BANKING = "Net Banking"
    DEBIT_CARD = "Debit Card"
    DIGITAL_WALLET = "Digital Wallet"
    CROSS_BORDER = "Cross-Border / Wire"

class TransactionType(str, Enum):
    P2P = "P2P (Peer-to-Peer)"
    P2M = "P2M (Peer-to-Merchant)"
    BILL_PAYMENT = "Bill Payment"
    CASH_OUT = "Cash Out / ATM"
    INTERNATIONAL = "International E-Commerce"

class RiskLevel(str, Enum):
    LEGITIMATE = "Legitimate"
    SUSPICIOUS = "Suspicious"
    HIGH_RISK = "High Risk"

class TransactionAnalysisRequest(BaseModel):
    amount: float = Field(..., gt=0, description="Transaction amount in local currency (INR)")
    payment_method: PaymentMethod = Field(..., description="Payment channel or method")
    transaction_type: TransactionType = Field(..., description="Type of transaction")
    hour_of_day: int = Field(12, ge=0, le=23, description="Hour of the day (0-23)")
    device_trust_score: float = Field(0.85, ge=0.0, le=1.0, description="Device fingerprint trust score (0.0 to 1.0)")
    transaction_velocity_1h: int = Field(1, ge=0, le=50, description="Transactions count from this entity in the last hour")
    is_foreign_ip: bool = Field(False, description="Whether the IP address originates from outside expected geo-region")
    is_new_device: bool = Field(False, description="Whether device is newly seen within 24h")
    sender_id: Optional[str] = Field("USR-882194", description="Masked sender ID or VPA")
    receiver_id: Optional[str] = Field("MER-739201", description="Masked recipient ID or VPA")

class RiskFactor(BaseModel):
    feature: str
    impact: str  # "HIGH", "MEDIUM", "LOW", "NEUTRAL"
    description: str
    weight: float

class TransactionAnalysisResult(BaseModel):
    transaction_id: str
    timestamp: str
    amount: float
    payment_method: str
    transaction_type: str
    risk_level: RiskLevel
    risk_score: float = Field(..., ge=0.0, le=100.0, description="Overall calibrated risk score (0-100)")
    classical_model_probability: float = Field(..., ge=0.0, le=1.0, description="Raw XGBoost prediction confidence/probability")
    quantum_anomaly_index: float = Field(..., ge=0.0, le=1.0, description="Simulated Quantum Feature Kernel distance score")
    quantum_stage_status: str = "Simulation / Integration Pending"
    model_source: str = "Hybrid XGBoost + Quantum Kernel Simulator"
    decision_recommendation: str  # "APPROVE", "STEP_UP_AUTH", "BLOCK_IMMEDIATELY"
    risk_factors: List[RiskFactor]
    processing_time_ms: float
    quantum_state_telemetry: Dict[str, Any]

class TransactionItem(BaseModel):
    id: str
    timestamp: str
    amount: float
    payment_method: str
    transaction_type: str
    sender_id: str
    receiver_id: str
    risk_level: RiskLevel
    risk_score: float
    status: str  # "Approved", "Flagged for Review", "Blocked"
    is_flagged: bool

class DashboardSummary(BaseModel):
    total_analyzed: int
    flagged_fraudulent: int
    fraud_detection_rate: float  # Exactly (flagged / total) * 100
    high_risk_count: int
    suspicious_count: int
    legitimate_count: int
    average_risk_score: float
    last_updated: str
    is_demo_mode: bool = True
    volume_by_channel: Dict[str, int]
    risk_distribution: Dict[str, int]
    timeline_series: List[Dict[str, Any]]
    recent_flagged: List[TransactionItem]

class SimulationRequest(BaseModel):
    batch_size: int = Field(10, ge=1, le=100, description="Number of synthetic transactions to generate")
    fraud_bias_ratio: float = Field(0.08, ge=0.0, le=0.5, description="Ratio of fraudulent anomalies in synthetic batch")

class SimulationResponse(BaseModel):
    message: str
    generated_count: int
    new_flagged_count: int
    updated_summary: DashboardSummary
    batch_sample: List[TransactionItem]

class PipelineStageInfo(BaseModel):
    id: int
    name: str
    category: str  # "Classical", "Quantum", "Hybrid"
    status: str    # "Operational", "Simulated Stage", "Integration Pending"
    latency_ms: float
    description: str
    formula_or_method: str
    telemetry: Dict[str, Any]

class PipelineStatusResponse(BaseModel):
    overall_status: str
    pipeline_mode: str
    quantum_backend: str
    stages: List[PipelineStageInfo]
    last_health_check: str
