import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Brain, Zap, Target, TrendingUp, Sparkles, ArrowRight, Cpu, BarChart3, BookOpen } from 'lucide-react';

const FEATURES = [
  { icon: Brain, title: 'AI Problem Generation', desc: 'Custom interview problems generated from topic combinations and difficulty levels.', color: '#a855f7' },
  { icon: Zap, title: 'Real-Time Analysis', desc: 'Instant complexity analysis, bug detection, and optimization suggestions.', color: '#f59e0b' },
  { icon: Target, title: 'Weak Concept Detection', desc: 'AI identifies your gaps and creates targeted micro-lessons to fill them.', color: '#ef4444' },
  { icon: TrendingUp, title: 'Adaptive Learning', desc: 'Dynamic difficulty that grows with you—never too easy, never too hard.', color: '#22c55e' },
  { icon: BarChart3, title: 'Skill Radar', desc: 'Visual mastery graph across 16+ DSA topics tracks your growth over time.', color: '#3b82f6' },
  { icon: BookOpen, title: 'Micro Lessons', desc: 'Bite-sized concept tutorials with interactive examples and practice drills.', color: '#ec4899' },
];

const STATS = [
  { value: '16+', label: 'DSA Topics' },
  { value: '500+', label: 'AI Problems' },
  { value: '8', label: 'Analysis Roles' },
  { value: '∞', label: 'Practice Paths' },
];

const Landing = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* BG */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '100vh',
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.15) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Nav */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 48px', position: 'relative', zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Cpu size={22} color="white" />
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.3rem' }}>CodeForge</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/login" className="btn-secondary">Login</Link>
          <Link to="/signup" className="btn-primary">Get Started <ArrowRight size={16} /></Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        maxWidth: 900, margin: '0 auto', textAlign: 'center',
        padding: '80px 24px 40px', position: 'relative', zIndex: 1,
      }} className="animate-fade-in-up">
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: 20 }}>
          <Sparkles size={14} /> AI-Powered DSA Platform
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
          <span className="glow-text">Master algorithms</span><br />
          <span className="accent-text">like a senior engineer</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Practice with AI-generated problems, get instant code analysis, and follow a personalized
          learning path that adapts to your weaknesses in real-time.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Link to="/signup" className="btn-primary" style={{ padding: '16px 36px', fontSize: '1rem' }}>
            Start Learning Free <ArrowRight size={18} />
          </Link>
          <Link to="/problems" className="btn-secondary" style={{ padding: '16px 36px', fontSize: '1rem' }}>
            Try a Problem
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        display: 'flex', justifyContent: 'center', gap: 48, padding: '48px 24px',
        position: 'relative', zIndex: 1,
      }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }} className="accent-text">{s.value}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section style={{
        maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20,
        position: 'relative', zIndex: 1,
      }} className="stagger-children">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="glass-card" style={{ padding: 28 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${f.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                <Icon size={22} color={f.color} />
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          );
        })}
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center', padding: '40px 24px', borderTop: '1px solid var(--border-subtle)',
        color: 'var(--text-muted)', fontSize: '0.8rem',
      }}>
        © 2026 CodeForge — AI-Powered DSA Mastery Platform
      </footer>
    </div>
  );
};

export default Landing;
