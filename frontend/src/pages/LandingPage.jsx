import React from 'react';
import {
  ShieldCheck,
  Zap,
  Cpu,
  Lock,
  Layers,
  Activity,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import CyberButton from '../components/common/CyberButton';
import DecryptedText from '../components/common/DecryptedText';
import QuantumRadarCanvas from '../components/common/QuantumRadarCanvas';
import StatusBadge from '../components/common/StatusBadge';

export const LandingPage = ({ onLaunchDashboard }) => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavAction = (target) => {
    if (target === 'dashboard') {
      onLaunchDashboard();
    } else {
      scrollTo(target);
    }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', background: 'var(--bg-primary)' }}>
      {/* Dynamic Backgrounds */}
      <div className="cyber-grid-bg" />
      <div className="radial-gradient-overlay" />

      {/* Sticky Navigation */}
      <Navbar onNavigate={handleNavAction} />

      {/* HERO SECTION */}
      <section
        id="home"
        style={{
          position: 'relative',
          padding: '80px 24px 100px',
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center',
          zIndex: 1
        }}
      >
        <div>
          {/* Top Pill Badge */}
          <div style={{ marginBottom: '20px' }}>
            <span
              className="badge-pill badge-quantum"
              style={{
                padding: '6px 14px',
                fontSize: '0.82rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Cpu size={15} />
              <span>Next-Gen FinTech Cybersecurity Engine</span>
            </span>
          </div>

          {/* Main Title & Decrypted Sub-Reveal */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '20px',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)'
            }}
          >
            Every Transaction.{' '}
            <span className="gradient-text-cyber">Protected by Intelligence.</span>
          </h1>

          <p
            style={{
              fontSize: '1.12rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: '36px',
              maxWidth: '560px'
            }}
          >
            DIGIRAKSHA combines classical machine learning with a hybrid quantum-enhanced detection approach to help identify suspicious digital payment activity in real-time.
          </p>

          {/* Interactive CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <CyberButton
              onClick={onLaunchDashboard}
              variant="primary"
              size="lg"
              icon={ArrowRight}
            >
              Launch Dashboard
            </CyberButton>

            <CyberButton
              onClick={() => scrollTo('how-it-works')}
              variant="secondary"
              size="lg"
              icon={Zap}
            >
              Explore How It Works
            </CyberButton>
          </div>

          {/* Live Baseline Stats Ticker */}
          <div
            style={{
              marginTop: '44px',
              paddingTop: '28px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px'
            }}
          >
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-accent)' }}>
                100,000+
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Transactions Evaluated</div>
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--risk-legit)' }}>
                0.172%
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Baseline Fraud Flag Rate</div>
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--quantum-violet)' }}>
                &lt; 20 ms
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Inference Latency</div>
            </div>
          </div>
        </div>

        {/* Hero Interactive Radar Visual */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <div
            className="glass-panel"
            style={{
              padding: '24px',
              borderRadius: 'var(--radius-lg)',
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
              maxWidth: '480px',
              border: '1px solid var(--border-glow)',
              boxShadow: 'var(--glow-cyan)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="dot-indicator" style={{ background: '#10b981' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  Live Quantum Wavefront
                </span>
              </div>
              <StatusBadge status="Simulation Active" />
            </div>

            <QuantumRadarCanvas width={420} height={320} />

            <div
              style={{
                marginTop: '16px',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-tertiary)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <span style={{ color: 'var(--text-muted)' }}>Quantum Feature Map:</span>
              <span style={{ color: 'var(--cyber-cyan)', fontWeight: 600 }}>ZZFeatureMap (4-Qubits)</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        style={{
          padding: '80px 24px',
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="badge-pill badge-quantum" style={{ marginBottom: '12px' }}>
            Core Capabilities
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>
            Engineering Defense for the Modern UPI & Payment Era
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', fontSize: '1.02rem' }}>
            Multi-tiered architecture engineered to capture micro-burst velocity spikes, spoofed devices, and complex non-linear fraud signatures.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px'
          }}
        >
          {/* Card 1 */}
          <div className="glass-panel" style={{ padding: '30px 26px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(56, 189, 248, 0.15)',
                color: 'var(--cyber-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}
            >
              <ShieldCheck size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>
              Intelligent Fraud Detection
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Ensemble gradient boosted trees trained on imbalanced transaction distributions, isolating subtle behavioral anomalies with high precision.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel" style={{ padding: '30px 26px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(245, 158, 11, 0.15)',
                color: 'var(--risk-suspicious)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}
            >
              <Zap size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>
              Real-Time Risk Assessment
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Sub-20 millisecond decision loop delivering instant classification into Legitimate, Suspicious (Step-up Auth), or High Risk (Block).
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel" style={{ padding: '30px 26px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(168, 85, 247, 0.15)',
                color: 'var(--quantum-violet)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}
            >
              <Cpu size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>
              Hybrid Classical–Quantum Pipeline
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Modular statevector quantum kernel simulator projecting correlated multi-variable transactions into high-dimensional Hilbert feature spaces.
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-panel" style={{ padding: '30px 26px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--risk-legit)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}
            >
              <Layers size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>
              Explainable Transaction Analysis
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Transparent risk breakdown itemizing velocity spikes, device integrity discrepancies, temporal deviations, and geo-location anomalies.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section
        id="how-it-works"
        style={{
          padding: '80px 24px',
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="badge-pill badge-legit" style={{ marginBottom: '12px' }}>
            Processing Workflow
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>
            From Ingestion to Quantum Decision
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', fontSize: '1.02rem' }}>
            How incoming digital payment packets are evaluated across classical heuristics and simulated quantum variational feature kernels.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px'
          }}
        >
          {[
            {
              step: '01',
              title: 'Ingestion & Schema Check',
              desc: 'Incoming UPI / Card packet validated with strict cryptographic checks and deterministic schemas.'
            },
            {
              step: '02',
              title: 'Feature Transformation',
              desc: 'Log scaling of amount, calculation of 1-hour transaction velocity, and device fingerprint trust scoring.'
            },
            {
              step: '03',
              title: 'Classical XGBoost Inference',
              desc: 'Gradient boosted decision trees compute baseline probability calibrated for severe class imbalances.'
            },
            {
              step: '04',
              title: 'Quantum Kernel & Hybrid Fusion',
              desc: '4-qubit ZZ-feature map measures state fidelity; hybrid fusion outputs calibrated risk score and actionable recommendation.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '28px 22px',
                position: 'relative'
              }}
            >
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-accent)',
                  opacity: 0.4,
                  marginBottom: '12px'
                }}
              >
                {item.step}
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
                {item.title}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.55 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* QUANTUM PIPELINE HIGHLIGHT BANNER */}
      <section
        id="quantum-pipeline"
        style={{
          padding: '40px 24px 80px',
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div
          className="glass-panel-glow"
          style={{
            padding: '48px 36px',
            borderRadius: 'var(--radius-lg)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '36px',
            alignItems: 'center'
          }}
        >
          <div>
            <span className="badge-pill badge-quantum" style={{ marginBottom: '14px' }}>
              Academic & Research Transparency
            </span>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '14px', color: 'var(--text-primary)' }}>
              Modular Classical-Quantum Co-Design
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.65, marginBottom: '24px' }}>
              In compliance with rigorous scientific principles, DIGIRAKSHA clearly labels physical quantum execution vs mathematical statevector simulation. The quantum variational classifier is built as a pluggable integration ready for physical superconducting QPUs.
            </p>
            <CyberButton
              onClick={onLaunchDashboard}
              variant="quantum"
              size="md"
              icon={ArrowRight}
            >
              View Quantum Pipeline Visualizer
            </CyberButton>
          </div>

          <div
            style={{
              background: 'var(--bg-tertiary)',
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.84rem'
            }}
          >
            <div style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>// Statevector Mathematical Formulation</div>
            <div style={{ color: 'var(--quantum-purple)', marginBottom: '8px' }}>
              |Φ(x)⟩ = U_Φ(x) |0⟩^⊗4
            </div>
            <div style={{ color: 'var(--cyber-cyan)', marginBottom: '12px' }}>
              K(x, x') = |⟨Φ(x)|Φ(x')⟩|²
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', color: 'var(--text-secondary)' }}>
              <span>Entanglement Map:</span>
              <span style={{ color: 'var(--text-accent)' }}>ZZ Interaction</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', color: 'var(--text-secondary)' }}>
              <span>Simulated Qubits:</span>
              <span style={{ color: 'var(--text-accent)' }}>4 (Amount, Trust, Vel, Geo)</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="about"
        style={{
          borderTop: '1px solid var(--border-color)',
          background: 'var(--bg-secondary)',
          padding: '60px 24px 40px',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '40px',
            marginBottom: '40px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'linear-gradient(135deg, #0284c7 0%, #7c3aed 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}
              >
                <ShieldCheck size={18} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                DIGI<span className="gradient-text-cyber">RAKSHA</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: 1.6 }}>
              Quantum-Enhanced Digital Payment Fraud Detection system engineered for secure, intelligent fintech infrastructure.
            </p>
          </div>

          <div>
            <h5 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '14px' }}>
              Architecture Stack
            </h5>
            <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Frontend: React, Vite, Recharts, CSS Design System</li>
              <li>Backend: Python, FastAPI REST Framework</li>
              <li>Machine Learning: XGBoost Classifier, Scikit-Learn</li>
              <li>Quantum Engine: ZZ-Map Statevector Simulator</li>
            </ul>
          </div>

          <div>
            <h5 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '14px' }}>
              Academic & Demo Disclaimer
            </h5>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.55 }}>
              This project is built for research demonstration. The baseline metric of 0.172% represents the proportion of analyzed transactions flagged as fraudulent in simulated benchmark datasets.
            </p>
          </div>
        </div>

        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.82rem',
            color: 'var(--text-muted)'
          }}
        >
          <span>&copy; 2026 DIGIRAKSHA. Built with Quantum-Enhanced FinTech Intelligence.</span>
          <span>Version 1.0.0 — Production Grade Prototype</span>
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;
