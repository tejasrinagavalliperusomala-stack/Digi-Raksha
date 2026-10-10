import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Award,
  ShieldCheck,
  Target,
  Sparkles,
  TrendingUp,
  Cpu,
  Layers,
  Info
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { fetchMLMetrics } from '../services/api';
import MetricCard from '../components/common/MetricCard';
import { useTheme } from '../context/ThemeContext';

export const InsightsPage = () => {
  const [mlData, setMlData] = useState(null);
  const { isDark } = useTheme();

  useEffect(() => {
    fetchMLMetrics().then(data => setMlData(data));
  }, []);

  if (!mlData) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>Loading machine learning benchmarks and performance evaluation...</p>
      </div>
    );
  }

  const chartGridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';
  const chartTextColor = isDark ? '#94a3b8' : '#475569';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Machine Learning & Hybrid Quantum Evaluation
            </h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Validation benchmarks, feature importance rankings, and confusion matrix diagnostics on 100,000 test transactions.
            </p>
          </div>
          <span className="badge-pill badge-quantum">
            {mlData.model_architecture}
          </span>
        </div>
      </div>

      {/* METRIC SCORECARDS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}
      >
        <MetricCard
          title="ROC-AUC Score"
          value={(mlData.metrics.roc_auc * 100).toFixed(2)}
          suffix="%"
          description="Area under ROC curve"
          icon={Award}
          colorScheme="cyan"
        />

        <MetricCard
          title="Precision"
          value={(mlData.metrics.precision * 100).toFixed(2)}
          suffix="%"
          description="Fraud prediction accuracy"
          icon={Target}
          colorScheme="emerald"
        />

        <MetricCard
          title="Recall (Sensitivity)"
          value={(mlData.metrics.recall * 100).toFixed(2)}
          suffix="%"
          description="Caught fraud proportion"
          icon={ShieldCheck}
          colorScheme="violet"
        />

        <MetricCard
          title="F1-Score"
          value={(mlData.metrics.f1_score * 100).toFixed(2)}
          suffix="%"
          description="Harmonic mean of precision & recall"
          icon={Sparkles}
          colorScheme="amber"
        />

        <MetricCard
          title="PR-AUC Score"
          value={(mlData.metrics.pr_auc * 100).toFixed(2)}
          suffix="%"
          description="Precision-Recall Area"
          icon={TrendingUp}
          colorScheme="cyan"
        />
      </div>

      {/* FEATURE IMPORTANCE & CONFUSION MATRIX */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '24px'
        }}
      >
        {/* Feature Importance Bar Chart */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Feature Importance Ranking
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Classical Features vs Quantum Anomaly Kernel Weight
              </span>
            </div>
          </div>

          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mlData.feature_importances} layout="vertical" margin={{ left: 40, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                <XAxis type="number" stroke={chartTextColor} fontSize={11} domain={[0, 0.35]} />
                <YAxis dataKey="name" type="category" stroke={chartTextColor} fontSize={11} width={130} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: '8px',
                    fontSize: '0.82rem'
                  }}
                  formatter={(val) => [(Number(val) * 100).toFixed(1) + '%', 'Importance']}
                />
                <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
                  {mlData.feature_importances.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.source === 'Quantum Simulation' ? '#a855f7' : '#38bdf8'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Confusion Matrix Diagnostic */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              Validation Confusion Matrix
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '20px' }}>
              Evaluated on 100,000 stratified test transactions (0.172% fraud incidence)
            </span>

            {/* Matrix 2x2 Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {/* True Negative */}
              <div style={{ background: 'var(--bg-tertiary)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>True Negative (TN)</span>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--risk-legit)', marginTop: '4px' }}>
                  {mlData.confusion_matrix.true_negative.toLocaleString()}
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Correctly approved legitimate</span>
              </div>

              {/* False Positive */}
              <div style={{ background: 'var(--bg-tertiary)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>False Positive (FP)</span>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--risk-suspicious)', marginTop: '4px' }}>
                  {mlData.confusion_matrix.false_positive.toLocaleString()}
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Legitimate flagged by mistake</span>
              </div>

              {/* False Negative */}
              <div style={{ background: 'var(--bg-tertiary)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>False Negative (FN)</span>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--risk-high)', marginTop: '4px' }}>
                  {mlData.confusion_matrix.false_negative.toLocaleString()}
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Missed fraud cases</span>
              </div>

              {/* True Positive */}
              <div style={{ background: 'var(--bg-tertiary)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>True Positive (TP)</span>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--risk-legit)', marginTop: '4px' }}>
                  {mlData.confusion_matrix.true_positive.toLocaleString()}
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Correctly identified fraud</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '16px', padding: '10px 12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <strong>Class Imbalance Handling:</strong> Trained with <code style={{ color: 'var(--text-accent)' }}>scale_pos_weight = 581.4</code> to compensate for 1 : 581 payment fraud scarcity.
          </div>
        </div>
      </div>
    </div>
  );
};
export default InsightsPage;
