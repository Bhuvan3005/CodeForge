import React from 'react';
import { Link } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Sparkles, Flame, Target, TrendingUp, Clock, Zap, ArrowRight, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { TOPICS } from '../data/topics';
import { USER_MASTERY, USER_STATS, RECENT_SUBMISSIONS } from '../data/sampleProblems';

const radarData = TOPICS.slice(0, 8).map(t => ({
  subject: t.name,
  mastery: USER_MASTERY[t.id] || 0,
  fullMark: 100,
}));

const Dashboard = () => {
  const weakTopics = Object.entries(USER_MASTERY)
    .sort(([,a], [,b]) => a - b)
    .slice(0, 3)
    .map(([id, val]) => ({ ...TOPICS.find(t => t.id === id), mastery: val }));

  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <div className="section-label"><Sparkles size={14} /> Command Center</div>
        <h1 style={{ fontSize: '2.4rem' }}><span className="glow-text">Dashboard</span></h1>
        <p>Welcome back, Engineer. Here's your progress at a glance.</p>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 32 }} className="stagger-children">
        <StatCard icon={<CheckCircle size={20} />} label="Solved" value={USER_STATS.totalSolved} color="var(--green)" />
        <StatCard icon={<Flame size={20} />} label="Day Streak" value={USER_STATS.streak} color="#f59e0b" />
        <StatCard icon={<Target size={20} />} label="Accuracy" value={`${USER_STATS.accuracy}%`} color="var(--accent-primary)" />
        <StatCard icon={<Clock size={20} />} label="Avg Time" value={USER_STATS.avgTime} color="#a855f7" />
        <StatCard icon={<Zap size={20} />} label="Optimal Rate" value={`${USER_STATS.optimalRate}%`} color="#ec4899" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        {/* Skill Radar */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1rem', marginBottom: 16 }}>Skill Radar</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Mastery" dataKey="mastery" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Weak Concepts Alert */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="glass-card" style={{ padding: 24, flex: 1, border: '1px solid rgba(239, 68, 68, 0.15)' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertTriangle size={18} color="var(--red)" /> Weak Concepts
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {weakTopics.map((t, i) => (
                <Link to={`/learn/${t.id}`} key={i} style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)', transition: 'all 0.2s',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: '1.2rem' }}>{t.icon}</span>
                      <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{t.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 80, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }}>
                        <div style={{ width: `${t.mastery}%`, height: '100%', background: t.mastery < 30 ? 'var(--red)' : 'var(--yellow)', borderRadius: 3, transition: 'width 0.6s' }} />
                      </div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', minWidth: 32 }}>{t.mastery}%</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link to="/generate" className="glass-card glass-card-interactive" style={{
            padding: 24, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08))',
            border: '1px solid rgba(99,102,241,0.2)',
          }}>
            <div>
              <div className="section-label" style={{ marginBottom: 4 }}><Sparkles size={12} /> AI Recommended</div>
              <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>Generate a New Challenge</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: 4 }}>Based on your weak areas</div>
            </div>
            <ArrowRight size={20} color="var(--accent-primary)" />
          </Link>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="glass-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: '1rem' }}>Recent Submissions</h3>
          <Link to="/history" className="btn-ghost">View All <ArrowRight size={14} /></Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {RECENT_SUBMISSIONS.map((s, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr auto auto auto',
              gap: 16, alignItems: 'center', padding: '12px 16px',
              background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)',
            }}>
              <Link to={`/problems/${s.problemId}`} style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--text-primary)', textDecoration: 'none' }}>{s.problemTitle}</Link>
              <VerdictBadge verdict={s.verdict} />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>{s.runtime}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{s.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="glass-card" style={{ padding: '20px 16px', textAlign: 'center' }}>
    <div style={{ color, marginBottom: 8, display: 'flex', justifyContent: 'center' }}>{icon}</div>
    <div style={{ fontSize: '1.6rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>{value}</div>
    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 4 }}>{label}</div>
  </div>
);

const VerdictBadge = ({ verdict }) => {
  const config = {
    'Accepted': { bg: 'rgba(34,197,94,0.1)', color: '#22c55e', border: 'rgba(34,197,94,0.2)' },
    'Wrong Answer': { bg: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'rgba(239,68,68,0.2)' },
    'Time Limit Exceeded': { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: 'rgba(245,158,11,0.2)' },
  }[verdict] || { bg: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: 'var(--border-subtle)' };

  return (
    <span className="badge" style={{ background: config.bg, color: config.color, border: `1px solid ${config.border}` }}>
      {verdict}
    </span>
  );
};

export default Dashboard;
