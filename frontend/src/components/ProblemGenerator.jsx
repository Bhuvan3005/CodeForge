import React, { useState } from 'react';

const ProblemGenerator = () => {
  // State for form inputs
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [difficulty, setDifficulty] = useState('Easy');
  const [count, setCount] = useState(1);

  // State for API handling
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Available topics for selection
  const availableTopics = [
    'Arrays',
    'Strings',
    'Hash Table',
    'Two Pointers',
    'Sliding Window',
    'Binary Search',
    'Trees',
    'Graphs',
    'Dynamic Programming',
    'Linked List'
  ];

  const handleTopicToggle = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const handleGenerate = async () => {
    if (selectedTopics.length === 0) {
      setError('Please select at least one topic.');
      return;
    }

    setLoading(true);
    setError(null);

    // Combine selected topics into a single string (e.g., "Sliding Window + Hash Table")
    const topicString = selectedTopics.join(' + ');

    try {
      const response = await fetch('http://localhost:5000/api/problems/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: topicString,
          difficulty: difficulty,
          count: Number(count),
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      setProblems(data.problems || []);
    } catch (err) {
      setError('Failed to generate problems. Please check if the backend is running and CORS is enabled.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>CodeForge Problem Generator</h1>

      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Configuration</h3>

        {/* Topics Selection */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
            Select Topics:
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {availableTopics.map(topic => (
              <label key={topic} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <input
                  type="checkbox"
                  checked={selectedTopics.includes(topic)}
                  onChange={() => handleTopicToggle(topic)}
                />
                {topic}
              </label>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
            Difficulty:
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Count Selection */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
            Number of Problems:
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc', width: '80px' }}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#9ca3af' : '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Generating...' : 'Generate Problems'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{ padding: '10px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      {/* Results Display */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {problems.map((problem, index) => (
          <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginTop: '0', color: '#1f2937' }}>{problem.name}</h2>

            <div style={{ marginBottom: '15px', color: '#4b5563', whiteSpace: 'pre-wrap' }}>
              <strong>Description:</strong><br />
              {problem.description}
            </div>

            <div>
              <strong>Test Cases:</strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                {problem.testcases && problem.testcases.map((tc, tcIndex) => (
                  <div key={tcIndex} style={{ backgroundColor: '#f3f4f6', padding: '10px', borderRadius: '4px', fontSize: '14px', fontFamily: 'monospace' }}>
                    <div><strong>Input:</strong> {tc.input}</div>
                    <div><strong>Output:</strong> {tc.output}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemGenerator;
