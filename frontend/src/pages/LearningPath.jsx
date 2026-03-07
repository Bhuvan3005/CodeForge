import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Lock, Unlock, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';
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
    <div className="page-container" style={{ maxWidth: 700 }}>
      <div className="page-header animate-fade-in-up">
        <div className="section-label"><Route size={14} /> Roadmap</div>
        <h1><span className="glow-text">Learning Path</span></h1>
        <p>Your personalized DSA curriculum. Follow the path from fundamentals to mastery.</p>
      </div>

      <div style={{ position: 'relative', paddingLeft: 40 }} className="stagger-children">
        {/* Timeline line */}
        <div style={{
          position: 'absolute', left: 18, top: 0, bottom: 0, width: 2,
          background: 'linear-gradient(to bottom, var(--accent-primary), var(--border-subtle))',
        }} />

        {milestones.map((m, i) => {
          const topic = TOPICS.find(t => t.id === m.topic) || TOPICS[0];
          const mastery = USER_MASTERY[m.topic] || 0;
          const isComplete = m.status === 'complete';
          const isCurrent = m.status === 'current';
          const isLocked = m.status === 'locked';

          return (
            <div key={i} style={{ marginBottom: 16, position: 'relative' }}>
              {/* Node */}
              <div style={{
                position: 'absolute', left: -30, top: 18, width: 24, height: 24, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isComplete ? 'var(--green)' : isCurrent ? 'var(--accent-primary)' : 'var(--bg-surface)',
                border: isLocked ? '2px solid var(--border-light)' : 'none',
                boxShadow: isCurrent ? '0 0 20px rgba(99,102,241,0.4)' : 'none',
              }}>
                {isComplete ? <CheckCircle size={14} color="white" /> : isLocked ? <Lock size={12} color="var(--text-muted)" /> : <Unlock size={12} color="white" />}
              </div>

              <div className={`glass-card ${!isLocked ? 'glass-card-interactive' : ''}`} style={{
                padding: 20, opacity: isLocked ? 0.5 : 1,
                border: isCurrent ? '1px solid rgba(99,102,241,0.3)' : undefined,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: '1.4rem' }}>{topic.icon}</span>
                    <div>
                      <h3 style={{ fontSize: '1rem', marginBottom: 2 }}>{topic.name}</h3>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{m.phase}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {!isLocked && (
                      <>
                        <div style={{ width: 60, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }}>
                          <div style={{ width: `${mastery}%`, height: '100%', background: isComplete ? 'var(--green)' : 'var(--accent-primary)', borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{mastery}%</span>
                      </>
                    )}
                    {isCurrent && (
                      <Link to={`/topics/${m.topic}`} className="btn-primary" style={{ padding: '6px 16px', fontSize: '0.8rem' }}>
                        Continue <ArrowRight size={12} />
                      </Link>
                    )}
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
