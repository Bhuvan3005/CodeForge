import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { History, Search, CheckCircle2, XCircle, Clock, Eye, AlertCircle, Calendar, Hash, Activity } from 'lucide-react';

const SubmissionHistory = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('cf_user'));
        const token = localStorage.getItem('cf_token');
        if (!storedUser || !token) { setLoading(false); return; }

        const res = await fetch(`${import.meta.env.VITE_API_URL}/submissions/${storedUser._id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setSubmissions(data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const filtered = submissions.filter(s => filter === 'All' || s.status === filter);

  return (
    <div className="page-container" style={{ background: '#0a0c10', minHeight: '100vh', padding: '40px' }}>

      <div className="page-header animate-fade-in-up" style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ padding: '4px 12px', borderRadius: 20, background: 'var(--primary-soft)', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
            Deployment Logs
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            <Activity size={14} /> Total: {submissions.length} executions
          </div>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white' }}>Submission <span style={{ color: 'var(--primary)' }}>Archive</span></h1>
        <p style={{ maxWidth: 600 }}>A chronological record of your algorithmic iterations and system benchmarks.</p>
      </div>

      {/* Filter Tabs */}
      <div className="card-professional" style={{ padding: '8px 12px', marginBottom: 32, display: 'flex', gap: 8, background: '#111318', width: 'fit-content' }}>
        {['All', 'Accepted', 'Wrong Answer', 'Time Limit Exceeded'].map(v => (
          <button
            key={v}
            className={`tab-item ${filter === v ? 'active' : ''}`}
            style={{
              padding: '8px 20px', fontSize: '0.85rem', cursor: 'pointer', borderRadius: 8,
              background: filter === v ? 'var(--primary)' : 'transparent',
              color: filter === v ? 'white' : 'var(--text-dim)',
              border: 'none', fontWeight: 700, transition: 'all 0.2s'
            }}
            onClick={() => setFilter(v)}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Record Table */}
      <div className="card-professional" style={{ overflow: 'hidden', background: '#111318', border: '1px solid #1f2937' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 180px 120px 120px 140px 80px',
          gap: 16, padding: '16px 24px', background: '#0a0c10', borderBottom: '1px solid #1f2937',
          fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em',
        }}>
          <span>Target Module</span>
          <span style={{ textAlign: 'center' }}>Verdict</span>
          <span style={{ textAlign: 'center' }}>Environment</span>
          <span style={{ textAlign: 'center' }}>Latency</span>
          <span style={{ textAlign: 'center' }}>Timestamp</span>
          <span style={{ textAlign: 'right' }}>Review</span>
        </div>

        <div className="stagger-children" style={{ maxHeight: 'calc(100vh - 400px)', overflowY: 'auto' }}>
          {loading ? (
            <div style={{ padding: 60, textAlign: 'center', color: 'var(--text-dim)' }}>
              <div className="animate-spin" style={{ display: 'inline-block', marginBottom: 16 }}><History size={32} /></div>
              <div style={{ fontWeight: 600 }}>Fetching Archive...</div>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: 60, textAlign: 'center', color: 'var(--text-dim)' }}>
              <AlertCircle size={32} style={{ marginBottom: 16 }} />
              <div style={{ fontWeight: 600 }}>No Records Found</div>
            </div>
          ) : (
            filtered.map((s, idx) => (
              <div key={s._id} style={{
                display: 'grid', gridTemplateColumns: '1fr 180px 120px 120px 140px 80px',
                gap: 16, padding: '20px 24px', borderBottom: '1px solid #1f2937',
                alignItems: 'center', transition: 'all 0.2s', background: idx % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.1)'
              }} className="list-row-hover">
                <Link to={`/problems/${s.problemId?._id}`} style={{ fontWeight: 800, fontSize: '1rem', color: 'white', textDecoration: 'none' }} className="title-link">
                  {s.problemId?.title || 'Unknown Artifact'}
                </Link>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <VerdictPill verdict={s.status} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '0.75rem', background: '#1f2937', color: 'var(--text-dim)', padding: '4px 12px', borderRadius: 6, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    {s.language?.toUpperCase()}
                  </span>
                </div>
                <div style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  {s.runtime || '0ms'}
                </div>
                <div style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem', fontWeight: 600 }}>
                  <Calendar size={12} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                  {new Date(s.createdAt).toLocaleDateString()}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Link to={`/analysis/${s._id}`} style={{ color: 'var(--primary)', opacity: 0.8, transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}>
                    <Eye size={20} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const VerdictPill = ({ verdict }) => {
  const map = {
    'Accepted': { bg: 'var(--success-soft)', color: 'var(--success)', icon: <CheckCircle2 size={14} /> },
    'Wrong Answer': { bg: 'var(--error-soft)', color: 'var(--error)', icon: <XCircle size={14} /> },
    'Time Limit Exceeded': { bg: 'var(--warning-soft)', color: 'var(--warning)', icon: <Clock size={14} /> },
  };
  const c = map[verdict] || { bg: '#1f2937', color: 'var(--text-dim)', icon: <AlertCircle size={14} /> };
  return (
    <span className="badge" style={{ background: c.bg, color: c.color, border: `1px solid ${c.color}33`, display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 800, fontSize: '0.7rem' }}>
      {c.icon} {verdict.toUpperCase()}
    </span>
  );
};

export default SubmissionHistory;
