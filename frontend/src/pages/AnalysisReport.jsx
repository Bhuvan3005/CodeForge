import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, AlertTriangle, BarChart3, Zap, BookOpen, Brain, ArrowRight, Code2, Target } from 'lucide-react';
import { MOCK_ANALYSIS, MOCK_TEST_RESULTS } from '../data/mockAnalysis';

const AnalysisReport = () => {
  const [activeTab, setActiveTab] = useState('results');
  const a = MOCK_ANALYSIS;
  const passedCount = MOCK_TEST_RESULTS.filter(t => t.passed).length;

  const TABS = [
    { id: 'results', icon: Target, label: 'Test Results' },
    { id: 'analysis', icon: Code2, label: 'Solution Analysis' },
    { id: 'complexity', icon: BarChart3, label: 'Complexity' },
    { id: 'optimization', icon: Zap, label: 'Optimization' },
    { id: 'weakness', icon: AlertTriangle, label: 'Weak Concept' },
    { id: 'lesson', icon: BookOpen, label: 'Micro Lesson' },
    { id: 'next', icon: Brain, label: 'Next Steps' },
  ];

  return (
    <div className="page-container" style={{ maxWidth: 1000 }}>
      <div className="page-header animate-fade-in-up">
        <Link to="/problems" className="btn-ghost" style={{ marginBottom: 8 }}>← Back to Problems</Link>
        <div className="section-label"><Brain size={14} /> AI Deep Analysis</div>
        <h1><span className="glow-text">{a.problemTitle}</span></h1>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <span className="badge" style={{ background: passedCount === MOCK_TEST_RESULTS.length ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: passedCount === MOCK_TEST_RESULTS.length ? '#22c55e' : '#ef4444', border: '1px solid ' + (passedCount === MOCK_TEST_RESULTS.length ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)') }}>
            {passedCount}/{MOCK_TEST_RESULTS.length} Tests Passed
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-bar" style={{ marginBottom: 24 }}>
        {TABS.map(t => {
          const Icon = t.icon;
          return (
            <button key={t.id} className={`tab-item ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
              <Icon size={14} /> {t.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="animate-fade-in" key={activeTab}>
        {activeTab === 'results' && (
          <div className="glass-card" style={{ padding: 24 }}>
            <h3 style={{ marginBottom: 16 }}>Test Case Results</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {MOCK_TEST_RESULTS.map(t => (
                <div key={t.id} style={{
                  display: 'grid', gridTemplateColumns: '40px 1fr 1fr 1fr 80px',
                  gap: 12, alignItems: 'center', padding: '12px 16px',
                  background: t.passed ? 'rgba(34,197,94,0.03)' : 'rgba(239,68,68,0.03)',
                  borderRadius: 'var(--radius-sm)', border: `1px solid ${t.passed ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)'}`,
                }}>
                  {t.passed ? <CheckCircle size={18} color="#22c55e" /> : <XCircle size={18} color="#ef4444" />}
                  <div><span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Input</span><div className="mono" style={{ fontSize: '0.85rem' }}>{t.input}</div></div>
                  <div><span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Expected</span><div className="mono" style={{ fontSize: '0.85rem' }}>{JSON.stringify(t.expected)}</div></div>
                  <div><span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Actual</span><div className="mono" style={{ fontSize: '0.85rem', color: t.passed ? 'var(--green)' : 'var(--red)' }}>{JSON.stringify(t.actual)}</div></div>
                  <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.runtime}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="glass-card" style={{ padding: 24 }}>
              <h3 style={{ color: 'var(--green)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle size={18} /> What's Correct</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {a.solutionAnalysis.correct.map((c, i) => <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', paddingLeft: 8 }}>✓ {c}</li>)}
              </ul>
            </div>
            <div className="glass-card" style={{ padding: 24 }}>
              <h3 style={{ color: 'var(--red)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}><XCircle size={18} /> What's Incorrect</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {a.solutionAnalysis.incorrect.map((c, i) => <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', paddingLeft: 8 }}>✗ {c}</li>)}
              </ul>
            </div>
            <div className="glass-card" style={{ padding: 24 }}>
              <h3 style={{ color: 'var(--yellow)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}><AlertTriangle size={18} /> Logical Mistakes</h3>
              {a.solutionAnalysis.logicalMistakes.map((m, i) => <p key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{m}</p>)}
            </div>
          </div>
        )}

        {activeTab === 'complexity' && (
          <div className="glass-card" style={{ padding: 28 }}>
            <h3 style={{ marginBottom: 20 }}>Complexity Matrix</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <ComplexityCard label="Your Time" value={a.complexity.userTime} isOptimal={false} />
              <ComplexityCard label="Optimal Time" value={a.complexity.optimalTime} isOptimal={true} />
              <ComplexityCard label="Your Space" value={a.complexity.userSpace} isOptimal={false} />
              <ComplexityCard label="Optimal Space" value={a.complexity.optimalSpace} isOptimal={true} />
            </div>
            <div style={{ padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>{a.complexity.explanation}</p>
            </div>
          </div>
        )}

        {activeTab === 'optimization' && (
          <div className="glass-card" style={{ padding: 28 }}>
            <h3 style={{ marginBottom: 4 }}>{a.optimization.betterAlgorithm}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>{a.optimization.keyIdea}</p>
            <div className="section-label"><Code2 size={14} /> Pseudocode</div>
            <pre style={{
              padding: 20, background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)', overflow: 'auto', fontSize: '0.85rem',
              lineHeight: 1.7, color: '#e2e8f0',
            }}>
              <code>{a.optimization.pseudocode}</code>
            </pre>
          </div>
        )}

        {activeTab === 'weakness' && (
          <div className="glass-card" style={{ padding: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <AlertTriangle size={24} color="var(--red)" />
              <h3>{a.weakConcept.concept}</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>{a.weakConcept.explanation}</p>
            <Link to={`/learn/${a.weakConcept.slug}`} className="btn-primary">
              <BookOpen size={16} /> Learn This Concept <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {activeTab === 'lesson' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="glass-card" style={{ padding: 24 }}>
              <div className="section-label">💡 Intuition</div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{a.microLesson.intuition}</p>
            </div>
            <div className="glass-card" style={{ padding: 24, borderLeft: '3px solid var(--accent-primary)' }}>
              <div className="section-label">🎯 Key Idea</div>
              <p style={{ color: 'var(--text-primary)', lineHeight: 1.7 }}>{a.microLesson.keyIdea}</p>
            </div>
            <div className="glass-card" style={{ padding: 24 }}>
              <div className="section-label">⚠️ Common Mistakes</div>
              {a.microLesson.commonMistakes.map((m, i) => (
                <div key={i} style={{ padding: '10px 14px', background: 'rgba(239,68,68,0.05)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(239,68,68,0.1)', marginBottom: 8, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {m}
                </div>
              ))}
            </div>
            <div className="glass-card" style={{ padding: 24 }}>
              <div className="section-label">📝 Targeted Practice Problems</div>
              {a.practiceProblems.map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < a.practiceProblems.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <div>
                    <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{p.title}</span>
                    <span className="badge badge-topic" style={{ marginLeft: 8 }}>{p.concept}</span>
                  </div>
                  <span className={`badge badge-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'next' && (
          <div className="glass-card" style={{ padding: 28, textAlign: 'center', borderColor: 'rgba(99,102,241,0.2)' }}>
            <Brain size={48} color="var(--accent-primary)" style={{ marginBottom: 16 }} />
            <h3 style={{ marginBottom: 8 }}>Adaptive Recommendation</h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto 24px', lineHeight: 1.7 }}>{a.nextStep.message}</p>
            <Link to={a.nextStep.actionRoute} className="btn-primary" style={{ padding: '14px 32px' }}>
              <BookOpen size={18} /> {a.nextStep.action} <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const ComplexityCard = ({ label, value, isOptimal }) => (
  <div style={{
    padding: 20, borderRadius: 'var(--radius-md)',
    background: isOptimal ? 'rgba(34,197,94,0.05)' : 'rgba(239,68,68,0.05)',
    border: `1px solid ${isOptimal ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'}`,
    textAlign: 'center',
  }}>
    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8 }}>{label}</div>
    <div style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: isOptimal ? 'var(--green)' : 'var(--red)' }}>{value}</div>
  </div>
);

export default AnalysisReport;
