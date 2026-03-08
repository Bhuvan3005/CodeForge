import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell,
  AreaChart, Area
} from 'recharts';
import { BarChart3, Target, Zap, TrendingUp, Award } from 'lucide-react';

// Removed hardcoded DEMO_USER_ID

const ProgressAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('cf_user'));
        const token = localStorage.getItem('cf_token');
        if (!storedUser || !token) { setLoading(false); return; }

        const res = await fetch(`${import.meta.env.VITE_API_URL}/progress/${storedUser._id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch');
        const progressData = await res.json();
        setData(progressData);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="page-container">Loading Analytics...</div>;
  if (!data) return <div className="page-container">No analytics data found.</div>;

  const topicData = (data.topicProgress || []).map(tp => ({
    name: tp.topic,
    value: tp.solved
  }));

  // Mock activity data if backend doesn't provide it yet
  const activityData = [
    { day: 'Mon', count: 2 }, { day: 'Tue', count: 4 }, { day: 'Wed', count: 3 },
    { day: 'Thu', count: 7 }, { day: 'Fri', count: 5 }, { day: 'Sat', count: 8 },
    { day: 'Sun', count: 6 },
  ];

  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <div className="section-label"><BarChart3 size={14} /> Analytics</div>
        <h1><span className="glow-text">Performance Metrics</span></h1>
        <p>Deep dive into your learning patterns and progress.</p>
      </div>

      {/* Overview Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <MiniStat label="Problems Solved" value={data.problemsSolved} sub="Lifetime" color="var(--green)" />
        <MiniStat label="Current Streak" value={data.streak} sub="Days" color="var(--accent-primary)" />
        <MiniStat label="Total Attempted" value={data.problemsAttempted} sub="Global" color="var(--yellow)" />
        <MiniStat label="Topics Explored" value={data.topicProgress?.length || 0} sub="Concepts" color="#a855f7" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
        {/* Activity Chart */}
        <div className="glass-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: '1rem' }}>Activity Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ background: '#1e1b4b', border: '1px solid #312e81', borderRadius: '8px' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Topic Breakdown */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1rem', marginBottom: 24 }}>Topic Proficiency</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topicData} layout="vertical" margin={{ left: 0, right: 30 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} width={80} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                {topicData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6366f1' : '#a855f7'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const MiniStat = ({ label, value, sub, color }) => (
  <div className="glass-card" style={{ padding: 20 }}>
    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: '1.4rem', fontWeight: 700, color }}>{value}</div>
    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>
  </div>
);

export default ProgressAnalytics;
