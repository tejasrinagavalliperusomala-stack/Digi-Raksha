import React, { useState } from 'react';
import { Shield, Cpu, Activity, Menu, X, ArrowRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import CyberButton from './CyberButton';

export const Navbar = ({ onNavigate, activeSection = 'home' }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'quantum-pipeline', label: 'Quantum Pipeline' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (id) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        backgroundColor: 'var(--bg-glass)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'all var(--transition-normal)'
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 24px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, #0284c7 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)'
            }}
          >
            <Shield size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.04em', fontFamily: 'var(--font-sans)' }}>
                DIGI<span className="gradient-text-cyber">RAKSHA</span>
              </span>
              <span className="badge-pill badge-quantum" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                v1.0
              </span>
            </div>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', marginTop: '-2px' }}>
              Quantum-Enhanced Fraud Guard
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '28px'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === link.id ? 'var(--text-accent)' : 'var(--text-secondary)',
                fontSize: '0.92rem',
                fontWeight: activeSection === link.id ? 600 : 500,
                cursor: 'pointer',
                padding: '6px 2px',
                position: 'relative',
                transition: 'color var(--transition-fast)'
              }}
            >
              {link.label}
              {activeSection === link.id && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--text-accent)',
                    borderRadius: '2px'
                  }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Actions (Theme Toggle + Launch Dashboard) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ThemeToggle />

          <CyberButton
            onClick={() => onNavigate('dashboard')}
            variant="primary"
            size="md"
            icon={ArrowRight}
          >
            Launch Dashboard
          </CyberButton>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-toggle"
            aria-label="Toggle Navigation Menu"
            style={{
              display: 'none',
              background: 'transparent',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer'
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                color: activeSection === link.id ? 'var(--text-accent)' : 'var(--text-primary)',
                fontSize: '1rem',
                fontWeight: 500,
                padding: '8px 0',
                cursor: 'pointer'
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
};
export default Navbar;
