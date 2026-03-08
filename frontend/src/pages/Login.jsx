import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cpu, Mail, ArrowRight, Key, Github, Loader2 } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('email'); // 'email' or 'otp'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) { setError('Please enter a valid email.'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) { setStep('otp'); }
      else { setError(data.message || 'Failed to send OTP.'); }
    } catch (err) {
      setError('Network error. Please make sure the backend is running.');
    } finally { setLoading(false); }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (!otp || otp.length < 6) { setError('Please enter the 6-digit OTP.'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otpCode: otp })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('cf_token', data.token);
        localStorage.setItem('cf_user', JSON.stringify(data));
        navigate('/dashboard');
      } else { setError(data.message || 'Invalid OTP.'); }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally { setLoading(false); }
  };

  const handleGoogleLogin = async () => {
    setError('Google login requires VITE_GOOGLE_CLIENT_ID in your frontend .env file.');
  };

  const handleGithubLogin = () => {
    setError('GitHub login requires OAuth app credentials configured in backend.');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', position: 'relative' }}>
      <div className="bg-glow" />
      <div className="glass-card animate-fade-in-up" style={{ padding: 40, width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--accent-gradient)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Cpu size={24} color="white" />
          </div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: 4 }}>Access CodeForge</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {step === 'email' ? 'Sign in to continue your journey' : `Check your email — ${email}`}
          </p>
        </div>

        {error && (
          <div style={{ padding: 12, borderRadius: 8, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', fontSize: '0.85rem', marginBottom: 20, textAlign: 'center' }}>
            {error}
          </div>
        )}

        {step === 'email' ? (
          <>
            <form onSubmit={handleRequestOtp} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    className="input-field"
                    style={{ paddingLeft: 40, width: '100%' }}
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', marginTop: 8, padding: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                {loading ? <Loader2 size={16} className="animate-spin" /> : <>Continue with Email <ArrowRight size={16} /></>}
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border-light)' }} />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>OR CONTINUE WITH</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border-light)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button className="btn-secondary" style={{ width: '100%', background: '#24292e', color: '#fff', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} onClick={handleGithubLogin}>
                <Github size={18} /> GitHub
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleVerifyOtp} className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 6 }}>6-Digit Verification Code</label>
              <div style={{ position: 'relative' }}>
                <Key size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  className="input-field"
                  style={{ paddingLeft: 40, width: '100%', letterSpacing: '4px', textAlign: 'center' }}
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  required
                />
              </div>
              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 12 }}>
                Sent to {email}. <span style={{ color: 'var(--accent-primary)', cursor: 'pointer' }} onClick={() => setStep('email')}>Wrong email?</span>
              </p>
            </div>
            <button type="submit" className="btn-primary" disabled={loading || otp.length < 6} style={{ width: '100%', marginTop: 8, padding: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
              {loading ? <Loader2 size={16} className="animate-spin" /> : <>Verify Code <Key size={16} /></>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
