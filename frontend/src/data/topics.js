export const TOPICS = [
  { id: 'arrays', name: 'Arrays', icon: '📊', color: '#6366f1', description: 'Linear data storage, traversal, manipulation', problems: 45 },
  { id: 'hashmap', name: 'HashMap', icon: '🗺️', color: '#a855f7', description: 'Key-value pairs, frequency counting, lookups', problems: 38 },
  { id: 'sliding-window', name: 'Sliding Window', icon: '🪟', color: '#ec4899', description: 'Contiguous subarray/substring problems', problems: 22 },
  { id: 'two-pointers', name: 'Two Pointers', icon: '👉', color: '#14b8a6', description: 'Sorted arrays, pair finding, partitioning', problems: 28 },
  { id: 'stack', name: 'Stack', icon: '📚', color: '#f59e0b', description: 'LIFO operations, monotonic patterns, parsing', problems: 30 },
  { id: 'queue', name: 'Queue', icon: '🚶', color: '#06b6d4', description: 'FIFO operations, BFS, scheduling', problems: 18 },
  { id: 'linked-list', name: 'Linked List', icon: '🔗', color: '#10b981', description: 'Pointer manipulation, cycle detection', problems: 25 },
  { id: 'trees', name: 'Trees', icon: '🌳', color: '#22c55e', description: 'Binary trees, BST, traversals, DFS', problems: 40 },
  { id: 'graphs', name: 'Graphs', icon: '🕸️', color: '#8b5cf6', description: 'BFS, DFS, shortest path, topological sort', problems: 35 },
  { id: 'dynamic-programming', name: 'Dynamic Programming', icon: '🧩', color: '#ef4444', description: 'Optimal substructure, memoization, tabulation', problems: 50 },
  { id: 'greedy', name: 'Greedy', icon: '🎯', color: '#f97316', description: 'Locally optimal choices, intervals, scheduling', problems: 20 },
  { id: 'backtracking', name: 'Backtracking', icon: '🔄', color: '#64748b', description: 'Exhaustive search, pruning, permutations', problems: 18 },
  { id: 'binary-search', name: 'Binary Search', icon: '🔍', color: '#0ea5e9', description: 'Sorted search, rotated arrays, answer space', problems: 22 },
  { id: 'heap', name: 'Heap / Priority Queue', icon: '⛰️', color: '#d946ef', description: 'Top-K, median finding, merge sorted', problems: 15 },
  { id: 'tries', name: 'Trie', icon: '🔤', color: '#84cc16', description: 'Prefix trees, autocomplete, word search', problems: 10 },
  { id: 'bit-manipulation', name: 'Bit Manipulation', icon: '💡', color: '#fbbf24', description: 'XOR tricks, bitmasks, power of two', problems: 12 },
];

export const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard'];

export const DIFFICULTY_COLORS = {
  Easy: { bg: 'rgba(34, 197, 94, 0.1)', text: '#22c55e', border: 'rgba(34, 197, 94, 0.2)' },
  Medium: { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b', border: 'rgba(245, 158, 11, 0.2)' },
  Hard: { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.2)' },
};

export const LANGUAGES = ['javascript', 'python', 'java', 'cpp'];
