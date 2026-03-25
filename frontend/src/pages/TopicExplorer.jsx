import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass, Search, Sparkles, ArrowRight,
  Layers, Zap, Cpu, MousePointer2,
  ChevronRight, Info, CheckCircle2, X,
  Filter, Settings, Code2
} from 'lucide-react';
import { TOPICS, DIFFICULTY_LEVELS } from '../data/topics';
import { USER_MASTERY } from '../data/sampleProblems';

const CATEGORIES = [
  { id: 'all', name: 'All Topics', icon: <Compass size={18} /> },
  { id: 'foundations', name: 'Foundations', icon: <Layers size={18} />, topics: ['arrays', 'hashmap', 'linked-list', 'stack', 'queue'] },
  { id: 'techniques', name: 'Techniques', icon: <Zap size={18} />, topics: ['sliding-window', 'two-pointers', 'binary-search', 'greedy', 'bit-manipulation'] },
  { id: 'advanced', name: 'Advanced', icon: <Cpu size={18} />, topics: ['trees', 'graphs', 'heap', 'dynamic-programming', 'backtracking', 'tries'] },
];

const TopicExplorer = () => {
  const [selected, setSelected] = useState([]);
  const [difficulty, setDifficulty] = useState('Medium');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState([]);
  const [count, setCount] = useState(2);
  const [showToast, setShowToast] = useState(false);

  const handleGenerate = async () => {
    if (selected.length === 0) return;
    setGenerating(true);

    try {
      const selectedTopicNames = TOPICS.filter(t => selected.includes(t.id)).map(t => t.name);
      const combinedTopics = selectedTopicNames.join(' + ');
      const token = localStorage.getItem('cf_token');

      const response = await fetch(`${import.meta.env.VITE_API_URL}/problems/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          topic: combinedTopics,
          difficulty: difficulty,
          count: count
        })
      });

      if (!response.ok) throw new Error('Failed to generate');

      const data = await response.json();
      setGenerated(data.problems || []);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    } catch (error) {
      console.error(error);
    } finally {
      setGenerating(false);
    }
  };

  const filteredTopics = useMemo(() => {
    let t = TOPICS;
    if (activeCategory !== 'all') {
      const cat = CATEGORIES.find(c => c.id === activeCategory);
      t = t.filter(topic => cat.topics.includes(topic.id));
    }
    if (search) {
      t = t.filter(topic => topic.name.toLowerCase().includes(search.toLowerCase()));
    }
    return t;
  }, [activeCategory, search]);

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="page-container" style={{ display: 'flex', gap: 32, background: '#0a0c10', minHeight: '100vh', padding: '40px' }}>

      {/* Sidebar Filter */}
      <div className="card-professional" style={{ width: 280, padding: 24, background: '#111318', height: 'fit-content', position: 'sticky', top: 40 }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Filter size={14} /> Categories
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 10,
                background: activeCategory === cat.id ? 'var(--primary-soft)' : 'transparent',
                color: activeCategory === cat.id ? 'white' : 'var(--text-secondary)',
                border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                fontWeight: activeCategory === cat.id ? 700 : 500, fontSize: '0.9rem'
              }}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #1f2937' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-main)' }}>
            <Settings size={14} color="var(--primary)" /> Laboratory
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8, display: 'block' }}>DIFFICULTY</label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
                className="select-field"
                style={{ fontSize: '0.85rem' }}
              >
                {DIFFICULTY_LEVELS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8, display: 'block' }}>PROBLEM COUNT</label>
              <input
                type="number" min="1" max="10" value={count}
                onChange={e => setCount(parseInt(e.target.value))}
                className="input-field"
                style={{ fontSize: '0.85rem' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, position: 'relative' }}>

        {/* Toast */}
        {showToast && (
          <div className="animate-fade-in-up" style={{
            position: 'fixed', bottom: 32, right: 32, zIndex: 100,
            background: '#111318', border: '1px solid var(--primary)', color: 'white',
            padding: '16px 24px', borderRadius: 12, boxShadow: 'var(--shadow-lg)',
            display: 'flex', alignItems: 'center', gap: 12
          }}>
            <Sparkles size={18} color="var(--primary)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Challenges Ready</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Check the forged list below.</div>
            </div>
          </div>
        )}

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: 8 }}>
            Topic <span style={{ color: 'var(--primary)' }}>Explorer</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Select your concepts and let the AI forge targeted interview challenges.</p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 32 }}>
          <Search size={20} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            placeholder="Search for a specific algorithm or data structure..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field"
            style={{ paddingLeft: 52, height: 56, fontSize: '1rem' }}
          />
        </div>

        {/* Selected Summary & Action */}
        {selected.length > 0 && (
          <div className="card-professional animate-fade-in-up" style={{ padding: 24, marginBottom: 32, background: 'var(--primary-soft)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flex: 1 }}>
                {selected.map(id => {
                  const t = TOPICS.find(x => x.id === id);
                  return (
                    <span key={id} style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '6px 14px', borderRadius: 10, fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--border-medium)' }}>
                      {t?.name} <X size={14} style={{ cursor: 'pointer', opacity: 0.6 }} onClick={() => toggle(id)} />
                    </span>
                  );
                })}
              </div>
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="btn-primary"
                style={{ padding: '12px 32px', borderRadius: 12, minWidth: 200 }}
              >
                {generating ? 'Forging...' : <><Zap size={18} /> Forge Challenges</>}
              </button>
            </div>
          </div>
        )}

        {/* Results List */}
        {generated.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Forged for You</h3>
              <div style={{ flex: 1, height: 1, background: 'var(--border-medium)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
              {generated.map(p => (
                <div key={p._id} className="card-professional" style={{ padding: 24, background: '#111318' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    <span className={`badge badge-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                    <Code2 size={16} color="var(--text-dim)" />
                  </div>
                  <h4 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700, marginBottom: 12 }}>{p.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: 24, lineHeight: 1.5 }}>
                    Focus on {p.topic} with optimal time complexity constraints.
                  </p>
                  <Link to={`/problems/${p._id}`} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                    Attempt Challenge <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Topic Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {filteredTopics.map(t => {
            const isSelected = selected.includes(t.id);
            return (
              <div
                key={t.id}
                onClick={() => toggle(t.id)}
                className="card-professional"
                style={{
                  padding: 24, cursor: 'pointer', background: isSelected ? 'var(--primary-soft)' : '#111318',
                  border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-light)',
                  transition: 'all 0.2s', position: 'relative'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: 16 }}>{t.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>{t.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.5 }}>{t.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ width: '100%', height: 4, background: '#1f2937', borderRadius: 2 }}>
                    <div style={{ width: `${USER_MASTERY[t.id] || 0}%`, height: '100%', background: 'var(--primary)', borderRadius: 2 }} />
                  </div>
                </div>
                {isSelected && <div style={{ position: 'absolute', top: 12, right: 12 }}><CheckCircle2 size={16} color="var(--primary)" /></div>}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default TopicExplorer;
