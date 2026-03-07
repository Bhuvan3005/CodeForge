import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cpu, Mail, Lock, User, ArrowRight, Github } from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', position: 'relative' }}>
      <div className="bg-glow" />
      <div className="glass-card animate-fade-in-up" style={{ padding: 40, width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--accent-gradient)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Cpu size={24} color="white" />
          </div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: 4 }}>Create Account</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Start your DSA mastery journey</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input className="input-field" style={{ paddingLeft: 40 }} placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input className="input-field" style={{ paddingLeft: 40 }} type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input className="input-field" style={{ paddingLeft: 40 }} type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: 8, padding: '14px' }}>
            Create Account <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border-light)' }} />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>OR</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border-light)' }} />
        </div>

        <button className="btn-secondary" style={{ width: '100%' }} onClick={() => navigate('/dashboard')}>
          <Github size={18} /> Continue with GitHub
        </button>

        <p style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
