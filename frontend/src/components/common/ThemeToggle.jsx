import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

/* Uiverse.io inspired Smooth Celestial Theme Toggle Switch */
export const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark/light theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '56px',
        height: '28px',
        borderRadius: '9999px',
        background: isDark ? '#0f172a' : '#e2e8f0',
        border: `1px solid ${isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(14, 116, 144, 0.3)'}`,
        padding: '0 4px',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isDark ? '0 0 10px rgba(56, 189, 248, 0.2)' : '0 2px 5px rgba(0,0,0,0.08)'
      }}
    >
      <Moon
        size={14}
        style={{
          color: isDark ? '#38bdf8' : '#94a3b8',
          transition: 'color 0.2s ease',
          zIndex: 1
        }}
      />
      <Sun
        size={14}
        style={{
          color: !isDark ? '#f59e0b' : '#64748b',
          transition: 'color 0.2s ease',
          zIndex: 1
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '2px',
          left: isDark ? '3px' : '29px',
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          background: isDark ? 'linear-gradient(135deg, #0284c7, #38bdf8)' : 'linear-gradient(135deg, #f59e0b, #fbbf24)',
          boxShadow: isDark ? '0 0 8px #38bdf8' : '0 0 8px #f59e0b',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      />
    </button>
  );
};
export default ThemeToggle;
