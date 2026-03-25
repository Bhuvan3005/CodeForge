import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Play, Send, Clock, Info, ChevronLeft,
  Code2, FileText, Target, Zap, AlertCircle,
  CheckCircle2, Terminal, Lightbulb, Settings, Pause, RotateCcw
} from 'lucide-react';
import { LANGUAGES } from '../data/topics';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';

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
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [activeTestCase, setActiveTestCase] = useState(0);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/problems/${problemId}`);
        const data = await res.json();
        setProblem(data);
        const defaultComment = language.toLowerCase() === 'python' ? '# Write your solution here\n\n' : '// Write your solution here\n\n';
        setCode(data.boilerplate?.[language] || defaultComment);
      } catch (error) {
        console.error('Error fetching problem details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();

    const interval = setInterval(() => {
      if (isTimerRunning) setTimer(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [problemId, isTimerRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a0c10', color: 'var(--text-secondary)' }}>
      <Zap size={24} className="animate-pulse" />
      <span style={{ marginLeft: 12, fontWeight: 600 }}>Booting IDE...</span>
    </div>
  );

  if (!problem) return <div className="page-container">Problem not found.</div>;

  const handleRun = async () => {
    setConsoleOutput('Initializing execution engine...\n');
    try {
      const token = localStorage.getItem('cf_token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/submissions/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ problemId, code, language })
      });
      const data = await res.json();

      if (data.results) {
        setTestResults(data.results);
        setActiveTestCase(0);
        let output = `STATUS: ${data.status}\nRUNTIME: ${data.runtime}\n\n`;
        if (data.error) {
          output += `ERROR:\n${data.error}`;
        }
        setConsoleOutput(output);
      } else {
        setConsoleOutput(`ERROR: ${data.message || 'Execution failed'}\n${data.error || ''}`);
      }
    } catch (error) {
      setConsoleOutput('CRITICAL ERROR: ' + error.message);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setConsoleOutput('Dispatching solution to secure judge...');
    try {
      const storedUser = JSON.parse(localStorage.getItem('cf_user'));
      const token = localStorage.getItem('cf_token');
      if (!storedUser || !token) {
        setConsoleOutput('ERR: Unauthorized. Please authenticate to submit code.');
        setIsSubmitting(false);
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ problemId, code, language })
      });
      const data = await res.json();

      if (data.submission) {
        if (data.results) {
          setTestResults(data.results);
          setActiveTestCase(0);
        }
        let output = `SUCCESS: ${data.submission.status}\nRUNTIME: ${data.submission.runtime}\n\n`;
        if (data.results) {
           output += data.results.map((rs, i) => 
            `[TEST ${i + 1}] ${rs.passed ? 'PASSED' : 'FAILED'}`
          ).join('\n');
        }
        setConsoleOutput(output + '\n---------------------------------\nSyncing progress...');
        if (data.submission.status === 'Accepted') {
          setTimeout(() => navigate('/dashboard'), 2500);
        }
      } else {
        setConsoleOutput(`FAILURE: ${data.message || 'Submission rejected.'}\n${data.error || ''}`);
      }
    } catch (error) {
      setConsoleOutput('CRITICAL ERROR: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getExtensions = () => {
    switch (language.toLowerCase()) {
      case 'python': return [python()];
      case 'javascript': return [javascript()];
      case 'java':
      case 'cpp': return [javascript()]; // Fallback for similar syntax
      default: return [];
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0c10', overflow: 'hidden' }}>

      {/* Header / Nav */}
      <div style={{
        height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', background: '#111318', borderBottom: '1px solid #1f2937'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to="/problems" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>
            <ChevronLeft size={16} /> Library
          </Link>
          <div style={{ width: 1, height: 20, background: '#1f2937' }} />
          <h2 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{problem.title}</h2>
          <span className={`badge badge-${problem.difficulty.toLowerCase()}`} style={{ fontSize: '0.65rem' }}>{problem.difficulty}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--warning)', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
              <Clock size={16} /> {formatTime(timer)}
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <button 
                onClick={() => setIsTimerRunning(!isTimerRunning)} 
                className="btn-icon" 
                title={isTimerRunning ? 'Pause Timer' : 'Start Timer'}
                style={{ background: '#1f2937', border: 'none', color: isTimerRunning ? 'var(--warning)' : 'var(--success)', padding: 4, borderRadius: 4, display: 'flex', cursor: 'pointer' }}
              >
                {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button 
                onClick={() => { setTimer(0); setIsTimerRunning(false); }} 
                className="btn-icon" 
                title="Reset Timer"
                style={{ background: '#1f2937', border: 'none', color: 'var(--text-dim)', padding: 4, borderRadius: 4, display: 'flex', cursor: 'pointer' }}
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
          <select
            value={language}
            onChange={e => {
              const newLang = e.target.value;
              setLanguage(newLang);
              const defaultComment = newLang.toLowerCase() === 'python' ? '# Write your solution here\n\n' : '// Write your solution here\n\n';
              setCode(problem.boilerplate?.[newLang] || defaultComment);
            }}
            className="select-field"
            style={{ width: 140, height: 32, fontSize: '0.75rem', padding: '0 8px' }}
          >
            {LANGUAGES.map(l => <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
          </select>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleRun} className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.8rem', height: 32 }}>
              <Play size={14} /> Run
            </button>
            <button onClick={handleSubmit} disabled={isSubmitting} className="btn-primary" style={{ padding: '6px 16px', fontSize: '0.8rem', height: 32 }}>
              <Send size={14} /> {isSubmitting ? 'Syncing...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio View */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>

        {/* Left Pane: Documentation */}
        <div style={{ borderRight: '1px solid #1f2937', overflowY: 'auto', background: '#0a0c10', padding: 32 }} className="custom-scrollbar">

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ padding: 6, background: 'var(--primary-soft)', borderRadius: 6 }}>
              <FileText size={16} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Specification</h3>
          </div>

          <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 32, fontWeight: 500 }}>
            {problem.description}
          </div>

          {/* Examples Section */}
          <div style={{ marginBottom: 32 }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Examples</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {(problem.examples || []).map((ex, i) => (
                <div key={i} style={{ padding: 20, background: '#111318', border: '1px solid #1f2937', borderRadius: 12 }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', fontWeight: 700 }}>#{i + 1}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: 6 }}>
                        <span style={{ color: 'var(--primary)' }}>input:</span> {ex.input}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                        <span style={{ color: 'var(--success)' }}>output:</span> {ex.output}
                      </div>
                    </div>
                  </div>
                  {ex.explanation && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: 12, borderTop: '1px solid #1f2937', paddingTop: 12, lineHeight: 1.5 }}>
                      <strong>Explanation:</strong> {ex.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Constraints Section */}
          <div style={{ marginBottom: 32 }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Constraints</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {(problem.constraints || []).map((c, i) => (
                <span key={i} style={{ background: '#0a0c10', border: '1px solid #1f2937', color: 'var(--text-main)', padding: '6px 12px', borderRadius: 6, fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Intelligence / Hints */}
          <div className="card-professional" style={{ background: '#111318', border: '1px solid #1f2937', padding: 24 }}>
            <button
              onClick={() => setShowHints(!showHints)}
              style={{
                background: 'transparent', border: 'none', width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer', color: 'white'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Lightbulb size={18} color="var(--warning)" />
                <span style={{ fontWeight: 700 }}>Strategy Lab</span>
              </div>
              <ChevronLeft size={18} style={{ transform: showHints ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            </button>
            {showHints && (
              <div className="animate-fade-in" style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #1f2937' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.85rem' }}>
                  <div style={{ color: 'var(--text-secondary)' }}><strong>Key Insight:</strong> {(problem.expectedConcepts || []).join(' + ')}</div>
                  <div style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}><strong>Recommendation:</strong> {problem.optimalApproach}</div>
                  <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
                    <span className="badge" style={{ background: 'var(--primary-soft)', color: 'white' }}>O({problem.timeComplexity}) Time</span>
                    <span className="badge" style={{ background: '#1f2937', color: 'white' }}>O({problem.spaceComplexity}) Space</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: IDE */}
        <div style={{ display: 'flex', flexDirection: 'column', background: '#0a0c10' }}>

          {/* Code Zone */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', top: 0, right: 0, padding: '8px 16px', fontSize: '0.7rem',
              color: 'var(--text-dim)', fontWeight: 800, background: '#111318', zIndex: 1,
              borderBottomLeftRadius: 8, borderLeft: '1px solid #1f2937', borderBottom: '1px solid #1f2937'
            }}>
              EDITOR PRO
            </div>
            <CodeMirror
              value={code}
              height="100%"
              theme={oneDark}
              extensions={getExtensions()}
              onChange={(value) => setCode(value)}
              style={{
                fontSize: '0.95rem',
                fontFamily: 'var(--font-mono)',
              }}
              className="custom-scrollbar codemirror-full-height"
            />
          </div>

          {/* Result Zone */}
          <div style={{ height: 320, borderTop: '1px solid #1f2937', display: 'flex', flexDirection: 'column', background: '#0a0c10' }}>
            <div style={{ height: 48, background: '#111318', borderBottom: '1px solid #1f2937', display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  <Terminal size={14} /> Intelligence Feed
                </div>
                {testResults.length > 0 && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    {testResults.map((res, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTestCase(i)}
                        style={{
                          background: activeTestCase === i ? '#1f2937' : 'transparent',
                          border: 'none',
                          color: res.passed ? 'var(--success)' : 'var(--error)',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '4px 12px',
                          borderRadius: '20px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          transition: 'all 0.2s',
                          border: activeTestCase === i ? `1px solid ${res.passed ? 'var(--success)' : 'var(--error)'}` : '1px solid transparent'
                        }}
                      >
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: res.passed ? 'var(--success)' : 'var(--error)' }} />
                        Case {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button 
                onClick={() => { setConsoleOutput(''); setTestResults([]); }} 
                style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', fontSize: '0.7rem', cursor: 'pointer', fontWeight: 600 }}
              >
                CLEAR
              </button>
            </div>
            
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }} className="custom-scrollbar">
              {/* Detailed Test View */}
              {testResults.length > 0 ? (
                <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <h5 style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Input</h5>
                      <div style={{ background: '#111318', border: '1px solid #1f2937', padding: '12px 16px', borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'white' }}>
                        {testResults[activeTestCase].input || 'n/a'}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <h5 style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Expected Output</h5>
                      <div style={{ background: '#111318', border: '1px solid #1f2937', padding: '12px 16px', borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--success)' }}>
                        {testResults[activeTestCase].expectedOutput}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <h5 style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Output</h5>
                    <div style={{ 
                      background: '#111318', 
                      border: `1px solid ${testResults[activeTestCase].passed ? 'var(--success-soft)' : 'var(--error-soft)'}`, 
                      padding: '16px 20px', 
                      borderRadius: 12, 
                      fontFamily: 'var(--font-mono)', 
                      fontSize: '0.9rem', 
                      color: testResults[activeTestCase].passed ? 'var(--success)' : 'var(--error)',
                      minHeight: 60,
                      whiteSpace: 'pre-wrap'
                    }}>
                      {testResults[activeTestCase].actualOutput || (testResults[activeTestCase].passed ? '' : 'Runtime Error')}
                    </div>
                  </div>
                  {consoleOutput && (
                    <div style={{ borderTop: '1px solid #1f2937', paddingTop: 16, marginTop: 4 }}>
                       <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)', whiteSpace: 'pre-wrap' }}>
                        {consoleOutput}
                       </pre>
                    </div>
                  )}
                </div>
              ) : (
                <pre style={{
                  flex: 1, padding: '24px 32px', margin: 0, overflowY: 'auto',
                  fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.8,
                  color: 'var(--text-dim)'
                }}>
                  {consoleOutput || '// Engine initialized. Ready for execution.\n// Run code to see detailed test cases here.'}
                </pre>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProblemSolver;
