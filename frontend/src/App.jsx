import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider, useData } from './context/DataContext';
import LandingPage from './pages/LandingPage';
import DashboardOverview from './pages/DashboardOverview';
import AnalyzeTransaction from './pages/AnalyzeTransaction';
import TransactionsPage from './pages/TransactionsPage';
import QuantumPipelinePage from './pages/QuantumPipelinePage';
import InsightsPage from './pages/InsightsPage';
import AboutPage from './pages/AboutPage';
import Sidebar from './components/common/Sidebar';
import ThemeToggle from './components/common/ThemeToggle';
import CyberButton from './components/common/CyberButton';
import {
  Menu,
  Shield,
  Activity,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  X,
  Info
} from 'lucide-react';

const DashboardShell = ({ onExitToLanding }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const { notification, isSimulating, runSimulation, resetDemo } = useData();

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview onNavigateToAnalyze={() => setActiveTab('analyze')} />;
      case 'analyze':
        return <AnalyzeTransaction />;
      case 'transactions':
        return <TransactionsPage />;
      case 'pipeline':
        return <QuantumPipelinePage />;
      case 'insights':
        return <InsightsPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <DashboardOverview onNavigateToAnalyze={() => setActiveTab('analyze')} />;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Security Operations Center (SOC) Overview';
      case 'analyze': return 'Interactive Transaction Risk Analyzer';
      case 'transactions': return 'Transaction Activity & Audit Explorer';
      case 'pipeline': return 'Hybrid Classical–Quantum Processing Pipeline';
      case 'insights': return 'Machine Learning Evaluation & Model Insights';
      case 'about': return 'Project Architecture & Documentation';
      default: return 'Dashboard';
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Desktop Sidebar */}
      <div className="desktop-sidebar-container">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          onExitToLanding={onExitToLanding}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)'
          }}
          onClick={() => setMobileDrawerOpen(false)}
        >
          <div
            style={{ width: '270px', height: '100%', background: 'var(--bg-secondary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setMobileDrawerOpen(false);
              }}
              isCollapsed={false}
              setIsCollapsed={() => {}}
              onExitToLanding={onExitToLanding}
            />
          </div>
        </div>
      )}

      {/* Main Dashboard Workspace */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header Bar */}
        <header
          style={{
            height: '70px',
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            position: 'sticky',
            top: 0,
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="mobile-menu-btn"
              aria-label="Toggle Mobile Menu"
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
              <Menu size={20} />
            </button>

            <div>
              <h1 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                {getTabTitle()}
              </h1>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                DIGIRAKSHA Enterprise SOC
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <ThemeToggle />
          </div>
        </header>

        {/* Floating Notification Toast */}
        {notification && (
          <div
            style={{
              position: 'fixed',
              top: '84px',
              right: '24px',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 18px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-secondary)',
              border: `1px solid ${notification.type === 'error' ? '#ef4444' : (notification.type === 'warning' ? '#f59e0b' : '#10b981')}`,
              boxShadow: 'var(--shadow-lg)',
              fontSize: '0.86rem',
              color: 'var(--text-primary)'
            }}
          >
            {notification.type === 'error' ? (
              <AlertTriangle size={18} style={{ color: '#ef4444' }} />
            ) : (
              <CheckCircle2 size={18} style={{ color: '#10b981' }} />
            )}
            <span>{notification.msg}</span>
          </div>
        )}

        {/* Workspace Body */}
        <main style={{ padding: '28px 24px', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
          {renderContent()}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-sidebar-container { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </div>
  );
};

export function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'

  return (
    <ThemeProvider>
      <DataProvider>
        {currentView === 'landing' ? (
          <LandingPage onLaunchDashboard={() => setCurrentView('dashboard')} />
        ) : (
          <DashboardShell onExitToLanding={() => setCurrentView('landing')} />
        )}
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
