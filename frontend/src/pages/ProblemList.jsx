import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Search, Filter, CheckCircle, AlertCircle, Circle } from 'lucide-react';
import { TOPICS } from '../data/topics';

const STATUS_ICONS = {
  solved: <CheckCircle size={16} color="#22c55e" />, 
  attempted: <AlertCircle size={16} color="#f59e0b" />,
  new: <Circle size={16} color="var(--text-muted)" />,
};

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState('All');
  const [topicFilter, setTopicFilter] = useState('All');

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/problems`);
        const data = await res.json();
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const filtered = problems.filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (diffFilter !== 'All' && p.difficulty !== diffFilter) return false;
    if (topicFilter !== 'All' && !p.topics.includes(topicFilter)) return false;
    return true;
  });

  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <div className="section-label"><Code2 size={14} /> Problem Set</div>
        <h1><span className="glow-text">Problem List</span></h1>
        <p>Browse, filter, and solve coding challenges.</p>
      </div>

      {/* Filters */}
      <div className="glass-card" style={{ padding: 16, marginBottom: 24, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input className="input-field" style={{ paddingLeft: 40 }} placeholder="Search problems..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="select-field" style={{ width: 140 }} value={diffFilter} onChange={e => setDiffFilter(e.target.value)}>
          <option value="All">All Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select className="select-field" style={{ width: 180 }} value={topicFilter} onChange={e => setTopicFilter(e.target.value)}>
          <option value="All">All Topics</option>
          {TOPICS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      {/* Problem Table */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '40px 1fr 100px 200px 80px',
          gap: 16, padding: '12px 20px', borderBottom: '1px solid var(--border-subtle)',
          fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em',
        }}>
          <span></span><span>Title</span><span>Difficulty</span><span>Topics</span><span>Accept %</span>
        </div>
        <div className="stagger-children">
          {loading ? (
            <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)' }}>Loading problems...</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)' }}>No problems found.</div>
          ) : (
            filtered.map(p => (
              <Link to={`/problems/${p._id}`} key={p._id} style={{
                display: 'grid', gridTemplateColumns: '40px 1fr 100px 200px 80px',
                gap: 16, padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)',
                textDecoration: 'none', alignItems: 'center', transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span>{STATUS_ICONS[p.status || 'new']}</span>
                <span style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{p.title}</span>
                <span className={`badge badge-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  <span className="badge badge-topic" style={{ fontSize: '0.65rem' }}>{p.topic}</span>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>{p.acceptance || 'N/A'}%</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemList;
