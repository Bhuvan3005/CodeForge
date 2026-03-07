import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Settings2, ArrowRight, Loader2, Code2 } from 'lucide-react';
import { TOPICS, DIFFICULTY_LEVELS } from '../data/topics';
import { SAMPLE_PROBLEMS } from '../data/sampleProblems';

const ProblemGenerator = () => {
  const [selected, setSelected] = useState(['sliding-window', 'hashmap']);
  const [difficulty, setDifficulty] = useState('Medium');
  const [count, setCount] = useState(3);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(null);

  const toggle = (id) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerated(SAMPLE_PROBLEMS.filter(p => p.topics.some(t => selected.includes(t))).slice(0, count));
      if (!generated || generated.length === 0) setGenerated(SAMPLE_PROBLEMS.slice(0, count));
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <div className="section-label"><Sparkles size={14} /> AI Engine</div>
        <h1><span className="glow-text">Problem Generator</span></h1>
        <p>Configure topics and difficulty, then let AI craft unique interview problems.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Config */}
        <div className="glass-card" style={{ padding: 28 }}>
          <h3 style={{ fontSize: '1rem', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Settings2 size={18} color="var(--accent-primary)" /> Configuration
          </h3>

          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 8 }}>Select Topics (multi-select)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {TOPICS.map(t => (
              <button key={t.id} onClick={() => toggle(t.id)} style={{
                padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', cursor: 'pointer',
                background: selected.includes(t.id) ? `${t.color}20` : 'rgba(255,255,255,0.04)',
                color: selected.includes(t.id) ? t.color : 'var(--text-muted)',
                border: selected.includes(t.id) ? `1px solid ${t.color}40` : '1px solid var(--border-subtle)',
                fontFamily: 'var(--font-main)', transition: 'all 0.2s',
              }}>
                {t.icon} {t.name}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Difficulty</label>
              <select className="select-field" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                {DIFFICULTY_LEVELS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Count</label>
              <select className="select-field" value={count} onChange={e => setCount(+e.target.value)}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} problem{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
          </div>

          <button className="btn-primary" style={{ width: '100%' }} onClick={handleGenerate} disabled={generating || selected.length === 0}>
            {generating ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Generating...</> : <><Sparkles size={18} /> Generate Problems</>}
          </button>
        </div>

        {/* Results */}
        <div className="glass-card" style={{ padding: 28 }}>
          <h3 style={{ fontSize: '1rem', marginBottom: 20,display: 'flex', alignItems: 'center', gap: 8 }}>
            <Code2 size={18} color="var(--accent-primary)" /> Generated Problems
          </h3>

          {!generated ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <Sparkles size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
              <p>Configure your parameters and click Generate</p>
            </div>
          ) : (
            <div className="stagger-children" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {generated.map((p, i) => (
                <Link to={`/problems/${p.id}`} key={i} className="glass-card glass-card-interactive" style={{ padding: 20, textDecoration: 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{p.title}</h4>
                    <span className={`badge badge-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 8 }}>{p.description.slice(0, 100)}...</p>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {p.topics.map(t => {
                      const topic = TOPICS.find(x => x.id === t);
                      return <span key={t} className="badge badge-topic">{topic?.icon} {topic?.name}</span>;
                    })}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemGenerator;
