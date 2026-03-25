import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cpu, Mail, ArrowRight, Key, Github, Loader2, ShieldCheck, Fingerprint, Chrome, AlertCircle } from 'lucide-react';

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

  const handleGoogleLogin = () => {
    // Implementing Google OAuth redirection or popup here
    // For now, showing info message as requested
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0c10', padding: '20px' }}>

      <div className="card-professional animate-fade-in-up" style={{ padding: 48, width: '100%', maxWidth: 460, background: '#111318' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--primary-soft)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, border: '1px solid var(--primary)' }}>
            <Fingerprint size={28} color="var(--primary)" />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: 8 }}>Access System</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', fontWeight: 500 }}>
            {step === 'email' ? 'Enter your credentials to synchronize data' : `Verification code dispatched to ${email}`}
          </p>
        </div>

        {error && (
          <div style={{ padding: '12px 16px', borderRadius: 8, background: 'var(--error-soft)', border: '1px solid var(--error)', color: 'var(--error)', fontSize: '0.85rem', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600 }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {step === 'email' ? (
          <>
            <form onSubmit={handleRequestOtp} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.05em' }}>Corporate Email</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input
                    className="input-field"
                    style={{ paddingLeft: 48, height: 52 }}
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', height: 52, borderRadius: 12, fontSize: '1rem' }}>
                {loading ? <Loader2 size={20} className="animate-spin" /> : <>Identify <ArrowRight size={18} /></>}
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '32px 0' }}>
              <div style={{ flex: 1, height: 1, background: '#1f2937' }} />
              <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>Secure Access</span>
              <div style={{ flex: 1, height: 1, background: '#1f2937' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
              <button
                className="btn-secondary"
                style={{
                  height: 52, borderRadius: 12, background: 'white', color: '#0f172a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                  fontWeight: 700, border: 'none', transition: 'all 0.2s'
                }}
                onClick={handleGoogleLogin}
              >
                <Chrome size={20} /> Continue with Google
              </button>
              <Link to="/signup" style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem', textDecoration: 'none', marginTop: 12, fontWeight: 600 }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}>
                Don't have an account? Create one
              </Link>
            </div>
          </>
        ) : (
          <form onSubmit={handleVerifyOtp} className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.05em' }}>Security Token</label>
              <div style={{ position: 'relative' }}>
                <Key size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                <input
                  className="input-field"
                  style={{ paddingLeft: 48, height: 52, letterSpacing: '8px', textAlign: 'center', fontSize: '1.2rem', fontWeight: 800 }}
                  type="text"
                  placeholder="••••••"
                  maxLength={6}
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                <button type="button" onClick={() => setStep('email')} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
                  Change identification email
                </button>
              </div>
            </div>
            <button type="submit" className="btn-primary" disabled={loading || otp.length < 6} style={{ width: '100%', height: 52, borderRadius: 12, fontSize: '1rem' }}>
              {loading ? <Loader2 size={20} className="animate-spin" /> : <>Synchronize <ShieldCheck size={18} /></>}
            </button>
          </form>
        )}
      </div>

      {/* Decorative Brand Tag */}
      <div style={{ position: 'fixed', bottom: 32, display: 'flex', alignItems: 'center', gap: 12, opacity: 0.5 }}>
        <div style={{ width: 32, height: 1, background: 'var(--text-dim)' }} />
        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>CodeForge Integrity</span>
        <div style={{ width: 32, height: 1, background: 'var(--text-dim)' }} />
      </div>

    </div>
  );
};

export default Login;
