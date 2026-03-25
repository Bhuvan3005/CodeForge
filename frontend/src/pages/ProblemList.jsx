import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Search, Filter, CheckCircle2, AlertCircle, Circle, ArrowRight, Table, List, Clock, Zap } from 'lucide-react';
import { TOPICS } from '../data/topics';

const STATUS_ICONS = {
  solved: <CheckCircle2 size={16} color="var(--success)" />,
  attempted: <AlertCircle size={16} color="var(--warning)" />,
  new: <Circle size={16} color="var(--text-dim)" />,
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
    <div className="page-container" style={{ background: '#0a0c10', minHeight: '100vh', padding: '40px' }}>

      {/* Header Area */}
      <div className="page-header animate-fade-in-up" style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ padding: '4px 12px', borderRadius: 20, background: 'var(--primary-soft)', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
            Curated Library
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            <Clock size={14} /> Total: {problems.length} challenges
          </div>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white' }}>Problem <span style={{ color: 'var(--primary)' }}>Library</span></h1>
        <p style={{ maxWidth: 600 }}>Master the patterns of technical excellence through our curated collection of industry-grade problems.</p>
      </div>

      {/* Control Bar */}
      <div className="card-professional" style={{ padding: 20, marginBottom: 32, display: 'flex', gap: 16, alignItems: 'center', background: '#111318' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            className="input-field"
            style={{ paddingLeft: 48, height: 48 }}
            placeholder="Search problems by name or pattern..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <select
            className="select-field"
            style={{ width: 160, height: 48 }}
            value={diffFilter}
            onChange={e => setDiffFilter(e.target.value)}
          >
            <option value="All">All Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select
            className="select-field"
            style={{ width: 220, height: 48 }}
            value={topicFilter}
            onChange={e => setTopicFilter(e.target.value)}
          >
            <option value="All">All Topics</option>
            {TOPICS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
      </div>

      {/* Table Interface */}
      <div className="card-professional" style={{ overflow: 'hidden', background: '#111318', border: '1px solid #1f2937' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '60px 1fr 120px 220px 100px 120px',
          gap: 16, padding: '16px 24px', background: '#0a0c10', borderBottom: '1px solid #1f2937',
          fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
        }}>
          <span style={{ textAlign: 'center' }}>Status</span>
          <span>Problem Title</span>
          <span style={{ textAlign: 'center' }}>Difficulty</span>
          <span>Topic Patterns</span>
          <span style={{ textAlign: 'center' }}>Acceptance</span>
          <span style={{ textAlign: 'right' }}>Action</span>
        </div>

        <div className="stagger-children" style={{ maxHeight: 'calc(100vh - 400px)', overflowY: 'auto' }}>
          {loading ? (
            <div style={{ padding: 60, textAlign: 'center', color: 'var(--text-dim)' }}>
              <div className="animate-pulse" style={{ marginBottom: 16 }}><Zap size={32} /></div>
              <div style={{ fontWeight: 600 }}>Syncing Problem Repo...</div>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: 60, textAlign: 'center', color: 'var(--text-dim)' }}>
              <AlertCircle size={32} style={{ marginBottom: 16 }} />
              <div style={{ fontWeight: 600 }}>Empty Set</div>
              <div style={{ fontSize: '0.85rem' }}>No problems match your current configuration.</div>
            </div>
          ) : (
            filtered.map((p, idx) => (
              <div key={p._id} style={{
                display: 'grid', gridTemplateColumns: '60px 1fr 120px 220px 100px 120px',
                gap: 16, padding: '20px 24px', borderBottom: '1px solid #1f2937',
                alignItems: 'center', transition: 'all 0.2s', background: idx % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.1)'
              }} className="list-row-hover">
                <div style={{ display: 'flex', justifyContent: 'center' }}>{STATUS_ICONS[p.status || 'new']}</div>
                <div>
                  <Link to={`/problems/${p._id}`} style={{ textDecoration: 'none', fontWeight: 700, color: 'white', fontSize: '1rem', transition: 'color 0.2s' }} className="title-link">
                    {p.title}
                  </Link>
                  {p.isAI && <span style={{ fontSize: '0.65rem', background: 'var(--primary-soft)', color: 'var(--primary)', padding: '2px 6px', borderRadius: 4, marginLeft: 8, fontWeight: 800 }}>AI FORGED</span>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <span className={`badge badge-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: '#1f2937', padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>
                    {p.topic}
                  </span>
                </div>
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  {p.acceptance || Math.floor(Math.random() * 40 + 40)}%
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Link to={`/problems/${p._id}`} className="btn-ghost" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                    Attempt <ArrowRight size={14} />
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

export default ProblemList;
