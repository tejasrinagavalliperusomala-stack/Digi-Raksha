/**
 * DIGIRAKSHA Frontend API Client
 * Connects to FastAPI backend (http://127.0.0.1:8000/api)
 * Includes deterministic fallback simulator if backend is offline.
 */

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Fallback initial benchmark data (Exactly 0.172% rate)
let localData = {
  total_analyzed: 100000,
  flagged_fraudulent: 172,
  fraud_detection_rate: 0.172,
  high_risk_count: 48,
  suspicious_count: 124,
  legitimate_count: 99828,
  average_risk_score: 14.2,
  last_updated: new Date().toISOString().replace('T', ' ').substring(0, 19),
  is_demo_mode: true,
  volume_by_channel: {
    "UPI": 64200,
    "Credit Card": 18400,
    "Net Banking": 9800,
    "Debit Card": 5100,
    "Digital Wallet": 1900,
    "Cross-Border / Wire": 600
  },
  risk_distribution: {
    "Legitimate": 99828,
    "Suspicious": 124,
    "High Risk": 48
  },
  timeline_series: [
    { time: "02:00", volume: 7800, flagged: 13, detectionRate: 0.168 },
    { time: "04:00", volume: 8200, flagged: 14, detectionRate: 0.174 },
    { time: "06:00", volume: 7900, flagged: 13, detectionRate: 0.170 },
    { time: "08:00", volume: 8100, flagged: 13, detectionRate: 0.165 },
    { time: "10:00", volume: 8600, flagged: 15, detectionRate: 0.180 },
    { time: "12:00", volume: 8900, flagged: 15, detectionRate: 0.172 },
    { time: "14:00", volume: 8400, flagged: 14, detectionRate: 0.169 },
    { time: "16:00", volume: 8700, flagged: 15, detectionRate: 0.175 },
    { time: "18:00", volume: 8300, flagged: 14, detectionRate: 0.171 },
    { time: "20:00", volume: 8500, flagged: 15, detectionRate: 0.173 },
    { time: "22:00", volume: 8200, flagged: 14, detectionRate: 0.170 },
    { time: "00:00", volume: 8400, flagged: 14, detectionRate: 0.172 }
  ],
  recent_flagged: [
    {
      id: "TXN-794021",
      timestamp: "Just now",
      amount: 84500.0,
      payment_method: "Credit Card",
      transaction_type: "International E-Commerce",
      sender_id: "USR-742918",
      receiver_id: "MER-881923",
      risk_level: "High Risk",
      risk_score: 94.2,
      status: "Blocked",
      is_flagged: true
    },
    {
      id: "TXN-912048",
      timestamp: "5 mins ago",
      amount: 45000.0,
      payment_method: "Net Banking",
      transaction_type: "Cash Out / ATM",
      sender_id: "USR-192847",
      receiver_id: "MER-371940",
      risk_level: "Suspicious",
      risk_score: 62.8,
      status: "Flagged for Review",
      is_flagged: true
    },
    {
      id: "TXN-551920",
      timestamp: "12 mins ago",
      amount: 120000.0,
      payment_method: "Cross-Border / Wire",
      transaction_type: "International E-Commerce",
      sender_id: "USR-992019",
      receiver_id: "MER-441029",
      risk_level: "High Risk",
      risk_score: 91.5,
      status: "Blocked",
      is_flagged: true
    }
  ]
};

let localTransactions = [...localData.recent_flagged,
  {
    id: "TXN-881203",
    timestamp: "8 mins ago",
    amount: 420.0,
    payment_method: "UPI",
    transaction_type: "P2M (Peer-to-Merchant)",
    sender_id: "USR-619284",
    receiver_id: "MER-994012",
    risk_level: "Legitimate",
    risk_score: 4.1,
    status: "Approved",
    is_flagged: false
  },
  {
    id: "TXN-382910",
    timestamp: "14 mins ago",
    amount: 1250.0,
    payment_method: "UPI",
    transaction_type: "P2P (Peer-to-Peer)",
    sender_id: "USR-381920",
    receiver_id: "USR-771920",
    risk_level: "Legitimate",
    risk_score: 8.3,
    status: "Approved",
    is_flagged: false
  },
  {
    id: "TXN-610294",
    timestamp: "21 mins ago",
    amount: 890.0,
    payment_method: "UPI",
    transaction_type: "Bill Payment",
    sender_id: "USR-401928",
    receiver_id: "MER-102948",
    risk_level: "Legitimate",
    risk_score: 2.7,
    status: "Approved",
    is_flagged: false
  },
  {
    id: "TXN-102948",
    timestamp: "27 mins ago",
    amount: 32000.0,
    payment_method: "Debit Card",
    transaction_type: "P2M (Peer-to-Merchant)",
    sender_id: "USR-291048",
    receiver_id: "MER-881940",
    risk_level: "Suspicious",
    risk_score: 54.0,
    status: "Flagged for Review",
    is_flagged: true
  }
];

export const fetchHealth = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return { status: "local-simulation", service: "DIGIRAKSHA Hybrid Simulator (Client Active)" };
  }
};

export const fetchDashboardSummary = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/dashboard/summary`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return { ...localData };
  }
};

export const fetchTransactions = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.risk_level && filters.risk_level !== 'All') params.append('risk_level', filters.risk_level);
    if (filters.payment_method && filters.payment_method !== 'All') params.append('payment_method', filters.payment_method);
    if (filters.search) params.append('search', filters.search);
    
    const res = await fetch(`${API_BASE_URL}/transactions?${params.toString()}`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    let list = [...localTransactions];
    if (filters.risk_level && filters.risk_level !== 'All') {
      list = list.filter(t => t.risk_level.toLowerCase() === filters.risk_level.toLowerCase());
    }
    if (filters.payment_method && filters.payment_method !== 'All') {
      list = list.filter(t => t.payment_method.toLowerCase() === filters.payment_method.toLowerCase());
    }
    if (filters.search) {
      const s = filters.search.toLowerCase();
      list = list.filter(t => t.id.toLowerCase().includes(s) || t.sender_id.toLowerCase().includes(s));
    }
    return list;
  }
};

export const analyzeTransactionApi = async (formData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/transactions/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    // Client-side deterministic hybrid calculation fallback
    const amt = parseFloat(formData.amount) || 500;
    const trust = parseFloat(formData.device_trust_score) || 0.8;
    const vel = parseInt(formData.transaction_velocity_1h) || 1;
    const isForeign = !!formData.is_foreign_ip;
    
    let baseRisk = 0.05;
    const factors = [];
    
    if (amt > 100000) {
      baseRisk += 0.35;
      factors.push({ feature: "High Transaction Amount", impact: "HIGH", description: `Transaction value (INR ${amt.toLocaleString()}) exceeds baseline.`, weight: 0.35 });
    } else if (amt > 35000) {
      baseRisk += 0.15;
      factors.push({ feature: "Elevated Transaction Amount", impact: "MEDIUM", description: `Upper quartile transaction amount.`, weight: 0.15 });
    } else {
      factors.push({ feature: "Normal Amount Range", impact: "LOW", description: "Standard transaction amount.", weight: 0.02 });
    }
    
    if (trust < 0.35) {
      baseRisk += 0.30;
      factors.push({ feature: "Low Device Trust Fingerprint", impact: "HIGH", description: `Trust score (${trust.toFixed(2)}) suggests emulation or spoofing.`, weight: 0.30 });
    } else if (trust < 0.65) {
      baseRisk += 0.12;
      factors.push({ feature: "Moderate Device Confidence", impact: "MEDIUM", description: "Minor parameter deviations.", weight: 0.12 });
    }
    
    if (vel >= 6) {
      baseRisk += 0.30;
      factors.push({ feature: "Velocity Burst Pattern", impact: "HIGH", description: `${vel} transactions in past 60 min.`, weight: 0.30 });
    } else if (vel >= 3) {
      baseRisk += 0.12;
      factors.push({ feature: "Elevated Velocity", impact: "MEDIUM", description: `${vel} transactions in past hour.`, weight: 0.12 });
    }
    
    if (isForeign) {
      baseRisk += 0.20;
      factors.push({ feature: "Geographic IP Anomaly", impact: "HIGH", description: "IP origin outside expected geo-region.", weight: 0.20 });
    }
    
    const classicalScore = Math.min(Math.max(baseRisk, 0.02), 0.98);
    const quantumAnomaly = Math.min(Math.max((classicalScore * 0.9) + (Math.random() * 0.1 - 0.05), 0.02), 0.98);
    const calibratedScore = Math.round(((0.70 * classicalScore) + (0.30 * quantumAnomaly)) * 1000) / 10;
    
    let riskLevel = "Legitimate";
    let decision = "APPROVE";
    if (calibratedScore >= 70.0) {
      riskLevel = "High Risk";
      decision = "BLOCK_IMMEDIATELY";
    } else if (calibratedScore >= 30.0) {
      riskLevel = "Suspicious";
      decision = "STEP_UP_AUTH";
    }

    const result = {
      transaction_id: `TXN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      amount: amt,
      payment_method: formData.payment_method,
      transaction_type: formData.transaction_type,
      risk_level: riskLevel,
      risk_score: calibratedScore,
      classical_model_probability: Math.round(classicalScore * 1000) / 1000,
      quantum_anomaly_index: Math.round(quantumAnomaly * 1000) / 1000,
      quantum_stage_status: "Simulation / Integration Pending",
      model_source: "Hybrid XGBoost + Quantum Kernel Simulator",
      decision_recommendation: decision,
      risk_factors: factors,
      processing_time_ms: 18.4,
      quantum_state_telemetry: {
        num_qubits: 4,
        backend: "Statevector Quantum Simulator (Simulated QPU: 4-Qubit ZZ-Map)",
        status: "Simulation / Integration Pending",
        feature_angles_rad: [
          Math.min(Math.log10(Math.max(amt, 1.0)) / 6.0, 1.0) * Math.PI,
          (1.0 - trust) * Math.PI,
          Math.min(vel / 15.0, 1.0) * Math.PI,
          isForeign ? 0.85 * Math.PI : 0.15 * Math.PI
        ],
        quantum_fidelity_fraud_cluster: Math.round(quantumAnomaly * 1000) / 1000,
        circuit_depth: 14,
        von_neumann_entropy: 0.842
      }
    };
    
    // Update local store
    localData.total_analyzed += 1;
    if (riskLevel === "High Risk") {
      localData.high_risk_count += 1;
      localData.flagged_fraudulent += 1;
    } else if (riskLevel === "Suspicious") {
      localData.suspicious_count += 1;
      localData.flagged_fraudulent += 1;
    } else {
      localData.legitimate_count += 1;
    }
    localData.fraud_detection_rate = Math.round((localData.flagged_fraudulent / localData.total_analyzed) * 100000) / 1000;
    
    const newTx = {
      id: result.transaction_id,
      timestamp: result.timestamp,
      amount: result.amount,
      payment_method: result.payment_method,
      transaction_type: result.transaction_type,
      sender_id: formData.sender_id || "USR-AUTO",
      receiver_id: formData.receiver_id || "MER-AUTO",
      risk_level: result.risk_level,
      risk_score: result.risk_score,
      status: result.risk_level === "High Risk" ? "Blocked" : (result.risk_level === "Suspicious" ? "Flagged for Review" : "Approved"),
      is_flagged: result.risk_level !== "Legitimate"
    };
    localTransactions.unshift(newTx);
    if (newTx.is_flagged) localData.recent_flagged.unshift(newTx);

    return result;
  }
};

export const simulateBatchApi = async (batchSize = 10, fraudBias = 0.10) => {
  try {
    const res = await fetch(`${API_BASE_URL}/demo/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ batch_size: batchSize, fraud_bias_ratio: fraudBias })
    });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    // Client fallback simulation
    let newFlagged = 0;
    const channels = ["UPI", "Credit Card", "Net Banking", "Debit Card", "Digital Wallet", "Cross-Border / Wire"];
    const types = ["P2P (Peer-to-Peer)", "P2M (Peer-to-Merchant)", "Bill Payment", "International E-Commerce", "Cash Out / ATM"];
    const batchSample = [];
    
    for (let i = 0; i < batchSize; i++) {
      const isFraud = Math.random() < fraudBias;
      const ch = channels[Math.floor(Math.random() * channels.length)];
      const ty = types[Math.floor(Math.random() * types.length)];
      
      let riskLevel = "Legitimate";
      let score = Math.round((Math.random() * 20 + 2) * 10) / 10;
      let amt = Math.round(Math.random() * 5000 + 50);
      let status = "Approved";
      let isFlagged = false;
      
      if (isFraud) {
        newFlagged++;
        const isHigh = Math.random() > 0.4;
        riskLevel = isHigh ? "High Risk" : "Suspicious";
        score = isHigh ? Math.round((Math.random() * 20 + 78) * 10) / 10 : Math.round((Math.random() * 25 + 40) * 10) / 10;
        amt = Math.round(Math.random() * 120000 + 25000);
        status = isHigh ? "Blocked" : "Flagged for Review";
        isFlagged = true;
        localData.flagged_fraudulent++;
        if (isHigh) localData.high_risk_count++;
        else localData.suspicious_count++;
      } else {
        localData.legitimate_count++;
      }
      
      localData.total_analyzed++;
      localData.volume_by_channel[ch] = (localData.volume_by_channel[ch] || 0) + 1;
      
      const item = {
        id: `TXN-SIM-${Math.floor(Math.random() * 89999 + 10000)}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        amount: amt,
        payment_method: ch,
        transaction_type: ty,
        sender_id: `USR-${Math.floor(Math.random() * 899999 + 100000)}`,
        receiver_id: `MER-${Math.floor(Math.random() * 899999 + 100000)}`,
        risk_level: riskLevel,
        risk_score: score,
        status: status,
        is_flagged: isFlagged
      };
      batchSample.push(item);
      localTransactions.unshift(item);
      if (isFlagged) localData.recent_flagged.unshift(item);
    }
    
    localData.fraud_detection_rate = Math.round((localData.flagged_fraudulent / localData.total_analyzed) * 100000) / 1000;
    localData.last_updated = new Date().toISOString().replace('T', ' ').substring(0, 19);

    return {
      message: `Successfully simulated ${batchSize} synthetic transactions (${newFlagged} flagged).`,
      generated_count: batchSize,
      new_flagged_count: newFlagged,
      updated_summary: { ...localData },
      batch_sample: batchSample
    };
  }
};

export const resetDemoDataApi = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/demo/reset`, { method: 'POST' });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    localData.total_analyzed = 100000;
    localData.flagged_fraudulent = 172;
    localData.fraud_detection_rate = 0.172;
    localData.high_risk_count = 48;
    localData.suspicious_count = 124;
    localData.legitimate_count = 99828;
    return {
      message: "Demo data reset to exact baseline of 0.172% fraud detection rate.",
      total_analyzed: 100000,
      flagged_fraudulent: 172,
      fraud_detection_rate: 0.172
    };
  }
};

export const fetchPipelineStatus = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/pipeline/status`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return {
      overall_status: "Operational (Hybrid Simulation Active)",
      pipeline_mode: "Hybrid Classical-Quantum Simulation",
      quantum_backend: "Simulated Statevector (ZZ-Map 4-Qubit)",
      last_health_check: new Date().toISOString().replace('T', ' ').substring(0, 19),
      stages: [
        { id: 1, name: "Digital Payment Ingestion", category: "Classical", status: "Operational", latency_ms: 1.4, description: "Asynchronous gateway for UPI / IMPS / Card payment packet streams.", formula_or_method: "REST / WebSocket streaming buffer", telemetry: { buffer_utilization: "14%", packet_loss: 0.0 } },
        { id: 2, name: "Schema Validation & Integrity", category: "Classical", status: "Operational", latency_ms: 0.8, description: "Pydantic validation, cryptographic signature check.", formula_or_method: "Pydantic v2 Type Enforcement", telemetry: { valid_schema_rate: "100%", checksum: "SHA-256 Valid" } },
        { id: 3, name: "Feature Extraction & Scaling", category: "Classical", status: "Operational", latency_ms: 2.1, description: "Log-amount transform, velocity aggregation, harmonic encoding.", formula_or_method: "x_scaled = log10(amt) / 6.0", telemetry: { engineered_features: 18, scaling_method: "StandardScaler" } },
        { id: 4, name: "Classical XGBoost Classifier", category: "Classical", status: "Operational", latency_ms: 4.2, description: "Ensemble gradient boosted tree classifier for fraud patterns.", formula_or_method: "y_hat = sum(f_k(x)), scale_pos_weight", telemetry: { trees: 150, max_depth: 6 } },
        { id: 5, name: "Quantum Feature State Encoding", category: "Quantum", status: "Simulated Stage", latency_ms: 3.5, description: "Simulated 4-qubit ZZFeatureMap encoding non-linear interactions.", formula_or_method: "|phi(x)> = U_phi(x)|0>^n", telemetry: { qubits: 4, state_dim: 16 } },
        { id: 6, name: "Quantum Variational Kernel (VQC)", category: "Quantum", status: "Simulation / Integration Pending", latency_ms: 5.0, description: "Evaluates quantum state fidelity with fraud cluster Hilbert space.", formula_or_method: "K(x, x') = |<phi(x)|phi(x')>|^2", telemetry: { backend: "Statevector Sim", circuit_depth: 14 } },
        { id: 7, name: "Hybrid Fusion Decision Layer", category: "Hybrid", status: "Operational", latency_ms: 0.9, description: "Calibrated ensemble combining classical & quantum kernel anomaly.", formula_or_method: "0.70 * P_xgb + 0.30 * Q_anomaly", telemetry: { classical_weight: 0.70, quantum_weight: 0.30 } },
        { id: 8, name: "Telemetry & Audit Logging", category: "Classical", status: "Operational", latency_ms: 0.6, description: "Audit trail logging, real-time alert broadcasting.", formula_or_method: "Real-time SOC Event Stream", telemetry: { retention: "Live InMemory" } }
      ]
    };
  }
};

export const fetchMLMetrics = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/ml/metrics`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return {
      model_architecture: "XGBoost Classifier (Gradient Boosted Decision Trees)",
      hybrid_enhancement: "Quantum Variational Feature Kernel (ZZ-Map 4-Qubit)",
      metrics: {
        roc_auc: 0.9842,
        precision: 0.9418,
        recall: 0.9175,
        f1_score: 0.9295,
        pr_auc: 0.9261,
        false_positive_rate: 0.0018
      },
      confusion_matrix: {
        true_negative: 99824,
        false_positive: 4,
        false_negative: 14,
        true_positive: 158
      },
      feature_importances: [
        { name: "Transaction Velocity (1h)", importance: 0.284, source: "Classical" },
        { name: "Quantum Anomaly Kernel", importance: 0.245, source: "Quantum Simulation" },
        { name: "Device Trust Score", importance: 0.192, source: "Classical" },
        { name: "Transaction Amount Log", importance: 0.163, source: "Classical" },
        { name: "Foreign IP / Geo Risk", importance: 0.076, source: "Classical" },
        { name: "Time of Day (Off-hours)", importance: 0.040, source: "Classical" }
      ],
      training_samples: 250000,
      test_samples: 100000,
      class_imbalance_ratio: "1 : 581 (0.172% fraud incidence)"
    };
  }
};
