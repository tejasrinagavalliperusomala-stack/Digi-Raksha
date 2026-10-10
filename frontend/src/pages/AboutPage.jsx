import React from 'react';
import {
  Shield,
  Cpu,
  BookOpen,
  Code,
  Layers,
  Terminal,
  FileCode,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

export const AboutPage = () => {
  const apiEndpoints = [
    { method: 'GET', path: '/api/health', desc: 'System health check and mode diagnostic.' },
    { method: 'GET', path: '/api/dashboard/summary', desc: 'Real-time recalculated dashboard summary & metrics.' },
    { method: 'GET', path: '/api/transactions', desc: 'Query and filter transactions feed with pagination.' },
    { method: 'POST', path: '/api/transactions/analyze', desc: 'Executes hybrid classical-quantum inference on transaction payload.' },
    { method: 'POST', path: '/api/demo/simulate', desc: 'Injects controlled synthetic transaction batches and updates metrics.' },
    { method: 'POST', path: '/api/demo/reset', desc: 'Resets dataset to exact initial benchmark baseline (0.172% rate).' },
    { method: 'GET', path: '/api/pipeline/status', desc: 'Telemetry for all 8 classical and quantum processing stages.' },
    { method: 'GET', path: '/api/ml/metrics', desc: 'Evaluation benchmarks, confusion matrix, and feature importances.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, #0284c7 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}
          >
            <Shield size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              About DIGIRAKSHA
            </h2>
            <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              Quantum-Enhanced Digital Payment Fraud Detection Architecture
            </span>
          </div>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.65, maxWidth: '900px' }}>
          DIGIRAKSHA is a hybrid fintech cybersecurity framework engineered to protect modern real-time payment rails (such as UPI, IMPS, and high-frequency card gateways) against sophisticated, non-linear fraud signatures through a combination of classical machine learning and quantum feature kernel simulations.
        </p>
      </div>

      {/* RESEARCH BACKGROUND & FORMULATION */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px'
        }}
      >
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <BookOpen size={18} style={{ color: 'var(--cyber-cyan)' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              The FinTech Challenge & Quantum Motivation
            </h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '14px' }}>
            Digital payment volume in modern instant payment corridors exceeds hundreds of millions of daily transactions. While the overall fraud incidence remains small (benchmark: <strong>0.172%</strong>), fraudulent actors execute sophisticated multi-step evasion tactics—such as micro-burst velocities across proxy nodes—that exhibit non-linear correlation structures difficult for shallow linear classifiers to distinguish without high false-positive rates.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
            By mapping classical transaction attributes into high-dimensional quantum Hilbert state spaces using non-linear angle entanglers (ZZFeatureMap), quantum variational kernels compute state overlap distances (|⟨Φ(x)|Φ(x')⟩|²) that naturally isolate subtle anomaly clusters.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Cpu size={18} style={{ color: 'var(--quantum-violet)' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Hybrid System Architecture
            </h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Ingestion & Schema Guard:</strong> Pydantic v2 validation with sub-millisecond execution.</span>
            </li>
            <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Classical ML (XGBoost):</strong> Gradient boosted decision trees calibrated with scale_pos_weight.</span>
            </li>
            <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Quantum Simulator:</strong> 4-Qubit statevector feature kernel with angle encoding.</span>
            </li>
            <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Decision Engine:</strong> Calibrated weighted fusion: Score = 0.70 × P(xgb) + 0.30 × Q(anomaly).</span>
            </li>
          </ul>
        </div>
      </div>

      {/* REST API CONTRACTS */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
          <Code size={18} style={{ color: 'var(--text-accent)' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            REST API Contracts & Endpoints
          </h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px', width: '90px' }}>Method</th>
                <th style={{ padding: '10px 12px', width: '260px' }}>Endpoint</th>
                <th style={{ padding: '10px 12px' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {apiEndpoints.map((ep, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '10px 12px' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        background: ep.method === 'GET' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                        color: ep.method === 'GET' ? 'var(--cyber-cyan)' : 'var(--risk-legit)'
                      }}
                    >
                      {ep.method}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {ep.path}
                  </td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>
                    {ep.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
