import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Target, ArrowRight, CheckCircle, Zap } from 'lucide-react';
import { TOPICS } from '../data/topics';
import { USER_MASTERY, SAMPLE_PROBLEMS } from '../data/sampleProblems';

const TargetedPractice = () => {
  const { conceptSlug } = useParams();
  const topic = TOPICS.find(t => t.id === conceptSlug) || TOPICS[0];
  const mastery = USER_MASTERY[conceptSlug] || 25;
  const problems = SAMPLE_PROBLEMS.filter(p => p.topics.includes(conceptSlug));
  if (problems.length < 3) problems.push(...SAMPLE_PROBLEMS.slice(0, 3 - problems.length));

  return (
    <div className="page-container" style={{ maxWidth: 800 }}>
      <div className="page-header animate-fade-in-up">
        <Link to={`/learn/${conceptSlug}`} className="btn-ghost" style={{ marginBottom: 12 }}>← Back to Lesson</Link>
        <div className="section-label"><Target size={14} /> Targeted Drill</div>
        <h1><span className="glow-text">{topic.name} Practice</span></h1>
        <p>Solve these problems to strengthen your {topic.name} skills.</p>
      </div>

      {/* Mastery Meter */}
      <div className="glass-card" style={{ padding: 20, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Concept Mastery</span>
            <span style={{ fontSize: '0.85rem', color: mastery >= 80 ? 'var(--green)' : 'var(--text-muted)' }}>{mastery}%</span>
          </div>
          <div style={{ width: '100%', height: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 5 }}>
            <div style={{
              width: `${mastery}%`, height: '100%', borderRadius: 5, transition: 'width 1s ease',
              background: mastery < 40 ? 'var(--red)' : mastery < 70 ? 'var(--yellow)' : 'var(--green)',
            }} />
          </div>
        </div>
        {mastery >= 80 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--green)', fontWeight: 600 }}>
            <CheckCircle size={20} /> Mastered!
          </div>
        )}
      </div>

      {/* Problem Cards */}
      <div className="stagger-children" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {problems.map((p, i) => (
          <Link to={`/problems/${p.id}`} key={i} className="glass-card glass-card-interactive" style={{
            padding: 20, textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: p.status === 'solved' ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${p.status === 'solved' ? 'rgba(34,197,94,0.2)' : 'var(--border-subtle)'}`,
                color: p.status === 'solved' ? 'var(--green)' : 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700,
              }}>
                {p.status === 'solved' ? <CheckCircle size={18} /> : i + 1}
              </div>
              <div>
                <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{p.title}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{p.expectedConcepts?.join(', ')}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className={`badge badge-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
              <ArrowRight size={16} color="var(--text-muted)" />
            </div>
          </Link>
        ))}
      </div>

      {mastery >= 80 && (
        <div className="glass-card animate-fade-in-up" style={{
          marginTop: 24, padding: 24, textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(99,102,241,0.08))',
          border: '1px solid rgba(34,197,94,0.2)',
        }}>
          <Zap size={32} color="var(--green)" style={{ marginBottom: 12 }} />
          <h3 style={{ marginBottom: 8 }}>Ready for Combined Challenges!</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>You've mastered {topic.name}. Time to combine it with other concepts.</p>
          <Link to="/generate" className="btn-primary"><Zap size={16} /> Generate Combined Problem</Link>
        </div>
      )}
    </div>
  );
};

export default TargetedPractice;
