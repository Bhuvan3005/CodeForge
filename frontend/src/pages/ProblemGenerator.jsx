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
  const [generated, setGenerated] = useState([]);

  const toggle = (id) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const handleGenerate = async () => {
    setGenerating(true);

    try {
      // Get the full names for the selected topcis
      const selectedTopicNames = TOPICS.filter(t => selected.includes(t.id)).map(t => t.name);
      const combinedTopics = selectedTopicNames.join(' + ');

      const response = await fetch('http://localhost:5000/api/problems/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: combinedTopics,
          difficulty: difficulty,
          count: count
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate problems');
      }

      const data = await response.json();

      // Map the API response format to the format required by the UI
      const mappedProblems = (data.problems || []).map((p, i) => ({
        id: `gen-${Date.now()}-${i}`,
        title: p.name,
        description: p.description,
        difficulty: difficulty,
        topics: selected,
        testcases: p.testcases

      }));
      alert('Problems generated successfully');

      setGenerated(mappedProblems);
    } catch (error) {
      console.error(error);
      alert('Error fetching problems from AI Agent');
    } finally {
      setGenerating(false);
    }
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
                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} problem{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
          </div>

          <button className="btn-primary" style={{ width: '100%' }} onClick={handleGenerate} disabled={generating || selected.length === 0}>
            {generating ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Generating...</> : <><Sparkles size={18} /> Generate Problems</>}
          </button>
        </div>

        {/* Results */}
        <div className="glass-card" style={{ padding: 28 }}>
          <h3 style={{ fontSize: '1rem', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
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
                <div key={i} className="glass-card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{p.title}</h4>
                    <span className={`badge badge-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 16, whiteSpace: 'pre-wrap' }}>
                    {p.description}
                  </p>

                  {p.testcases && p.testcases.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <strong style={{ fontSize: '0.8rem', color: 'var(--text-primary)', display: 'block', marginBottom: 8 }}>Test Cases:</strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {p.testcases.map((tc, tcIdx) => (
                          <div key={tcIdx} style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 12px', borderRadius: 6, fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                            <div><strong style={{ color: 'var(--accent-primary)' }}>Input:</strong> {tc.input}</div>
                            <div style={{ marginTop: 4 }}><strong style={{ color: 'var(--accent-primary)' }}>Output:</strong> {tc.output}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 6 }}>
                    {p.topics?.map(t => {
                      const topic = TOPICS.find(x => x.id === t);
                      return topic ? <span key={t} className="badge badge-topic">{topic.icon} {topic.name}</span> : null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemGenerator;
