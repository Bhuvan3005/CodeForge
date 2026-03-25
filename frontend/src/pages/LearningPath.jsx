import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Lock, Unlock, CheckCircle2, ArrowRight, BookOpen, Fingerprint, Zap, Target } from 'lucide-react';
import { TOPICS } from '../data/topics';
import { USER_MASTERY } from '../data/sampleProblems';

const milestones = [
  { topic: 'arrays', phase: 'Learn → Practice → Master', status: 'complete' },
  { topic: 'two-pointers', phase: 'Learn → Practice → Master', status: 'complete' },
  { topic: 'binary-search', phase: 'Learn → Practice → Master', status: 'complete' },
  { topic: 'sliding-window', phase: 'Learn → Practice', status: 'current' },
  { topic: 'hashmap', phase: 'Learn', status: 'current' },
  { topic: 'stack', phase: 'Upcoming', status: 'locked' },
  { topic: 'queue', phase: 'Upcoming', status: 'locked' },
  { topic: 'linked-list', phase: 'Upcoming', status: 'locked' },
  { topic: 'trees', phase: 'Upcoming', status: 'locked' },
  { topic: 'graphs', phase: 'Upcoming', status: 'locked' },
  { topic: 'dynamic-programming', phase: 'Upcoming', status: 'locked' },
];

const LearningPath = () => {
  return (
    <div className="page-container" style={{ background: '#0a0c10', minHeight: '100vh', padding: '40px' }}>

      <div className="page-header animate-fade-in-up" style={{ maxWidth: 800, margin: '0 auto 48px auto', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ padding: '4px 12px', borderRadius: 20, background: 'var(--primary-soft)', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
            Strategic Roadmap
          </div>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white' }}>Learning <span style={{ color: 'var(--primary)' }}>Pathway</span></h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>A structured curriculum engineered to transform you from foundations to elite mastery.</p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', paddingLeft: 60 }} className="stagger-children">
        {/* Timeline Core */}
        <div style={{
          position: 'absolute', left: 24, top: 0, bottom: 0, width: 2,
          background: 'linear-gradient(to bottom, var(--primary), #1f2937)',
        }} />

        {milestones.map((m, i) => {
          const topic = TOPICS.find(t => t.id === m.topic) || TOPICS[0];
          const mastery = USER_MASTERY[m.topic] || 0;
          const isComplete = m.status === 'complete';
          const isCurrent = m.status === 'current';
          const isLocked = m.status === 'locked';

          return (
            <div key={i} style={{ marginBottom: 24, position: 'relative' }}>
              {/* Milestone Node */}
              <div style={{
                position: 'absolute', left: -48, top: 20, width: 24, height: 24, borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isComplete ? 'var(--success)' : isCurrent ? 'var(--primary)' : '#111318',
                border: isLocked ? '1px solid #1f2937' : 'none',
                boxShadow: isCurrent ? '0 0 15px var(--primary-soft)' : 'none',
                zIndex: 2, transition: 'all 0.3s'
              }}>
                {isComplete ? <CheckCircle2 size={14} color="white" /> : isLocked ? <Lock size={12} color="var(--text-dim)" /> : <Zap size={12} color="white" />}
              </div>

              <div className="card-professional" style={{
                padding: 24, background: '#111318', opacity: isLocked ? 0.6 : 1,
                borderLeft: isCurrent ? '4px solid var(--primary)' : '1px solid #1f2937',
                transition: 'transform 0.2s', cursor: isLocked ? 'not-allowed' : 'pointer'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: '#0a0c10', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '1px solid #1f2937' }}>
                      {topic.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', margin: 0 }}>{topic.name}</h3>
                      <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginTop: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.phase}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    {!isLocked && (
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 800, marginBottom: 8, textTransform: 'uppercase' }}>Mastery</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ width: 100, height: 6, background: '#0a0c10', borderRadius: 10, border: '1px solid #1f2937', overflow: 'hidden' }}>
                            <div style={{ width: `${mastery}%`, height: '100%', background: isComplete ? 'var(--success)' : 'var(--primary)', borderRadius: 10 }} />
                          </div>
                          <span style={{ fontSize: '0.85rem', color: isComplete ? 'var(--success)' : 'white', fontWeight: 700, minWidth: 40, textAlign: 'right' }}>{mastery}%</span>
                        </div>
                      </div>
                    )}

                    {isCurrent && (
                      <Link to={`/topics/${m.topic}`} className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                        Resume Path <ArrowRight size={14} />
                      </Link>
                    )}

                    {isLocked && <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem', fontWeight: 700, fontStyle: 'italic' }}>Module Locked</div>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningPath;
