import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const token = localStorage.getItem('cf_token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0c10' }}>
      <div className="bg-glow" />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main style={{
        flex: 1,
        marginLeft: collapsed ? 72 : 260,
        transition: 'margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        zIndex: 1,
        minWidth: 0, /* Prevent layout breaks */
      }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
