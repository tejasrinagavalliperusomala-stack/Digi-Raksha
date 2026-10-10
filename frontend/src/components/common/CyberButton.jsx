import React from 'react';

/**
 * Uiverse.io adapted CyberButton
 * Features glowing borders, subtle gradient animation, hover elevation, and click feedback.
 */
export const CyberButton = ({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'danger' | 'quantum' | 'outline'
  size = 'md',        // 'sm' | 'md' | 'lg'
  icon: Icon = null,
  disabled = false,
  className = '',
  style = {},
  type = 'button'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
          color: '#ffffff',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          boxShadow: '0 0 15px rgba(56, 189, 248, 0.25)',
        };
      case 'quantum':
        return {
          background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
          color: '#ffffff',
          border: '1px solid rgba(192, 132, 252, 0.4)',
          boxShadow: '0 0 18px rgba(168, 85, 247, 0.3)',
        };
      case 'secondary':
        return {
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
        };
      case 'danger':
        return {
          background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
          color: '#ffffff',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          boxShadow: '0 0 15px rgba(239, 68, 68, 0.25)',
        };
      case 'outline':
      default:
        return {
          background: 'transparent',
          color: 'var(--text-accent)',
          border: '1px solid var(--border-color)',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { padding: '6px 12px', fontSize: '0.82rem', gap: '6px' };
      case 'lg':
        return { padding: '14px 28px', fontSize: '1.05rem', gap: '10px' };
      case 'md':
      default:
        return { padding: '10px 20px', fontSize: '0.92rem', gap: '8px' };
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cyber-btn ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        fontFamily: 'var(--font-sans)',
        borderRadius: 'var(--radius-sm)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all var(--transition-fast)',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
        textDecoration: 'none',
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.filter = 'brightness(1.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.filter = 'brightness(1)';
        }
      }}
      onMouseDown={(e) => {
        if (!disabled) e.currentTarget.style.transform = 'translateY(1px)';
      }}
      onMouseUp={(e) => {
        if (!disabled) e.currentTarget.style.transform = 'translateY(-2px)';
      }}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : (size === 'lg' ? 20 : 16)} />}
      <span>{children}</span>
    </button>
  );
};
export default CyberButton;
