import React, { useState } from 'react';
import {
  Zap,
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
  Cpu,
  RefreshCw,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';
import CyberButton from '../components/common/CyberButton';
import StatusBadge from '../components/common/StatusBadge';
import { useData } from '../context/DataContext';

export const AnalyzeTransaction = () => {
  const { analyzeTransaction } = useData();

  const [formData, setFormData] = useState({
    amount: 1500,
    payment_method: 'UPI',
    transaction_type: 'P2M (Peer-to-Merchant)',
    hour_of_day: 14,
    device_trust_score: 0.88,
    transaction_velocity_1h: 1,
    is_foreign_ip: false,
    is_new_device: false,
    sender_id: 'USR-882194',
    receiver_id: 'MER-739201'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [result, setResult] = useState(null);

  const presets = [
    {
      name: 'Normal Grocery UPI',
      type: 'legit',
      data: {
        amount: 350,
        payment_method: 'UPI',
        transaction_type: 'P2M (Peer-to-Merchant)',
        hour_of_day: 16,
        device_trust_score: 0.95,
        transaction_velocity_1h: 1,
        is_foreign_ip: false,
        is_new_device: false
      }
    },
    {
      name: 'Midnight Cross-border Burst',
      type: 'high',
      data: {
        amount: 145000,
        payment_method: 'Cross-Border / Wire',
        transaction_type: 'International E-Commerce',
        hour_of_day: 2,
        device_trust_score: 0.12,
        transaction_velocity_1h: 9,
        is_foreign_ip: true,
        is_new_device: true
      }
    },
    {
      name: 'Card Velocity Spike',
      type: 'suspicious',
      data: {
        amount: 28000,
        payment_method: 'Credit Card',
        transaction_type: 'International E-Commerce',
        hour_of_day: 19,
        device_trust_score: 0.45,
        transaction_velocity_1h: 5,
        is_foreign_ip: false,
        is_new_device: true
      }
    },
    {
      name: 'ATM Cash-Out Anomaly',
      type: 'suspicious',
      data: {
        amount: 49000,
        payment_method: 'Debit Card',
        transaction_type: 'Cash Out / ATM',
        hour_of_day: 23,
        device_trust_score: 0.50,
        transaction_velocity_1h: 4,
        is_foreign_ip: false,
        is_new_device: false
      }
    }
  ];

  const applyPreset = (presetData) => {
    setFormData(prev => ({ ...prev, ...presetData }));
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setResult(null);

    // Simulated multi-stage pipeline animation
    const stages = [
      'Stage 1: Cryptographic Ingestion & Schema Validation...',
      'Stage 2: Feature Transformation & Scaling...',
      'Stage 3: Running Classical XGBoost Inference...',
      'Stage 4: Encoding 4-Qubit ZZFeatureMap Quantum Angles...',
      'Stage 5: Computing Quantum Kernel Anomaly Fidelity...',
      'Stage 6: Hybrid Fusion & Calibrated Risk Decision...'
    ];

    for (let i = 0; i < stages.length; i++) {
      setProcessingStage(stages[i]);
      await new Promise(r => setTimeout(r, 160));
    }

    try {
      const res = await analyzeTransaction(formData);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
      setProcessingStage('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Interactive Transaction Analyzer
            </h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Submit real-time digital payment parameters to evaluate via XGBoost and simulated Quantum Variational Feature Kernels.
            </p>
          </div>
          <span className="badge-pill badge-quantum">
            Demo Mode — Simulated Results
          </span>
        </div>
      </div>

      {/* QUICK PRESETS BAR */}
      <div className="glass-panel" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <Sparkles size={16} style={{ color: 'var(--text-accent)' }} />
          <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Quick-Fill Scenario Presets:
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(p.data)}
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                padding: '7px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--text-accent)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
            >
              <span
                className="dot-indicator"
                style={{
                  background: p.type === 'legit' ? '#10b981' : (p.type === 'suspicious' ? '#f59e0b' : '#ef4444')
                }}
              />
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN FORM AND RESULTS GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '28px'
        }}
      >
        {/* FORM PANEL */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '18px' }}>
            Payment Parameters
          </h3>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Amount */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Transaction Amount (INR ₹)
              </label>
              <input
                type="number"
                min="1"
                step="any"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                className="cyber-input"
              />
            </div>

            {/* Channel & Type */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Payment Channel
                </label>
                <select
                  value={formData.payment_method}
                  onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                  className="cyber-select"
                >
                  <option value="UPI">UPI (Google Pay / PhonePe)</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Net Banking">Net Banking</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Digital Wallet">Digital Wallet</option>
                  <option value="Cross-Border / Wire">Cross-Border / Wire</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Transaction Type
                </label>
                <select
                  value={formData.transaction_type}
                  onChange={(e) => setFormData({ ...formData, transaction_type: e.target.value })}
                  className="cyber-select"
                >
                  <option value="P2P (Peer-to-Peer)">P2P (Peer-to-Peer)</option>
                  <option value="P2M (Peer-to-Merchant)">P2M (Merchant Pay)</option>
                  <option value="Bill Payment">Bill Payment</option>
                  <option value="Cash Out / ATM">Cash Out / ATM</option>
                  <option value="International E-Commerce">International E-Commerce</option>
                </select>
              </div>
            </div>

            {/* Velocity & Trust Score */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Velocity (Last 1 Hour)
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={formData.transaction_velocity_1h}
                  onChange={(e) => setFormData({ ...formData, transaction_velocity_1h: parseInt(e.target.value) || 0 })}
                  className="cyber-input"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Device Trust Score (0 - 1.0)
                </label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="1.0"
                  value={formData.device_trust_score}
                  onChange={(e) => setFormData({ ...formData, device_trust_score: parseFloat(e.target.value) || 0 })}
                  className="cyber-input"
                />
              </div>
            </div>

            {/* Hour of Day */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Hour of Day: {formData.hour_of_day}:00 HRS
              </label>
              <input
                type="range"
                min="0"
                max="23"
                value={formData.hour_of_day}
                onChange={(e) => setFormData({ ...formData, hour_of_day: parseInt(e.target.value) })}
                style={{ width: '100%', accentColor: 'var(--cyber-cyan)' }}
              />
            </div>

            {/* Checkbox Toggles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.is_foreign_ip}
                  onChange={(e) => setFormData({ ...formData, is_foreign_ip: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--cyber-cyan)' }}
                />
                Foreign IP / VPN Geo Anomaly
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.is_new_device}
                  onChange={(e) => setFormData({ ...formData, is_new_device: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--cyber-cyan)' }}
                />
                Unrecognized New Client Device (Within 24h)
              </label>
            </div>

            {/* Submit Button */}
            <div style={{ marginTop: '8px' }}>
              <CyberButton
                type="submit"
                variant="primary"
                size="lg"
                disabled={isProcessing}
                icon={Zap}
                style={{ width: '100%' }}
              >
                {isProcessing ? 'Executing Pipeline...' : 'Analyze Transaction'}
              </CyberButton>
            </div>
          </form>
        </div>

        {/* RESULTS & PROCESSING PANEL */}
        <div>
          {isProcessing && (
            <div className="glass-panel" style={{ padding: '36px 24px', textAlign: 'center' }}>
              <RefreshCw size={36} className="animate-radar" style={{ color: 'var(--text-accent)', margin: '0 auto 20px' }} />
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
                Evaluating Hybrid Pipeline
              </h4>
              <p style={{ color: 'var(--quantum-purple)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                {processingStage}
              </p>
            </div>
          )}

          {!isProcessing && !result && (
            <div className="glass-panel" style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Cpu size={40} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Awaiting Transaction Submission
              </h4>
              <p style={{ fontSize: '0.86rem', maxWidth: '340px', margin: '0 auto' }}>
                Fill in the payment parameters or select a quick-fill preset to trigger the hybrid classical-quantum detection pipeline.
              </p>
            </div>
          )}

          {!isProcessing && result && (
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Top Result Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
                <div>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    ID: {result.transaction_id}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <StatusBadge status={result.risk_level} />
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      Recommendation: <strong>{result.decision_recommendation}</strong>
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Latency</span>
                  <div style={{ fontSize: '0.88rem', fontFamily: 'var(--font-mono)', color: 'var(--text-accent)' }}>
                    {result.processing_time_ms} ms
                  </div>
                </div>
              </div>

              {/* Risk Score Gauge Breakdown */}
              <div style={{ background: 'var(--bg-tertiary)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Calibrated Hybrid Risk Score:
                  </span>
                  <span
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      color: result.risk_level === 'High Risk' ? '#ef4444' : (result.risk_level === 'Suspicious' ? '#f59e0b' : '#10b981')
                    }}
                  >
                    {result.risk_score} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ 100</span>
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${result.risk_score}%`,
                      background: result.risk_level === 'High Risk'
                        ? 'linear-gradient(90deg, #f59e0b, #ef4444)'
                        : (result.risk_level === 'Suspicious' ? 'linear-gradient(90deg, #10b981, #f59e0b)' : '#10b981'),
                      transition: 'width 0.5s ease'
                    }}
                  />
                </div>

                {/* Dual ML Breakdown */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.78rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Classical XGBoost Prob:</span>
                    <div style={{ fontWeight: 700, color: 'var(--cyber-cyan)' }}>{result.classical_model_probability}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Quantum Kernel Anomaly:</span>
                    <div style={{ fontWeight: 700, color: 'var(--quantum-violet)' }}>{result.quantum_anomaly_index}</div>
                  </div>
                </div>
              </div>

              {/* Explainable Risk Factors */}
              <div>
                <h5 style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
                  Contributing Risk Factors
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(result.risk_factors || []).map((factor, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-tertiary)',
                        borderLeft: `3px solid ${factor.impact === 'HIGH' ? '#ef4444' : (factor.impact === 'MEDIUM' ? '#f59e0b' : '#10b981')}`,
                        fontSize: '0.82rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>
                        <span>{factor.feature}</span>
                        <span style={{ color: factor.impact === 'HIGH' ? '#ef4444' : (factor.impact === 'MEDIUM' ? '#f59e0b' : '#10b981') }}>
                          {factor.impact}
                        </span>
                      </div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                        {factor.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantum Telemetry Footprint */}
              {result.quantum_state_telemetry && (
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <Cpu size={14} style={{ color: 'var(--quantum-violet)' }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--quantum-violet)' }}>
                      Quantum State Telemetry (Simulated QPU)
                    </span>
                  </div>
                  <div className="code-box" style={{ fontSize: '0.75rem', padding: '8px' }}>
                    <div>Qubits: {result.quantum_state_telemetry.num_qubits} | Depth: {result.quantum_state_telemetry.circuit_depth}</div>
                    <div>Angles (rad): [{result.quantum_state_telemetry.feature_angles_rad.map(a => a.toFixed(3)).join(', ')}]</div>
                    <div>Von Neumann Entropy: {result.quantum_state_telemetry.von_neumann_entropy}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AnalyzeTransaction;
