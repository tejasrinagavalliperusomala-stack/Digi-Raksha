import React from 'react';
import { Info, TrendingUp, TrendingDown } from 'lucide-react';

export const MetricCard = ({
  title,
  value,
  suffix = '',
  prefix = '',
  description,
  tooltip,
  icon: Icon,
  trend,
  colorScheme = 'cyan', // 'cyan' | 'violet' | 'amber' | 'crimson' | 'emerald'
  highlight = false
}) => {
  const getColorStyles = () => {
    switch (colorScheme) {
      case 'violet':
        return {
          iconBg: 'rgba(168, 85, 247, 0.15)',
          iconColor: 'var(--quantum-violet)',
          borderHover: 'rgba(168, 85, 247, 0.4)',
          glow: 'var(--glow-quantum)'
        };
      case 'amber':
        return {
          iconBg: 'rgba(245, 158, 11, 0.15)',
          iconColor: 'var(--risk-suspicious)',
          borderHover: 'rgba(245, 158, 11, 0.4)',
          glow: '0 0 15px rgba(245, 158, 11, 0.2)'
        };
      case 'crimson':
        return {
          iconBg: 'rgba(239, 68, 68, 0.15)',
          iconColor: 'var(--risk-high)',
          borderHover: 'rgba(239, 68, 68, 0.4)',
          glow: '0 0 15px rgba(239, 68, 68, 0.2)'
        };
      case 'emerald':
        return {
          iconBg: 'rgba(16, 185, 129, 0.15)',
          iconColor: 'var(--risk-legit)',
          borderHover: 'rgba(16, 185, 129, 0.4)',
          glow: '0 0 15px rgba(16, 185, 129, 0.2)'
        };
      case 'cyan':
      default:
        return {
          iconBg: 'rgba(56, 189, 248, 0.15)',
          iconColor: 'var(--cyber-cyan)',
          borderHover: 'rgba(56, 189, 248, 0.4)',
          glow: 'var(--glow-cyan)'
        };
    }
  };

  const scheme = getColorStyles();

  return (
    <div
      className="glass-panel"
      style={{
        padding: '20px 24px',
        position: 'relative',
        overflow: 'hidden',
        border: highlight ? `1px solid ${scheme.iconColor}` : undefined,
        boxShadow: highlight ? scheme.glow : undefined,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {title}
          </span>
          {tooltip && (
            <div
              title={tooltip}
              style={{ cursor: 'help', display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}
            >
              <Info size={14} />
            </div>
          )}
        </div>
        {Icon && (
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              background: scheme.iconBg,
              color: scheme.iconColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon size={20} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
        {prefix && <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{prefix}</span>}
        <span
          style={{
            fontSize: '1.9rem',
            fontWeight: 800,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em'
          }}
        >
          {value}
        </span>
        {suffix && (
          <span
            style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              color: scheme.iconColor
            }}
          >
            {suffix}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
        {description && (
          <span style={{ color: 'var(--text-muted)' }}>
            {description}
          </span>
        )}
        {trend && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: 600,
              color: trend.isPositive ? 'var(--risk-legit)' : 'var(--risk-high)'
            }}
          >
            {trend.isPositive ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
};
export default MetricCard;
