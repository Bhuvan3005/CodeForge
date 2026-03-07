import React from 'react';
import { Link } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { BarChart3, TrendingUp, Target, Brain } from 'lucide-react';
import { TOPICS } from '../data/topics';
import { USER_MASTERY, USER_STATS } from '../data/sampleProblems';

const radarData = TOPICS.map(t => ({ subject: t.name.length > 10 ? t.name.slice(0, 10) + '…' : t.name, mastery: USER_MASTERY[t.id] || 0, fullMark: 100 }));
const barData = TOPICS.slice(0, 10).map(t => ({ name: t.name.length > 8 ? t.name.slice(0, 8) : t.name, solved: Math.floor(Math.random() * 20) + 2, attempted: Math.floor(Math.random() * 10) + 3 }));

const activityData = [];
const months = ['Jan', 'Feb', 'Mar'];
months.forEach(m => { for (let d = 1; d <= 28; d++) { activityData.push({ day: `${m} ${d}`, count: Math.floor(Math.random() * 5) }); } });

const ProgressAnalytics = () => {
  const weakTopics = Object.entries(USER_MASTERY).sort(([,a],[,b]) => a - b).slice(0, 3).map(([id, val]) => ({ ...TOPICS.find(t => t.id === id), mastery: val }));

  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <div className="section-label"><BarChart3 size={14} /> Analytics</div>
        <h1><span className="glow-text">Progress Dashboard</span></h1>
        <p>Track your DSA journey across all topics.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 32 }} className="stagger-children">
        {[
          { label: 'Problems Solved', value: USER_STATS.totalSolved },
          { label: 'Accuracy', value: `${USER_STATS.accuracy}%` },
          { label: 'Day Streak', value: USER_STATS.streak },
          { label: 'Optimal Rate', value: `${USER_STATS.optimalRate}%` },
        ].map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }} className="accent-text">{s.value}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Radar */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1rem', marginBottom: 16 }}>Skill Radar (All Topics)</h3>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 9 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar dataKey="mastery" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1rem', marginBottom: 16 }}>Problems by Topic</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f1f5f9' }} />
              <Bar dataKey="solved" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="attempted" fill="#a855f730" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weak Areas */}
      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: '1rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><Target size={18} color="var(--red)" /> Areas Needing Improvement</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {weakTopics.map((t, i) => (
            <Link to={`/learn/${t.id}`} key={i} className="glass-card glass-card-interactive" style={{ padding: 16, textDecoration: 'none', textAlign: 'center' }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: 8 }}>{t.icon}</span>
              <div style={{ fontWeight: 600, marginBottom: 4, color: 'var(--text-primary)' }}>{t.name}</div>
              <div style={{ color: 'var(--red)', fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>{t.mastery}%</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>mastery</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressAnalytics;
