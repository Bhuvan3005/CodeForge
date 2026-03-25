import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, Settings2, ArrowRight, Loader2,
  Code2, CheckCircle2, Info, Plus, Hash,
  Layout, Target, Zap
} from 'lucide-react';
import { TOPICS, DIFFICULTY_LEVELS } from '../data/topics';

const ProblemGenerator = () => {
  const [selected, setSelected] = useState(['sliding-window', 'hashmap']);
  const [difficulty, setDifficulty] = useState('Medium');
  const [count, setCount] = useState(3);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const toggle = (id) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

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

  return (
    <div className="page-container" style={{ background: '#0a0c10', minHeight: '100vh', padding: '40px' }}>

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
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Forge Successful</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Problem set added to your repository.</div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ padding: '4px 12px', borderRadius: 20, background: 'var(--primary-soft)', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
              AI Creative Studio
            </div>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: 12 }}>
            Problem <span style={{ color: 'var(--primary)' }}>Studio</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Transform complex concepts into actionable interview-grade challenges.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 40, alignItems: 'start' }}>

          {/* Config Studio */}
          <div className="card-professional" style={{ padding: 32, background: '#111318', position: 'sticky', top: 40 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Settings2 size={18} color="var(--primary)" /> Configuration
            </h3>

            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Skill Composition</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {TOPICS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => toggle(t.id)}
                    style={{
                      padding: '8px 14px', borderRadius: 10, fontSize: '0.85rem', cursor: 'pointer',
                      background: selected.includes(t.id) ? 'var(--primary-soft)' : '#0a0c10',
                      color: selected.includes(t.id) ? 'white' : 'var(--text-secondary)',
                      border: selected.includes(t.id) ? '1px solid var(--primary)' : '1px solid #1f2937',
                      transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 500
                    }}
                  >
                    {selected.includes(t.id) ? <CheckCircle2 size={14} color="var(--primary)" /> : <span>{t.icon}</span>}
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>Complexity</label>
                <select
                  className="select-field"
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value)}
                  style={{ fontSize: '0.85rem' }}
                >
                  {DIFFICULTY_LEVELS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>Count</label>
                <select
                  className="select-field"
                  value={count}
                  onChange={e => setCount(+e.target.value)}
                  style={{ fontSize: '0.85rem' }}
                >
                  {[1, 2, 3, 5, 10].map(n => <option key={n} value={n}>{n} units</option>)}
                </select>
              </div>
            </div>

            <button
              className="btn-primary"
              style={{ width: '100%', padding: '16px', borderRadius: 12 }}
              onClick={handleGenerate}
              disabled={generating || selected.length === 0}
            >
              {generating ? <><Loader2 size={18} className="animate-spin" /> Forging...</> : <><Sparkles size={18} /> Forge Challenges</>}
            </button>

            <div style={{ marginTop: 24, padding: 16, background: '#0a0c10', borderRadius: 12, border: '1px solid #1f2937' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5, display: 'flex', gap: 10 }}>
                <Info size={16} color="var(--primary)" />
                Unique algorithmic puzzles synthesized from selected concept parameters.
              </p>
            </div>
          </div>

          {/* Result Feed */}
          <div style={{ minHeight: '600px' }}>
            <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ padding: 8, background: '#111318', borderRadius: 8, border: '1px solid #1f2937' }}>
                <Code2 size={20} color="var(--primary)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'white', fontWeight: 700, margin: 0 }}>Forged Artifacts</h3>
              <div style={{ flex: 1, height: '1px', background: '#1f2937' }} />
              {generated.length > 0 && <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{generated.length} units synthesized</span>}
            </div>

            {!generated || generated.length === 0 ? (
              <div style={{
                height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: '#0a0c10', border: '2px dashed #1f2937', borderRadius: 24, color: 'var(--text-dim)'
              }}>
                <div style={{ width: 64, height: 64, borderRadius: 24, background: '#111318', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, border: '1px solid #1f2937' }}>
                  <Plus size={32} />
                </div>
                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Awaiting Configuration</p>
                <p style={{ fontSize: '0.9rem' }}>Select your tech stack and forge the studio.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {generated.map((p, i) => (
                  <div
                    key={p._id || i}
                    className="card-professional animate-fade-in"
                    style={{ padding: 32, background: '#111318', borderLeft: '4px solid var(--primary)' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                          <div style={{ width: 24, height: 24, borderRadius: 6, background: '#0a0c10', border: '1px solid #1f2937', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)' }}>
                            {i + 1}
                          </div>
                          <h4 style={{ fontSize: '1.4rem', color: 'white', fontWeight: 800, margin: 0 }}>{p.title}</h4>
                        </div>
                        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                          <span className={`badge badge-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                          <span style={{ fontSize: '0.75rem', background: '#0a0c10', color: 'var(--text-muted)', padding: '6px 12px', borderRadius: 6, border: '1px solid #1f2937', fontWeight: 600 }}>{p.topic}</span>
                        </div>
                      </div>
                      <Link
                        to={`/problems/${p._id}`}
                        className="btn-primary"
                        style={{ padding: '12px 24px', borderRadius: 10 }}
                      >
                        Attempt <ArrowRight size={18} />
                      </Link>
                    </div>

                    <p style={{
                      color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: 0,
                      display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden'
                    }}>
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProblemGenerator;
