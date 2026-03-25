import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell,
  AreaChart, Area
} from 'recharts';
import { BarChart3, Target, Zap, TrendingUp, Award, Calendar, Activity, PieChart } from 'lucide-react';

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

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a0c10', color: 'var(--text-secondary)' }}>
      <Activity size={24} className="animate-pulse" />
      <span style={{ marginLeft: 12, fontWeight: 600 }}>Analyzing Performance...</span>
    </div>
  );

  if (!data) return <div className="page-container">No analytics data found.</div>;

  const topicData = (data.topicProgress || []).map(tp => ({
    name: tp.topic,
    value: tp.solved
  }));

  const activityData = [
    { day: 'Mon', count: 2 }, { day: 'Tue', count: 4 }, { day: 'Wed', count: 3 },
    { day: 'Thu', count: 7 }, { day: 'Fri', count: 5 }, { day: 'Sat', count: 8 },
    { day: 'Sun', count: 6 },
  ];

  return (
    <div className="page-container" style={{ background: '#0a0c10', minHeight: '100vh', padding: '40px' }}>

      <div className="page-header animate-fade-in-up" style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ padding: '4px 12px', borderRadius: 20, background: 'var(--primary-soft)', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
            Intelligence Center
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            <Calendar size={14} /> Last Update: Just now
          </div>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white' }}>Performance <span style={{ color: 'var(--primary)' }}>Metrics</span></h1>
        <p style={{ maxWidth: 600 }}>Quantum analysis of your algorithmic evolution and skill distribution.</p>
      </div>

      {/* Meta Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
        <MiniStat label="Solved" value={data.problemsSolved} sub="Verified Units" icon={<CheckCircle2 size={20} />} color="var(--success)" />
        <MiniStat label="Velocity" value={`${data.streak}d`} sub="Current Streak" icon={<Zap size={20} />} color="var(--primary)" />
        <MiniStat label="Engagement" value={data.problemsAttempted} sub="Total Interaction" icon={<Target size={20} />} color="var(--warning)" />
        <MiniStat label="Portfolio" value={data.topicProgress?.length || 0} sub="Expertise Areas" icon={<PieChart size={20} />} color="#a855f7" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>

        {/* Evolutionary Trend */}
        <div className="card-professional" style={{ padding: 32, background: '#111318' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <TrendingUp size={20} color="var(--primary)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Activity Evolution</h3>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700 }}>PAST 7 DAYS</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-dim)', fontSize: 11, fontWeight: 700 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-dim)', fontSize: 11, fontWeight: 700 }} />
              <Tooltip
                contentStyle={{ background: '#0a0c10', border: '1px solid #1f2937', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}
                itemStyle={{ color: 'white', fontSize: '0.85rem' }}
                labelStyle={{ color: 'var(--text-dim)', marginBottom: 4, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}
              />
              <Area type="monotone" dataKey="count" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#chartGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Composition */}
        <div className="card-professional" style={{ padding: 32, background: '#111318' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <BarChart3 size={20} color="#a855f7" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Concept Proficiency</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topicData} layout="vertical" margin={{ left: 0, right: 30 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-dim)', fontSize: 11, fontWeight: 800 }} width={80} />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                contentStyle={{ background: '#0a0c10', border: '1px solid #1f2937', borderRadius: '8px' }}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
                {topicData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'var(--primary)' : '#a855f7'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

const MiniStat = ({ label, value, sub, icon, color }) => (
  <div className="card-professional" style={{ padding: 24, background: '#111318' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
      <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
      <div style={{ color: color, opacity: 0.8 }}>{icon}</div>
    </div>
    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', fontFamily: 'var(--font-mono)' }}>{value}</div>
    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: 4, fontWeight: 600 }}>{sub}</div>
  </div>
);

export default ProgressAnalytics;
