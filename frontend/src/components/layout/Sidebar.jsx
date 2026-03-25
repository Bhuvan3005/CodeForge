import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Compass, Code2, BarChart3, Route,
  History, Settings, Sparkles, ChevronLeft, ChevronRight,
  Cpu, LogOut, User, Zap
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/topics', icon: Compass, label: 'Topics' },
  { path: '/problems', icon: Code2, label: 'Practice' },
  { path: '/generate', icon: Sparkles, label: 'AI Generator' },
  { path: '/path', icon: Route, label: 'Study Path' },
  { path: '/progress', icon: BarChart3, label: 'Analytics' },
  { path: '/history', icon: History, label: 'Submissions' },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('cf_token');
    localStorage.removeItem('cf_user');
    navigate('/login');
  };

  return (
    <aside style={{
      width: collapsed ? 72 : 260,
      height: '100vh',
      background: '#0a0c10',
      borderRight: '1px solid #1f2937',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 100,
    }}>
      {/* Branding */}
      <div style={{
        padding: collapsed ? '24px 16px' : '24px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'var(--primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
        }}>
          <Cpu size={20} color="white" />
        </div>
        {!collapsed && (
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'white', letterSpacing: '-0.02em' }}>
              CodeForge
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path ||
            (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: collapsed ? '12px 0' : '10px 14px',
                borderRadius: 10,
                color: isActive ? 'white' : 'var(--text-secondary)',
                background: isActive ? 'var(--primary-soft)' : 'transparent',
                fontWeight: isActive ? 600 : 500,
                justifyContent: collapsed ? 'center' : 'flex-start',
                transition: 'all 0.2s',
              }}
              className="nav-link"
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} style={{ color: isActive ? 'var(--primary)' : 'inherit' }} />
              {!collapsed && <span style={{ fontSize: '0.9rem' }}>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div style={{ padding: '20px 12px', borderTop: '1px solid #1f2937', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Link
          to="/settings"
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: collapsed ? '12px 0' : '10px 14px',
            borderRadius: 10,
            color: location.pathname === '/settings' ? 'white' : 'var(--text-secondary)',
            background: location.pathname === '/settings' ? 'var(--primary-soft)' : 'transparent',
            justifyContent: collapsed ? 'center' : 'flex-start',
            transition: 'all 0.2s',
          }}
        >
          <Settings size={20} />
          {!collapsed && <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Settings</span>}
        </Link>
        
        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: collapsed ? '12px 0' : '10px 14px',
            borderRadius: 10,
            color: '#ef4444',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            justifyContent: collapsed ? 'center' : 'flex-start',
            transition: 'all 0.2s',
          }}
        >
          <LogOut size={20} />
          {!collapsed && <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Logout</span>}
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            marginTop: 12,
            padding: '8px',
            background: '#1d232d',
            border: '1px solid #1f2937',
            borderRadius: 8,
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
