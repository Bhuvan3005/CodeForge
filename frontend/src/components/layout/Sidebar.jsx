import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Compass, Code2, BarChart3, Route,
  History, Settings, Sparkles, ChevronLeft, ChevronRight,
  Brain, Cpu, LogOut
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/topics', icon: Compass, label: 'Topics' },
  { path: '/problems', icon: Code2, label: 'Problems' },
  { path: '/generate', icon: Sparkles, label: 'AI Generator' },
  { path: '/progress', icon: BarChart3, label: 'Progress' },
  { path: '/path', icon: Route, label: 'Learning Path' },
  { path: '/history', icon: History, label: 'History' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('cf_token');
    localStorage.removeItem('cf_user');
    navigate('/login');
  };

  return (
    <aside style={{
      width: collapsed ? 72 : 240,
      minHeight: '100vh',
      background: 'var(--bg-surface)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.3s var(--ease)',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 100,
      overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{
        padding: collapsed ? '20px 16px' : '20px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{
          width: 38,
          height: 38,
          borderRadius: 'var(--radius-md)',
          background: 'var(--accent-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Cpu size={20} color="white" />
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem' }}>
              CodeForge
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              DSA ARCHITECT
            </div>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path ||
            (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: collapsed ? '12px 16px' : '10px 14px',
                borderRadius: 'var(--radius-sm)',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                background: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.2s var(--ease)',
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} style={{ flexShrink: 0 }} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: collapsed ? '12px 16px' : '10px 14px',
            borderRadius: 'var(--radius-sm)',
            color: '#ef4444',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem',
            transition: 'all 0.2s var(--ease)',
            justifyContent: collapsed ? 'center' : 'flex-start',
            width: '100%',
          }}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={20} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Logout</span>}
        </button>
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          margin: '12px 8px',
          padding: '10px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
};

export default Sidebar;
