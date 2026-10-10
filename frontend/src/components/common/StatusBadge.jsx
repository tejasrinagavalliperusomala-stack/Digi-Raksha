import React from 'react';

/**
 * Uiverse.io adapted status badges with pulsating indicator dots.
 */
export const StatusBadge = ({ status, className = '' }) => {
  const getBadgeConfig = () => {
    const s = (status || '').toLowerCase();
    if (s.includes('legit') || s.includes('approved') || s.includes('low')) {
      return {
        className: 'badge-legit',
        label: status || 'Legitimate',
        dotColor: '#10b981'
      };
    }
    if (s.includes('suspicious') || s.includes('review') || s.includes('medium')) {
      return {
        className: 'badge-suspicious',
        label: status || 'Suspicious',
        dotColor: '#f59e0b'
      };
    }
    if (s.includes('high') || s.includes('block') || s.includes('fraud')) {
      return {
        className: 'badge-high',
        label: status || 'High Risk',
        dotColor: '#ef4444'
      };
    }
    if (s.includes('quantum') || s.includes('simulat')) {
      return {
        className: 'badge-quantum',
        label: status || 'Quantum Simulated',
        dotColor: '#a855f7'
      };
    }
    return {
      className: 'badge-pill',
      label: status || 'Unknown',
      dotColor: '#94a3b8'
    };
  };

  const config = getBadgeConfig();

  return (
    <span className={`badge-pill ${config.className} ${className}`}>
      <span
        className="dot-indicator"
        style={{ backgroundColor: config.dotColor }}
      />
      {config.label}
    </span>
  );
};
export default StatusBadge;
