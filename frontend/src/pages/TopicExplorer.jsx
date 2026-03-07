import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Search, Sparkles, ArrowRight } from 'lucide-react';
import { TOPICS, DIFFICULTY_LEVELS } from '../data/topics';
import { USER_MASTERY } from '../data/sampleProblems';

const TopicExplorer = () => {
  const [selected, setSelected] = useState([]);
  const [difficulty, setDifficulty] = useState('Medium');
  const [search, setSearch] = useState('');

  const filtered = TOPICS.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <div className="section-label"><Compass size={14} /> Explore</div>
        <h1><span className="glow-text">Topic Explorer</span></h1>
        <p>Select topics to learn, practice, or generate AI problems.</p>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ position: 'relative', maxWidth: 400 }}>
          <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input className="input-field" style={{ paddingLeft: 40 }} placeholder="Search topics..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Topic Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16, marginBottom: 32 }} className="stagger-children">
        {filtered.map(t => {
          const mastery = USER_MASTERY[t.id] || 0;
          const isSelected = selected.includes(t.id);
          return (
            <div
              key={t.id}
              onClick={() => toggle(t.id)}
              className="glass-card"
              style={{
                padding: 20, cursor: 'pointer', transition: 'all 0.25s var(--ease)',
                border: isSelected ? `1px solid ${t.color}55` : undefined,
                boxShadow: isSelected ? `0 0 20px ${t.color}20` : undefined,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span style={{ fontSize: '1.8rem' }}>{t.icon}</span>
                {isSelected && (
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'white', fontWeight: 700 }}>✓</span>
                )}
              </div>
              <h3 style={{ fontSize: '1rem', marginBottom: 4 }}>{t.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 12, lineHeight: 1.5 }}>{t.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.problems} problems</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 60, height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                    <div style={{ width: `${mastery}%`, height: '100%', background: t.color, borderRadius: 2, transition: 'width 0.5s' }} />
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{mastery}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Bar */}
      {selected.length > 0 && (
        <div className="glass-card animate-fade-in-up" style={{
          padding: '16px 24px', position: 'sticky', bottom: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(18,18,22,0.95)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(99,102,241,0.2)',
        }}>
          <div>
            <span style={{ fontWeight: 600 }}>{selected.length} topics selected</span>
            <span style={{ color: 'var(--text-muted)', marginLeft: 12, fontSize: '0.85rem' }}>
              {selected.map(id => TOPICS.find(t => t.id === id)?.name).join(' + ')}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <select className="select-field" style={{ width: 120, padding: '8px 12px' }} value={difficulty} onChange={e => setDifficulty(e.target.value)}>
              {DIFFICULTY_LEVELS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <Link to={`/generate?topics=${selected.join(',')}&difficulty=${difficulty}`} className="btn-primary">
              <Sparkles size={16} /> Generate Problem <ArrowRight size={14} />
            </Link>
            <Link to={`/topics/${selected[0]}`} className="btn-secondary">Learn Topic</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicExplorer;
