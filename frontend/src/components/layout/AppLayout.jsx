import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppLayout = () => {
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
