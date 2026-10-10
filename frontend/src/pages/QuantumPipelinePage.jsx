import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Zap,
  Info,
  Radio
} from 'lucide-react';
import { fetchPipelineStatus } from '../services/api';
import StatusBadge from '../components/common/StatusBadge';
import CyberButton from '../components/common/CyberButton';

export const QuantumPipelinePage = () => {
  const [pipelineData, setPipelineData] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);
  const [activePacketIndex, setActivePacketIndex] = useState(0);

  useEffect(() => {
    fetchPipelineStatus().then(data => {
      setPipelineData(data);
      if (data && data.stages && data.stages.length > 0) {
        setSelectedStage(data.stages[4]); // default to Quantum stage
      }
    });

    const interval = setInterval(() => {
      setActivePacketIndex(prev => (prev + 1) % 8);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  if (!pipelineData) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>Loading Quantum Pipeline architecture...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Header */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Hybrid Classical–Quantum Processing Pipeline
              </h2>
              <span className="badge-pill badge-quantum">
                {pipelineData.pipeline_mode}
              </span>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Modular 8-stage fraud inference pipeline combining gradient-boosted decision ensembles with quantum variational feature maps.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-tertiary)', padding: '8px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <Radio size={14} style={{ color: '#10b981', animation: 'pulseGlow 2s infinite' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Backend: <strong>{pipelineData.quantum_backend}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* SCIENTIFIC TRANSPARENCY NOTICE */}
      <div
        className="glass-panel"
        style={{
          padding: '16px 20px',
          borderLeft: '4px solid var(--quantum-violet)',
          background: 'rgba(168, 85, 247, 0.06)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <Info size={20} style={{ color: 'var(--quantum-violet)', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              Academic Integrity & QPU Integration Notice
            </h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              In accordance with ethical academic and industrial standards, DIGIRAKSHA clearly demarcates operational classical stages (FastAPI, XGBoost, Scikit-Learn) from the simulated 4-qubit ZZ-Map quantum kernel stage. The system executes statevector mathematics locally while maintaining a modular interface for physical Qiskit / IBM Quantum QPU hardware dispatch.
            </p>
          </div>
        </div>
      </div>

      {/* INTERACTIVE PIPELINE NODE MAP */}
      <div className="glass-panel" style={{ padding: '28px 20px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px' }}>
          Interactive Processing Stages
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            position: 'relative'
          }}
        >
          {pipelineData.stages.map((stage, idx) => {
            const isSelected = selectedStage?.id === stage.id;
            const isCurrentPacket = activePacketIndex === idx;

            return (
              <div
                key={stage.id}
                onClick={() => setSelectedStage(stage)}
                className="glass-panel"
                style={{
                  padding: '20px 16px',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-md)',
                  position: 'relative',
                  border: isSelected
                    ? '2px solid var(--cyber-cyan)'
                    : (stage.category === 'Quantum' ? '1px solid rgba(168, 85, 247, 0.3)' : '1px solid var(--border-color)'),
                  boxShadow: isSelected ? 'var(--glow-cyan)' : undefined,
                  background: isSelected ? 'var(--bg-tertiary)' : 'var(--bg-card)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {/* Packet Flow Indicator */}
                {isCurrentPacket && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '12px',
                      background: 'var(--cyber-cyan)',
                      color: '#000000',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      boxShadow: '0 0 10px #00f2fe'
                    }}
                  >
                    PACKET FLOW
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      color: 'var(--text-accent)'
                    }}
                  >
                    0{stage.id}
                  </span>

                  <span
                    className={`badge-pill ${
                      stage.category === 'Quantum'
                        ? 'badge-quantum'
                        : (stage.category === 'Hybrid' ? 'badge-legit' : 'badge-pill')
                    }`}
                    style={{ fontSize: '0.68rem', padding: '2px 8px' }}
                  >
                    {stage.category}
                  </span>
                </div>

                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  {stage.name}
                </h4>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  <Clock size={12} />
                  <span>{stage.latency_ms} ms</span>
                  <span>•</span>
                  <span style={{ color: stage.status === 'Operational' ? '#10b981' : '#a855f7' }}>
                    {stage.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SELECTED STAGE DETAILED INSPECTOR */}
      {selectedStage && (
        <div
          className="glass-panel-glow"
          style={{
            padding: '28px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'linear-gradient(135deg, #0284c7, #7c3aed)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.9rem'
                }}
              >
                0{selectedStage.id}
              </span>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {selectedStage.name}
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Category: {selectedStage.category} | Status: {selectedStage.status}
                </span>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '18px' }}>
              {selectedStage.description}
            </p>

            <div style={{ background: 'var(--bg-tertiary)', padding: '14px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Mathematical Method / Formulation:
              </span>
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--cyber-cyan)' }}>
                {selectedStage.formula_or_method}
              </code>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
              Stage Telemetry & State Payload
            </h4>
            <div className="code-box">
              <pre>{JSON.stringify(selectedStage.telemetry, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default QuantumPipelinePage;
