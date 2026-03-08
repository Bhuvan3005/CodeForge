import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppLayout = () => {
  const token = localStorage.getItem('cf_token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div className="bg-glow" />
      <Sidebar />
      <main style={{
        flex: 1,
        marginLeft: 240,
        transition: 'margin-left 0.3s var(--ease)',
        position: 'relative',
        zIndex: 1,
      }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
