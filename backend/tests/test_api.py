import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.storage_service import storage_service

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["project"] == "DIGIRAKSHA"
    assert data["initial_fraud_detection_rate"] == "0.172%"

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_initial_fraud_detection_rate_is_exact():
    # Reset storage to guarantee initial benchmark state
    storage_service.reset_to_baseline()
    
    response = client.get("/api/dashboard/summary")
    assert response.status_code == 200
    data = response.json()
    assert data["total_analyzed"] == 100000
    assert data["flagged_fraudulent"] == 172
    # Exact rate check: (172 / 100000) * 100 = 0.172
    assert data["fraud_detection_rate"] == 0.172

def test_analyze_transaction_legitimate():
    payload = {
        "amount": 450.0,
        "payment_method": "UPI",
        "transaction_type": "P2M (Peer-to-Merchant)",
        "hour_of_day": 14,
        "device_trust_score": 0.95,
        "transaction_velocity_1h": 1,
        "is_foreign_ip": False,
        "is_new_device": False
    }
    response = client.post("/api/transactions/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["risk_level"] == "Legitimate"
    assert data["decision_recommendation"] == "APPROVE"
    assert data["risk_score"] < 30.0

def test_analyze_transaction_high_risk():
    payload = {
        "amount": 150000.0,
        "payment_method": "Credit Card",
        "transaction_type": "International E-Commerce",
        "hour_of_day": 2,
        "device_trust_score": 0.15,
        "transaction_velocity_1h": 8,
        "is_foreign_ip": True,
        "is_new_device": True
    }
    response = client.post("/api/transactions/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["risk_level"] == "High Risk"
    assert data["decision_recommendation"] == "BLOCK_IMMEDIATELY"
    assert data["risk_score"] >= 70.0
    assert "quantum_state_telemetry" in data

def test_simulation_and_reset():
    # Reset storage to baseline first
    storage_service.reset_to_baseline()
    
    # Run simulation of 10 items
    sim_res = client.post("/api/demo/simulate", json={"batch_size": 10, "fraud_bias_ratio": 0.3})
    assert sim_res.status_code == 200
    sim_data = sim_res.json()
    assert sim_data["generated_count"] == 10
    assert sim_data["updated_summary"]["total_analyzed"] == 100010
    
    # Reset back to baseline
    reset_res = client.post("/api/demo/reset")
    assert reset_res.status_code == 200
    reset_data = reset_res.json()
    assert reset_data["total_analyzed"] == 100000
    assert reset_data["fraud_detection_rate"] == 0.172

def test_pipeline_status():
    response = client.get("/api/pipeline/status")
    assert response.status_code == 200
    data = response.json()
    assert len(data["stages"]) == 8
    assert data["stages"][4]["name"] == "Quantum Feature State Encoding"
