import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Sparkles, Flame, Target, TrendingUp, Zap, ArrowRight, AlertCircle, CheckCircle2, Trophy, Clock } from 'lucide-react';
import { TOPICS } from '../data/topics';

const Dashboard = () => {
  const [progress, setProgress] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('cf_user'));
        const token = localStorage.getItem('cf_token');
        if (!storedUser || !token) { setLoading(false); return; }

        const userId = storedUser._id;

        const [progressRes, userRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/progress/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${import.meta.env.VITE_API_URL}/auth/${userId}`)
        ]);

        const progressData = await progressRes.json();
        const userData = await userRes.json();

        setProgress(progressData);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a0c10', color: 'var(--text-secondary)' }}>
      <Zap size={24} className="animate-pulse" />
      <span style={{ marginLeft: 12, fontWeight: 600 }}>Loading Command Center...</span>
    </div>
  );

  let radarData = [];
  if (progress?.topicProgress && progress.topicProgress.length > 0) {
    radarData = progress.topicProgress.map(tp => ({
      subject: tp.topic,
      mastery: tp.solved * 10,
      fullMark: 100,
    }));
  } else {
    radarData = [
      { subject: 'Arrays', mastery: 30, fullMark: 100 },
      { subject: 'Strings', mastery: 20, fullMark: 100 },
      { subject: 'DP', mastery: 10, fullMark: 100 },
      { subject: 'Graphs', mastery: 15, fullMark: 100 },
      { subject: 'Trees', mastery: 25, fullMark: 100 },
    ];
  }

  const weakTopics = progress?.topicProgress?.length > 0
    ? [...progress.topicProgress]
      .sort((a, b) => a.solved - b.solved)
      .slice(0, 3)
      .map(tp => {
        const topicInfo = TOPICS.find(t => t.name.includes(tp.topic)) || { icon: '🧩', name: tp.topic };
        return { ...topicInfo, mastery: tp.solved * 10 };
      })
    : [{ icon: '🚀', name: 'Start Your Practice', mastery: 0, id: 'arrays' }];

  return (
    <div className="page-container" style={{ background: '#0a0c10' }}>
      <div className="page-header animate-fade-in-up">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ padding: '4px 12px', borderRadius: 20, background: 'var(--primary-soft)', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
            Active Session
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            <Clock size={14} /> Last sync: just now
          </div>
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: 12, fontWeight: 800 }}>
          Welcome back, <span style={{ color: 'var(--primary)' }}>{user?.name?.split(' ')[0] || 'Engineer'}</span>
        </h1>
        <p style={{ maxWidth: 600 }}>Your mastery across DSA domains is evolving. Stay consistent to forge your path to seniority.</p>
      </div>

      {/* Stats Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 40 }} className="stagger-children">
        <StatCard icon={<CheckCircle2 size={20} />} label="Total Solved" value={progress?.problemsSolved || 0} color="var(--success)" />
        <StatCard icon={<Flame size={20} />} label="Active Streak" value={`${progress?.streak || 0} Days`} color="var(--warning)" />
        <StatCard icon={<Trophy size={20} />} label="Current Rank" value={user?.progressStats?.rank || 'Beginner'} color="#a855f7" />
        <StatCard icon={<Target size={20} />} label="Accuracy" value={`${Math.round(((progress?.problemsSolved || 0) / (progress?.problemsAttempted || 1)) * 100)}%`} color="var(--primary)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 32, alignItems: 'start' }}>

        {/* Analytics Section */}
        <div className="card-professional" style={{ padding: 32, background: '#111318' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Domain Mastery</h3>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Visual Skill Mapping</div>
          </div>
          <div style={{ height: 350, width: '100%', marginLeft: -20 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#1f2937" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Mastery"
                  dataKey="mastery"
                  stroke="var(--primary)"
                  fill="var(--primary)"
                  fillOpacity={0.15}
                  strokeWidth={3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ marginTop: 20, display: 'flex', gap: 24, justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--primary)' }} /> Current Skill Level
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Weak Areas Card */}
          <div className="card-professional" style={{ padding: 28, background: '#111318' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <AlertCircle size={20} color="var(--error)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Critical Areas</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {weakTopics.map((t, i) => (
                <Link to={t.id ? `/learn/${t.id}` : '#'} key={i} style={{ display: 'block' }}>
                  <div style={{
                    padding: 16, borderRadius: 12, border: '1px solid #1f2937',
                    background: '#0a0c10', transition: 'all 0.2s'
                  }} className="weak-area-item">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t.mastery}%</span>
                    </div>
                    <div style={{ width: '100%', height: 4, background: '#1f2937', borderRadius: 2 }}>
                      <div style={{ width: `${t.mastery}%`, height: '100%', background: 'var(--primary)', borderRadius: 2 }} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Action Card */}
          <Link to="/generate" style={{ display: 'block' }}>
            <div style={{
              padding: 32, borderRadius: 20, background: 'var(--primary)',
              color: 'white', position: 'relative', overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)'
            }}>
              <Sparkles size={60} style={{ position: 'absolute', right: -10, bottom: -10, opacity: 0.2 }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 8 }}>Next Challenge</h4>
                <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: 20, lineHeight: 1.5 }}>
                  AI has prepared a problem set tailored to your weak areas.
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: 10, fontWeight: 700, fontSize: '0.85rem' }}>
                  Forge Now <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="card-professional" style={{ padding: 24, background: '#111318', textAlign: 'left', borderLeft: `4px solid ${color}` }}>
    <div style={{ color, marginBottom: 12 }}>{icon}</div>
    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>{value}</div>
  </div>
);

export default Dashboard;
