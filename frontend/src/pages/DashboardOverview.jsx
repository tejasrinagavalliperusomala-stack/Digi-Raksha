import React, { useState } from 'react';
import {
  Activity,
  AlertOctagon,
  ShieldAlert,
  Percent,
  Play,
  RotateCcw,
  RefreshCw,
  Eye,
  Filter,
  ArrowUpRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import MetricCard from '../components/common/MetricCard';
import CyberButton from '../components/common/CyberButton';
import StatusBadge from '../components/common/StatusBadge';
import Modal from '../components/common/Modal';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';

export const DashboardOverview = ({ onNavigateToAnalyze }) => {
  const { summary, transactions, isSimulating, runSimulation, resetDemo, refreshData } = useData();
  const { isDark } = useTheme();
  const [selectedBatch, setSelectedBatch] = useState(10);
  const [activeTxnModal, setActiveTxnModal] = useState(null);

  if (!summary) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
        <RefreshCw size={28} className="animate-radar" style={{ margin: '0 auto 16px' }} />
        <p>Loading real-time financial intelligence telemetry...</p>
      </div>
    );
  }

  // Color palette for charts
  const riskColors = {
    Legitimate: '#10b981',
    Suspicious: '#f59e0b',
    'High Risk': '#ef4444'
  };

  const riskPieData = [
    { name: 'Legitimate', value: summary.legitimate_count, color: '#10b981' },
    { name: 'Suspicious', value: summary.suspicious_count, color: '#f59e0b' },
    { name: 'High Risk', value: summary.high_risk_count, color: '#ef4444' }
  ];

  const channelBarData = Object.entries(summary.volume_by_channel || {}).map(([name, count]) => ({
    name: name.split(' ')[0], // short name
    fullName: name,
    volume: count
  }));

  const chartGridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';
  const chartTextColor = isDark ? '#94a3b8' : '#475569';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Banner & Simulation Controls */}
      <div
        className="glass-panel"
        style={{
          padding: '20px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Security Operations Center (SOC)
            </h2>
            <span className="badge-pill badge-quantum" style={{ fontSize: '0.7rem' }}>
              Simulated Benchmark Mode
            </span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Real-time telemetry stream synchronized with hybrid classical-quantum inference engines.
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Batch:</span>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(Number(e.target.value))}
              className="cyber-select"
              style={{ width: '80px', padding: '6px 10px', fontSize: '0.84rem' }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <CyberButton
            onClick={() => runSimulation(selectedBatch, 0.20)}
            disabled={isSimulating}
            variant="primary"
            size="sm"
            icon={Play}
          >
            {isSimulating ? 'Simulating...' : 'Simulate Transactions'}
          </CyberButton>

          <CyberButton
            onClick={resetDemo}
            variant="secondary"
            size="sm"
            icon={RotateCcw}
            title="Reset dataset back to baseline 0.172% rate"
          >
            Reset Demo Data
          </CyberButton>
        </div>
      </div>

      {/* 4 CORE METRIC CARDS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px'
        }}
      >
        {/* 1. Total Transactions Analyzed */}
        <MetricCard
          title="Total Transactions Analyzed"
          value={summary.total_analyzed.toLocaleString()}
          description="Cumulative evaluated payment volume"
          icon={Activity}
          colorScheme="cyan"
          tooltip="Total number of digital transactions processed across all payment gateways."
        />

        {/* 2. Fraudulent Transactions Flagged */}
        <MetricCard
          title="Fraudulent Flagged"
          value={summary.flagged_fraudulent.toLocaleString()}
          description={`${summary.high_risk_count} High Risk + ${summary.suspicious_count} Suspicious`}
          icon={AlertOctagon}
          colorScheme="amber"
          tooltip="Combined sum of transactions categorized into High Risk (Blocked) and Suspicious (Step-Up Auth)."
        />

        {/* 3. Fraud Detection Rate (Flagged Transaction Rate) - INITIAL 0.172% */}
        <MetricCard
          title="Fraud Detection Rate"
          value={summary.fraud_detection_rate.toFixed(3)}
          suffix="%"
          description="Percentage of analyzed transactions flagged"
          icon={Percent}
          colorScheme="emerald"
          highlight={true}
          tooltip="Fraud Detection Rate = (Flagged Fraudulent Transactions / Total Analyzed Transactions) * 100. Initial baseline = 0.172%."
        />

        {/* 4. High-Risk Transactions */}
        <MetricCard
          title="High-Risk Transactions"
          value={summary.high_risk_count.toLocaleString()}
          description="Critical threats blocked immediately"
          icon={ShieldAlert}
          colorScheme="crimson"
          tooltip="Transactions evaluated with composite risk score >= 70, resulting in automatic payment termination."
        />
      </div>

      {/* CHARTS GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px'
        }}
      >
        {/* Chart 1: Fraud-Flag Rate Over Time */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Fraud Detection Rate Trend (24h)
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Hovering around the standard baseline of 0.172%
              </span>
            </div>
            <span className="badge-pill badge-legit" style={{ fontSize: '0.72rem' }}>
              Moving Avg
            </span>
          </div>

          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={summary.timeline_series || []}>
                <defs>
                  <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00f2fe" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                <XAxis dataKey="time" stroke={chartTextColor} fontSize={11} />
                <YAxis stroke={chartTextColor} fontSize={11} domain={[0.15, 0.20]} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: '8px',
                    fontSize: '0.82rem'
                  }}
                  formatter={(val) => [`${Number(val).toFixed(3)}%`, 'Detection Rate']}
                />
                <Area type="monotone" dataKey="detectionRate" stroke="#00f2fe" strokeWidth={2.5} fillOpacity={1} fill="url(#rateGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Channel Volume Distribution */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Volume by Payment Channel
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Distribution across UPI, Cards, Net Banking & Wire
              </span>
            </div>
          </div>

          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelBarData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                <XAxis dataKey="name" stroke={chartTextColor} fontSize={11} />
                <YAxis stroke={chartTextColor} fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: '8px',
                    fontSize: '0.82rem'
                  }}
                />
                <Bar dataKey="volume" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* RISK DISTRIBUTION & RECENT FEED */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px'
        }}
      >
        {/* Risk Breakdown Donut */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
            Risk Classification Ratio
          </h3>

          <div style={{ width: '100%', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: '8px',
                    fontSize: '0.82rem'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Transaction Action & Prompt */}
        <div className="glass-panel-glow" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Cpu size={18} style={{ color: 'var(--quantum-violet)' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--quantum-violet)', textTransform: 'uppercase' }}>
                Quantum-Enhanced Inference
              </span>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
              Interactive Transaction Analyzer
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Test custom digital payment payloads against the full XGBoost and simulated 4-qubit ZZ-Map quantum kernel pipeline.
            </p>
          </div>

          <div style={{ marginTop: '20px' }}>
            <CyberButton
              onClick={onNavigateToAnalyze}
              variant="quantum"
              size="md"
              icon={ArrowUpRight}
              style={{ width: '100%' }}
            >
              Open Transaction Analyzer
            </CyberButton>
          </div>
        </div>
      </div>

      {/* RECENT FLAGGED TRANSACTIONS FEED */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Recent Flagged Activity Feed
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Transactions requiring SOC review or step-up verification
            </span>
          </div>
          <span className="badge-pill badge-suspicious" style={{ fontSize: '0.72rem' }}>
            Live Feed
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px' }}>Transaction ID</th>
                <th style={{ padding: '10px 12px' }}>Amount (INR)</th>
                <th style={{ padding: '10px 12px' }}>Channel</th>
                <th style={{ padding: '10px 12px' }}>Type</th>
                <th style={{ padding: '10px 12px' }}>Risk Level</th>
                <th style={{ padding: '10px 12px' }}>Risk Score</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {(summary.recent_flagged || []).map((txn) => (
                <tr
                  key={txn.id}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    transition: 'background var(--transition-fast)'
                  }}
                  className="table-row-hover"
                >
                  <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-accent)' }}>
                    {txn.id}
                  </td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>
                    ₹{txn.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>
                    {txn.payment_method}
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-muted)' }}>
                    {txn.transaction_type}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <StatusBadge status={txn.risk_level} />
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    {txn.risk_score}
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>
                    {txn.status}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <button
                      onClick={() => setActiveTxnModal(txn)}
                      title="Inspect Telemetry"
                      style={{
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-accent)',
                        padding: '6px 10px',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.78rem'
                      }}
                    >
                      <Eye size={13} />
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TELEMETRY INSPECTION MODAL */}
      <Modal
        isOpen={!!activeTxnModal}
        onClose={() => setActiveTxnModal(null)}
        title={`Transaction Telemetry: ${activeTxnModal?.id}`}
      >
        {activeTxnModal && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', background: 'var(--bg-tertiary)', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Amount:</span>
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>₹{activeTxnModal.amount.toLocaleString()}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Classification:</span>
                <div><StatusBadge status={activeTxnModal.risk_level} /></div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Payment Method:</span>
                <div style={{ color: 'var(--text-primary)' }}>{activeTxnModal.payment_method}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Risk Score:</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-accent)' }}>{activeTxnModal.risk_score} / 100</div>
              </div>
            </div>

            <div className="code-box">
              <pre>{JSON.stringify(activeTxnModal, null, 2)}</pre>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default DashboardOverview;
