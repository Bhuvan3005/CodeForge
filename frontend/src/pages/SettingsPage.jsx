import React, { useState, useEffect } from 'react';
import { Settings, User, Code2, Bell, Palette, Save } from 'lucide-react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    name: '',
    email: '',
    language: 'javascript',
    editorTheme: 'one-dark',
    notifications: true,
  });

  useEffect(() => {
    const userStr = localStorage.getItem('cf_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setSettings(prev => ({
          ...prev,
          name: user.name || '',
          email: user.email || ''
        }));
      } catch (e) {
        console.error('Failed to parse user data', e);
      }
    }
  }, []);

  const update = (key, val) => setSettings(p => ({ ...p, [key]: val }));

  return (
    <div className="page-container" style={{ maxWidth: 700 }}>
      <div className="page-header animate-fade-in-up">
        <div className="section-label"><Settings size={14} /> Preferences</div>
        <h1><span className="glow-text">Settings</span></h1>
        <p>Customize your CodeForge experience.</p>
      </div>

      <div className="stagger-children" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Profile */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1rem', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><User size={18} color="var(--accent-primary)" /> Profile</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Full Name</label>
              <input className="input-field" value={settings.name} onChange={e => update('name', e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Email</label>
              <input className="input-field" value={settings.email} onChange={e => update('email', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1rem', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><Code2 size={18} color="var(--accent-primary)" /> Editor Preferences</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Default Language</label>
              <select className="select-field" value={settings.language} onChange={e => update('language', e.target.value)}>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Editor Theme</label>
              <select className="select-field" value={settings.editorTheme} onChange={e => update('editorTheme', e.target.value)}>
                <option value="one-dark">One Dark</option>
                <option value="dracula">Dracula</option>
                <option value="github-dark">GitHub Dark</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1rem', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><Bell size={18} color="var(--accent-primary)" /> Notifications</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <div style={{
              width: 44, height: 24, borderRadius: 12, padding: 2, cursor: 'pointer',
              background: settings.notifications ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)',
              transition: 'background 0.2s',
            }} onClick={() => update('notifications', !settings.notifications)}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%', background: 'white',
                transform: settings.notifications ? 'translateX(20px)' : 'translateX(0)',
                transition: 'transform 0.2s',
              }} />
            </div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Receive daily practice reminders</span>
          </label>
        </div>

        <button className="btn-primary" style={{ alignSelf: 'flex-end' }}>
          <Save size={16} /> Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
