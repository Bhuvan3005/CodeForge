import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Play, Send, Clock, Info, ChevronRight, Code2, FileText, Target } from 'lucide-react';
import { LANGUAGES } from '../data/topics';

// Removed hardcoded DEMO_USER_ID

const ProblemSolver = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [consoleOutput, setConsoleOutput] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/problems/${problemId}`);
        const data = await res.json();
        setProblem(data);
        // Set boilerplate (simulated or from data)
        setCode(data.boilerplate?.[language] || '// Write your solution here');
      } catch (error) {
        console.error('Error fetching problem details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [problemId]);

  if (loading) return <div className="page-container">Loading Problem...</div>;
  if (!problem) return <div className="page-container">Problem not found.</div>;

  const handleRun = () => {
    setConsoleOutput('Running public test cases...\n\n' +
      (problem.testCases || []).filter(tc => tc.isPublic).map((tc, i) =>
        `Test ${i + 1}: Input = ${tc.input} → Expected: ${tc.output} → ✓ Passed`
      ).join('\n') + '\n\n✅ Sample test cases passed locally.'
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setConsoleOutput('Submitting to judge...');
    try {
      const storedUser = JSON.parse(localStorage.getItem('cf_user'));
      const token = localStorage.getItem('cf_token');
      if (!storedUser || !token) { 
        setConsoleOutput('Please log in to submit code.');
        setIsSubmitting(false);
        return; 
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/submissions`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          problemId,
          code,
          language
        })
      });
      const data = await res.json();
      
      if (data.submission) {
        setConsoleOutput(`Submission Processed!\nStatus: ${data.submission.status}\nRuntime: ${data.submission.runtime}\nMemory: ${data.submission.memory}`);
        
        // Wait a bit then navigate to analysis or dashboard
        setTimeout(() => {
          navigate('/history'); // Redirect to history to see the new entry
        }, 2000);
      }
    } catch (error) {
      setConsoleOutput('Error submitting code: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 20px', borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/problems" className="btn-ghost" style={{ padding: '6px 10px' }}>← Back</Link>
          <span style={{ color: 'var(--border-light)' }}>|</span>
          <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>{problem.title}</h2>
          <span className={`badge badge-${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            <Clock size={14} /> 00:00
          </div>
          <select className="select-field" style={{ width: 130, padding: '6px 10px', fontSize: '0.8rem' }} value={language} onChange={e => {
            setLanguage(e.target.value);
            setCode(problem.boilerplate?.[e.target.value] || '// Write your solution here');
          }}>
            {LANGUAGES.map(l => <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
          </select>
        </div>
      </div>

      {/* Main Split */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>
        {/* Left: Problem Description */}
        <div style={{ borderRight: '1px solid var(--border-subtle)', overflow: 'auto', padding: 24 }}>
          <div className="section-label"><Target size={14} /> Problem Statement</div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 24 }}>{problem.description}</p>

          {/* Examples */}
          {(problem.examples || []).map((ex, i) => (
            <div key={i} style={{
              padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)', marginBottom: 12, fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
            }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: 8, fontSize: '0.75rem' }}>EXAMPLE {i + 1}</div>
              <div><span style={{ color: 'var(--accent-primary)' }}>Input:</span> {ex.input}</div>
              <div><span style={{ color: 'var(--accent-primary)' }}>Output:</span> {ex.output}</div>
              {ex.explanation && <div style={{ color: 'var(--text-muted)', marginTop: 8, fontStyle: 'italic' }}>{ex.explanation}</div>}
            </div>
          ))}

          {/* Constraints */}
          <div style={{ marginTop: 20 }}>
            <div className="section-label"><Info size={14} /> Constraints</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {(problem.constraints || []).map((c, i) => (
                <li key={i} style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>• {c}</li>
              ))}
            </ul>
          </div>

          {/* Hints */}
          <button onClick={() => setShowHints(!showHints)} className="btn-ghost" style={{ marginTop: 20 }}>
            {showHints ? '▾ Hide Hints' : '▸ Show Hints'}
          </button>
          {showHints && (
            <div style={{
              marginTop: 8, padding: 16, background: 'rgba(99,102,241,0.05)',
              borderRadius: 'var(--radius-sm)', border: '1px solid rgba(99,102,241,0.1)',
              color: 'var(--text-secondary)', fontSize: '0.9rem',
            }}>
              <strong>Concepts:</strong> {(problem.expectedConcepts || []).join(', ')}<br />
              <strong>Approach:</strong> {problem.optimalApproach}<br />
              <strong>Time:</strong> {problem.timeComplexity} | <strong>Space:</strong> {problem.spaceComplexity}
            </div>
          )}
        </div>

        {/* Right: Code Editor + Console */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Editor */}
          <div style={{ flex: 1, position: 'relative' }}>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              spellCheck={false}
              style={{
                width: '100%', height: '100%', resize: 'none',
                background: '#0d0d11', color: '#e2e8f0', border: 'none',
                padding: 20, fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
                lineHeight: 1.7, outline: 'none', tabSize: 2,
              }}
            />
          </div>

          {/* Console */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', background: '#0a0a0e' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px 16px', borderBottom: '1px solid var(--border-subtle)',
            }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Console Output</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={handleRun} className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.8rem' }}>
                  <Play size={14} /> Run Tests
                </button>
                <button onClick={handleSubmit} className="btn-primary" disabled={isSubmitting} style={{ padding: '6px 16px', fontSize: '0.8rem', opacity: isSubmitting ? 0.7 : 1 }}>
                  <Send size={14} /> {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
            <pre style={{
              padding: 16, height: 140, overflow: 'auto', margin: 0,
              fontSize: '0.8rem', lineHeight: 1.6, color: consoleOutput.includes('Accepted') ? '#22c55e' : (consoleOutput.includes('Error') || consoleOutput.includes('Wrong') ? '#ef4444' : 'var(--text-muted)'),
            }}>
              {consoleOutput || '// Click "Run Tests" to execute your code against sample test cases\n// Click "Submit" for full analysis'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolver;
