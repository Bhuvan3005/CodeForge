import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { History, Search, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';

const DEMO_USER_ID = '69ac577afd45aa426e87ebc5';

const SubmissionHistory = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/submissions/${DEMO_USER_ID}`);
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
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <div className="section-label"><History size={14} /> History</div>
        <h1><span className="glow-text">Submission History</span></h1>
        <p>Review all past submissions and their analysis.</p>
      </div>

      {/* Filter */}
      <div className="glass-card" style={{ padding: 12, marginBottom: 24, display: 'flex', gap: 8 }}>
        {['All', 'Accepted', 'Wrong Answer', 'Time Limit Exceeded'].map(v => (
          <button key={v} className={`tab-item ${filter === v ? 'active' : ''}`} style={{ flex: 'none', padding: '8px 16px' }} onClick={() => setFilter(v)}>
            {v}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 140px 90px 90px 90px 50px',
          gap: 12, padding: '12px 20px', borderBottom: '1px solid var(--border-subtle)',
          fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em',
        }}>
          <span>Problem</span><span>Verdict</span><span>Language</span><span>Runtime</span><span>Date</span><span></span>
        </div>
        <div className="stagger-children">
          {loading ? (
            <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)' }}>Loading history...</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)' }}>No submissions found.</div>
          ) : (
            filtered.map((s, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 140px 90px 90px 90px 50px',
                gap: 12, padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)', alignItems: 'center',
              }}>
                <Link to={`/problems/${s.problemId?._id}`} style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--text-primary)', textDecoration: 'none' }}>{s.problemId?.title || 'Unknown Problem'}</Link>
                <VerdictPill verdict={s.status} />
                <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.language}</span>
                <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.runtime}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(s.createdAt).toLocaleDateString()}</span>
                <Link to={`/analysis/${s._id}`} title="View Analysis"><Eye size={16} color="var(--text-muted)" /></Link>
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
    'Accepted': { bg: 'rgba(34,197,94,0.1)', color: '#22c55e', icon: <CheckCircle size={14} /> },
    'Wrong Answer': { bg: 'rgba(239,68,68,0.1)', color: '#ef4444', icon: <XCircle size={14} /> },
    'Time Limit Exceeded': { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b', icon: <Clock size={14} /> },
  };
  const c = map[verdict] || { bg: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', icon: null };
  return (
    <span className="badge" style={{ background: c.bg, color: c.color, border: `1px solid ${c.color}20`, display: 'inline-flex', gap: 4 }}>
      {c.icon} {verdict}
    </span>
  );
};

export default SubmissionHistory;
