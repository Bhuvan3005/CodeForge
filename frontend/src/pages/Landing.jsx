import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2, Brain, Zap, Target, TrendingUp,
  Sparkles, ArrowRight, Cpu, BarChart3,
  BookOpen, CheckCircle2, ShieldCheck, Globe, Route
} from 'lucide-react';

const FEATURES = [
  { icon: Brain, title: 'AI-Generated Challenges', desc: 'Unique interview problems crafted specifically for your skill level and target topics.', color: 'var(--primary)' },
  { icon: Zap, title: 'Real-Time Insights', desc: 'Instant feedback on time complexity, edge cases, and optimization possibilities.', color: '#10b981' },
  { icon: Target, title: 'Gap Analysis', desc: 'Our engine identifies conceptual weaknesses and targets them with surgical precision.', color: '#f59e0b' },
  { icon: BarChart3, title: 'Visual Mastery', desc: 'Track your growth across 16+ DSA domains with advanced analytics and skill mapping.', color: '#0ea5e9' },
  { icon: Route, title: 'Adaptive Curriculums', desc: 'Dynamic learning paths that evolve as you solve, ensuring constant improvement.', color: '#8b5cf6' },
  { icon: BookOpen, title: 'Expert Resources', desc: 'Bite-sized technical guides and interactive drills for every major concept.', color: '#f43f5e' },
];

const STATS = [
  { value: '16+', label: 'Core Topics' },
  { value: '10k+', label: 'Forged Problems' },
  { value: '98%', label: 'Success Rate' },
  { value: '24/7', label: 'AI Mentorship' },
];

const Landing = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0c10', color: '#f8fafc', fontFamily: 'var(--font-sans)', overflowX: 'hidden' }}>

      {/* Subtle Background Detail */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '800px',
        background: 'radial-gradient(circle at 50% -10%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none'
      }} />

      {/* Navigation */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '32px 60px', position: 'relative', zIndex: 10, maxWidth: 1400, margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}>
            <Cpu size={22} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.02em' }}>CodeForge</span>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Link to="/login" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Log In</Link>
          <Link to="/dashboard" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>Dashboard <ArrowRight size={16} /></Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        maxWidth: 1000, margin: '0 auto', textAlign: 'center',
        padding: '120px 24px 60px', position: 'relative', zIndex: 1
      }} className="animate-fade-in-up">
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'var(--primary-soft)', color: 'var(--primary)',
          padding: '6px 16px', borderRadius: 'var(--radius-full)',
          fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.1em', marginBottom: 32
        }}>
          <Sparkles size={14} /> The Future of DSA Mastery
        </div>
        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: 32, letterSpacing: '-0.03em' }}>
          Master algorithms with <br />
          <span style={{ color: 'var(--primary)' }}>precision and speed.</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: 700, margin: '0 auto 48px', lineHeight: 1.6 }}>
          An intelligent training ground for software engineers. Forge your skills with custom challenges,
          instant AI feedback, and a curriculum that adapts to you.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Link to="/dashboard" className="btn-primary" style={{ padding: '16px 40px', fontSize: '1rem', borderRadius: 14 }}>
            Get Started Free <ArrowRight size={20} />
          </Link>
          <Link to="/problems" className="btn-secondary" style={{ padding: '16px 40px', fontSize: '1rem', borderRadius: 14 }}>
            Explore Problems
          </Link>
        </div>
      </section>

      {/* Trust/Stats Banner */}
      <section style={{
        maxWidth: 1200, margin: '0 auto', padding: '60px 24px',
        borderTop: '1px solid var(--border-medium)', borderBottom: '1px solid var(--border-medium)',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40,
        position: 'relative', zIndex: 1
      }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: 4 }}>{s.value}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* Features Grid */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: 16 }}>Everything you need to <span style={{ color: 'var(--primary)' }}>excel.</span></h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Built by engineers, for engineers who want to break through the ceiling.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 32 }}>
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="card-professional" style={{ padding: 40, background: '#111318' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-medium)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 24, transition: 'all 0.3s'
                }}>
                  <Icon size={24} color={f.color} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: 12, fontWeight: 700 }}>{f.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        maxWidth: 1400, margin: '0 auto', padding: '80px 60px 40px',
        borderTop: '1px solid var(--border-medium)', position: 'relative', zIndex: 1
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 60 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Cpu size={18} color="white" />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>CodeForge</span>
            </div>
            <p style={{ color: 'var(--text-muted)', maxWidth: 300, fontSize: '0.9rem', lineHeight: 1.6 }}>
              The high-performance platform for mastering data structures and algorithms through AI intelligence.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 60 }}>
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Platform</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <li>Problems</li>
                <li>Topic Explorer</li>
                <li>Learning Paths</li>
                <li>AI Studio</li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Resources</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <li>Community</li>
                <li>Blog</li>
                <li>Guides</li>
                <li>Support</li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 32, borderTop: '1px solid var(--border-light)' }}>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            © 2026 CodeForge. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <Globe size={18} color="var(--text-dim)" />
            <ShieldCheck size={18} color="var(--text-dim)" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
