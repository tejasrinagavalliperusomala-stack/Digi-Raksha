import React from 'react';
import {
  LayoutDashboard,
  Zap,
  ListOrdered,
  GitBranch,
  BarChart3,
  Info,
  ChevronLeft,
  ChevronRight,
  Shield,
  Home,
  Radio
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const Sidebar = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  onExitToLanding
}) => {
  const { apiHealth } = useData();

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'analyze', label: 'Analyze Transaction', icon: Zap },
    { id: 'transactions', label: 'Transactions', icon: ListOrdered },
    { id: 'pipeline', label: 'Quantum Pipeline', icon: GitBranch },
    { id: 'insights', label: 'Insights & ML', icon: BarChart3 },
    { id: 'about', label: 'About Project', icon: Info },
  ];

  return (
    <aside
      style={{
        width: isCollapsed ? '78px' : '260px',
        backgroundColor: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 40,
        flexShrink: 0
      }}
    >
      {/* Top Brand Section */}
      <div>
        <div
          style={{
            padding: isCollapsed ? '20px 14px' : '20px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'space-between',
            borderBottom: '1px solid var(--border-subtle)',
            minHeight: '74px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-sm)',
                background: 'linear-gradient(135deg, #0284c7 0%, #7c3aed 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 0 12px rgba(56, 189, 248, 0.4)',
                flexShrink: 0
              }}
            >
              <Shield size={20} />
            </div>
            {!isCollapsed && (
              <div>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '0.02em', display: 'block', lineHeight: 1.1 }}>
                  DIGI<span className="gradient-text-cyber">RAKSHA</span>
                </span>
                <span style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>
                  Cyber Fintech Engine
                </span>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(true)}
              aria-label="Collapse Sidebar"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ChevronLeft size={18} />
            </button>
          )}
        </div>

        {/* Collapsed Expand Trigger */}
        {isCollapsed && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
            <button
              onClick={() => setIsCollapsed(false)}
              aria-label="Expand Sidebar"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-accent)',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}

        {/* Navigation Items */}
        <nav style={{ padding: '16px 10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={isCollapsed ? item.label : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: isCollapsed ? '12px 0' : '11px 14px',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  borderRadius: 'var(--radius-sm)',
                  border: isActive ? '1px solid var(--border-glow)' : '1px solid transparent',
                  background: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                  color: isActive ? 'var(--text-accent)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  position: 'relative'
                }}
              >
                <Icon size={19} style={{ color: isActive ? 'var(--text-accent)' : 'var(--text-muted)', flexShrink: 0 }} />
                {!isCollapsed && <span>{item.label}</span>}
                {isActive && !isCollapsed && (
                  <div
                    style={{
                      position: 'absolute',
                      right: '8px',
                      width: '4px',
                      height: '16px',
                      background: 'var(--cyber-cyan)',
                      borderRadius: '2px'
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status & Landing Return */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid var(--border-subtle)' }}>
        {/* Real-time Status Pill */}
        {!isCollapsed && (
          <div
            style={{
              padding: '10px 12px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Radio size={12} style={{ color: '#10b981', animation: 'pulseGlow 2s infinite' }} />
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                Simulator Node
              </span>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>
              ZZ-Map Quantum State v1
            </span>
          </div>
        )}

        <button
          onClick={onExitToLanding}
          title={isCollapsed ? "Back to Landing Page" : undefined}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            padding: isCollapsed ? '10px 0' : '9px 12px',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            background: 'transparent',
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
        >
          <Home size={17} style={{ flexShrink: 0 }} />
          {!isCollapsed && <span>Landing Page</span>}
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;
