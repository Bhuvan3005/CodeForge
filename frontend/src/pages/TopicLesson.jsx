import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Lightbulb, AlertTriangle, Code2, ArrowRight, CheckCircle } from 'lucide-react';
import { TOPICS } from '../data/topics';
import { USER_MASTERY } from '../data/sampleProblems';

const LESSONS = {
  'sliding-window': {
    intuition: 'Imagine you have a fixed-size magnifying glass sliding across a row of numbers. Instead of recounting everything inside the glass each time you move it, you just add the new number entering and subtract the one leaving.',
    keyIdea: 'Maintain a "window" defined by two pointers. Expand or contract the window based on the problem\'s conditions. Track computed values incrementally to avoid redundant work.',
    patterns: [
      { name: 'Fixed Window', desc: 'Window size is constant (e.g., max sum of subarray of size K). Slide by adding right, removing left.' },
      { name: 'Variable Window', desc: 'Window expands until a condition breaks, then contracts from the left until condition is restored.' },
      { name: 'Window with HashMap', desc: 'Track character/element frequencies inside the window. Useful for substring problems.' },
    ],
    commonMistakes: [
      'Forgetting to update the running aggregate when shrinking the window.',
      'Off-by-one errors with window boundaries (use right - left + 1 for window size).',
      'Starting with a nested loop instead of recognizing the sliding window pattern.',
    ],
    codeExample: `// Fixed window: Max sum of subarray of size K
function maxSubarraySum(nums, k) {
  let windowSum = 0;
  let maxSum = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    windowSum += nums[i];         // expand
    if (i >= k) {
      windowSum -= nums[i - k];   // shrink
    }
    if (i >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);
    }
  }
  return maxSum;
}`,
  },
  'hashmap': {
    intuition: 'A HashMap is like a phonebook — given a name (key), you instantly find the number (value). Use it whenever you need to remember something for quick lookup later.',
    keyIdea: 'Store elements and their metadata (counts, indices, last-seen positions) for O(1) lookups. This transforms O(N) search operations into O(1).',
    patterns: [
      { name: 'Frequency Counting', desc: 'Count occurrences of each element. Used in anagram detection, top-K elements.' },
      { name: 'Index Tracking', desc: 'Store the last index of each element. Enables O(1) pointer jumps in sliding window.' },
      { name: 'Complement Lookup', desc: 'Store values you\'ve seen. Check if the complement (target - current) exists in the map.' },
    ],
    commonMistakes: [
      'Storing presence (true/false) instead of the actual count or index.',
      'Not handling the case where a key doesn\'t exist yet (check before access).',
      'Using arrays for sparse key spaces when a Map/Object is more appropriate.',
    ],
    codeExample: `// Two Sum: Find indices of two numbers that add to target
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i); // store value → index
  }
  return [];
}`,
  },
};

const TopicLesson = () => {
  const { topicSlug } = useParams();
  const topic = TOPICS.find(t => t.id === topicSlug) || TOPICS[0];
  const lesson = LESSONS[topicSlug] || LESSONS['hashmap'];
  const mastery = USER_MASTERY[topicSlug] || 0;

  return (
    <div className="page-container" style={{ maxWidth: 900 }}>
      <div className="page-header animate-fade-in-up">
        <Link to="/topics" className="btn-ghost" style={{ marginBottom: 12 }}>← Back to Topics</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: '2.5rem' }}>{topic.icon}</span>
          <div>
            <h1><span className="glow-text">{topic.name}</span></h1>
            <p>{topic.description}</p>
          </div>
        </div>
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 200, height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 4 }}>
            <div style={{ width: `${mastery}%`, height: '100%', background: topic.color, borderRadius: 4, transition: 'width 0.5s' }} />
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{mastery}% Mastered</span>
        </div>
      </div>

      <div className="stagger-children" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Intuition */}
        <div className="glass-card" style={{ padding: 28 }}>
          <div className="section-label"><Lightbulb size={14} /> Intuition</div>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>{lesson.intuition}</p>
        </div>

        {/* Key Idea */}
        <div className="glass-card" style={{ padding: 28, borderLeft: `3px solid ${topic.color}` }}>
          <div className="section-label"><CheckCircle size={14} /> Key Idea</div>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-primary)' }}>{lesson.keyIdea}</p>
        </div>

        {/* Patterns */}
        <div className="glass-card" style={{ padding: 28 }}>
          <div className="section-label"><Code2 size={14} /> Core Patterns</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {lesson.patterns.map((p, i) => (
              <div key={i} style={{ padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{p.name}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Example */}
        <div className="glass-card" style={{ padding: 28 }}>
          <div className="section-label"><Code2 size={14} /> Interactive Example</div>
          <pre style={{
            padding: 20, background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)', overflow: 'auto', fontSize: '0.85rem',
            lineHeight: 1.7, color: '#e2e8f0',
          }}>
            <code>{lesson.codeExample}</code>
          </pre>
        </div>

        {/* Common Mistakes */}
        <div className="glass-card" style={{ padding: 28 }}>
          <div className="section-label"><AlertTriangle size={14} /> Common Mistakes</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {lesson.commonMistakes.map((m, i) => (
              <div key={i} style={{
                padding: '12px 16px', background: 'rgba(239,68,68,0.05)', borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(239,68,68,0.1)', color: 'var(--text-secondary)', fontSize: '0.9rem',
                display: 'flex', gap: 12, alignItems: 'flex-start',
              }}>
                <AlertTriangle size={16} color="var(--red)" style={{ flexShrink: 0, marginTop: 2 }} />
                {m}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to={`/practice/${topicSlug}`} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
            <BookOpen size={18} /> Practice This Concept <ArrowRight size={16} />
          </Link>
          <Link to="/topics" className="btn-secondary">Back to Explorer</Link>
        </div>
      </div>
    </div>
  );
};

export default TopicLesson;
