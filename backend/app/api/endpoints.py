from datetime import datetime
from typing import Optional, List
from fastapi import APIRouter, HTTPException, Query
from app.schemas.transaction import (
    TransactionAnalysisRequest,
    TransactionAnalysisResult,
    TransactionItem,
    DashboardSummary,
    SimulationRequest,
    SimulationResponse,
    PipelineStatusResponse,
    PipelineStageInfo,
    RiskLevel
)
from app.services.storage_service import storage_service
from app.ml.xgboost_pipeline import fraud_pipeline
from app.ml.quantum_simulator import quantum_simulator

router = APIRouter()

@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "DIGIRAKSHA Hybrid Quantum Fraud Detection API",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0",
        "mode": "Demo Mode & Simulated Quantum Integration Active"
    }

@router.get("/dashboard/summary", response_model=DashboardSummary)
def get_dashboard_summary():
    return storage_service.get_dashboard_summary()

@router.get("/transactions", response_model=List[TransactionItem])
def list_transactions(
    risk_level: Optional[str] = Query(None, description="Filter by risk level"),
    payment_method: Optional[str] = Query(None, description="Filter by payment channel"),
    search: Optional[str] = Query(None, description="Search by ID or User/Merchant"),
    limit: int = Query(50, ge=1, le=200)
):
    txns = storage_service.transactions
    
    if risk_level and risk_level != "All":
        txns = [t for t in txns if t.risk_level.value.lower() == risk_level.lower()]
        
    if payment_method and payment_method != "All":
        txns = [t for t in txns if t.payment_method.lower() == payment_method.lower()]
        
    if search:
        s = search.lower()
        txns = [
            t for t in txns
            if s in t.id.lower() or s in t.sender_id.lower() or s in t.receiver_id.lower()
        ]
        
    return txns[:limit]

@router.get("/transactions/{transaction_id}", response_model=TransactionItem)
def get_transaction(transaction_id: str):
    for t in storage_service.transactions:
        if t.id == transaction_id:
            return t
    raise HTTPException(status_code=404, detail="Transaction not found")

@router.post("/transactions/analyze", response_model=TransactionAnalysisResult)
def analyze_transaction(request: TransactionAnalysisRequest):
    result = fraud_pipeline.analyze_transaction(request)
    
    # Record analyzed transaction into system storage to dynamically update live metrics
    is_flagged = (result.risk_level in [RiskLevel.HIGH_RISK, RiskLevel.SUSPICIOUS])
    status_str = "Blocked" if result.risk_level == RiskLevel.HIGH_RISK else ("Flagged for Review" if is_flagged else "Approved")
    
    item = TransactionItem(
        id=result.transaction_id,
        timestamp=result.timestamp,
        amount=result.amount,
        payment_method=result.payment_method,
        transaction_type=result.transaction_type,
        sender_id=request.sender_id or "USR-AUTO",
        receiver_id=request.receiver_id or "MER-AUTO",
        risk_level=result.risk_level,
        risk_score=result.risk_score,
        status=status_str,
        is_flagged=is_flagged
    )
    storage_service.record_analyzed_transaction(item)
    return result

@router.post("/demo/simulate", response_model=SimulationResponse)
def simulate_transactions(request: SimulationRequest):
    return storage_service.simulate_batch(
        batch_size=request.batch_size,
        fraud_bias_ratio=request.fraud_bias_ratio
    )

@router.post("/demo/reset")
def reset_demo_data():
    storage_service.reset_to_baseline()
    return {
        "message": "Demo data successfully reset to baseline.",
        "total_analyzed": storage_service.total_analyzed,
        "flagged_fraudulent": storage_service.flagged_fraudulent,
        "fraud_detection_rate": storage_service.get_fraud_detection_rate(),
        "status": "Initialized with exactly 0.172% baseline rate."
    }

@router.get("/pipeline/status", response_model=PipelineStatusResponse)
def get_pipeline_status():
    stages = [
        PipelineStageInfo(
            id=1,
            name="Digital Payment Ingestion",
            category="Classical",
            status="Operational",
            latency_ms=1.4,
            description="Asynchronous ingestion gateway for UPI / IMPS / Card ISO 8583 payment packet streams.",
            formula_or_method="REST / WebSocket streaming buffer",
            telemetry={"buffer_utilization": "14%", "packet_loss": 0.0}
        ),
        PipelineStageInfo(
            id=2,
            name="Schema Validation & Integrity",
            category="Classical",
            status="Operational",
            latency_ms=0.8,
            description="Pydantic validation, cryptographic signature verification, payload sanitization.",
            formula_or_method="Deterministic Pydantic v2 type enforcement",
            telemetry={"valid_schema_rate": "100%", "checksum": "SHA-256 Valid"}
        ),
        PipelineStageInfo(
            id=3,
            name="Feature Extraction & Scaling",
            category="Classical",
            status="Operational",
            latency_ms=2.1,
            description="Log-amount transformation, velocity aggregation, time-harmonic encoding, device fingerprinting.",
            formula_or_method="x_scaled = log10(amt) / 6.0, theta in [0, 2*pi]",
            telemetry={"engineered_features": 18, "scaling_method": "StandardScaler + AngleNorm"}
        ),
        PipelineStageInfo(
            id=4,
            name="Classical XGBoost Classifier",
            category="Classical",
            status="Operational",
            latency_ms=4.2,
            description="Ensemble gradient boosted tree classifier trained on imbalanced transaction distributions.",
            formula_or_method="y_hat = sum(f_k(x)), loss = Logistic Loss + L2 Reg",
            telemetry={"trees": 150, "max_depth": 6, "base_score": 0.05}
        ),
        PipelineStageInfo(
            id=5,
            name="Quantum Feature State Encoding",
            category="Quantum",
            status="Simulated Stage",
            latency_ms=3.5,
            description="Simulated 4-qubit ZZFeatureMap encoding non-linear interactions into Hilbert state space.",
            formula_or_method="|phi(x)> = exp(i sum x_i Z_i + i sum (pi-x_i)(pi-x_j) Z_i Z_j) H|0>",
            telemetry={"qubits": 4, "state_dimension": "2^4 = 16", "entangling_gates": 6}
        ),
        PipelineStageInfo(
            id=6,
            name="Quantum Variational Kernel (VQC)",
            category="Quantum",
            status="Simulation / Integration Pending",
            latency_ms=5.0,
            description="Computes quantum state fidelity distance against canonical fraud cluster density matrices.",
            formula_or_method="K(x, x_fraud) = |<phi(x)|phi(x_fraud)>|^2",
            telemetry={"backend": "Statevector Simulator (Hardware QPU pending)", "circuit_depth": 14}
        ),
        PipelineStageInfo(
            id=7,
            name="Hybrid Fusion Decision Layer",
            category="Hybrid",
            status="Operational",
            latency_ms=0.9,
            description="Calibrated weighted ensemble combining classical gradient boost and quantum kernel anomaly metric.",
            formula_or_method="Score = 0.70 * P_xgb + 0.30 * Q_anomaly",
            telemetry={"weight_classical": 0.70, "weight_quantum": 0.30}
        ),
        PipelineStageInfo(
            id=8,
            name="Telemetry & Audit Logging",
            category="Classical",
            status="Operational",
            latency_ms=0.6,
            description="Audit trail recording, alert broadcasting, SOC dashboard metrics propagation.",
            formula_or_method="Real-time in-memory event stream + REST broadcast",
            telemetry={"retention": "InMemory (Live)", "audit_level": "SOC-2 Ready"}
        )
    ]
    return PipelineStatusResponse(
        overall_status="Operational (Hybrid Simulation Active)",
        pipeline_mode="Hybrid Classical-Quantum Simulation",
        quantum_backend="Simulated Statevector (ZZ-Map 4-Qubit)",
        stages=stages,
        last_health_check=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    )

@router.get("/ml/metrics")
def get_ml_metrics():
    return fraud_pipeline.get_evaluation_metrics()
