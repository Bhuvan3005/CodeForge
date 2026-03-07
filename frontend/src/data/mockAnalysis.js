export const MOCK_ANALYSIS = {
  submissionId: 's002',
  problemId: 'p003',
  problemTitle: 'Longest Substring Without Repeating Characters',

  // ROLE 2: Code Analysis
  solutionAnalysis: {
    correct: [
      'Correctly identified the need for a sliding window approach.',
      'Proper initialization of left pointer at index 0.',
      'Correct use of Math.max to track the longest substring length.',
    ],
    incorrect: [
      'HashMap is not updated when shrinking the window — characters are never removed.',
      'The left pointer increments by 1 each time, but it should jump to the position after the duplicate.',
      'Missing edge case handling for empty string input.',
    ],
    logicalMistakes: [
      'Window never properly contracts because the duplicate character remains in the map after left pointer moves past it.',
    ],
    dataStructureIssues: [
      'Using an array instead of a Set/Map for character tracking leads to O(N) lookups within the window.',
    ],
  },

  // ROLE 3: Complexity
  complexity: {
    userTime: 'O(N²)',
    userSpace: 'O(N)',
    optimalTime: 'O(N)',
    optimalSpace: 'O(min(N, M))',
    explanation: 'Your inner loop re-scans characters when a duplicate is found, leading to quadratic time. The optimal approach uses a HashMap to jump the left pointer directly to the position after the duplicate.',
  },

  // ROLE 4: Optimization
  optimization: {
    betterAlgorithm: 'Sliding Window with HashMap Index Tracking',
    keyIdea: 'Instead of just storing character presence, store the last index where each character appeared. When a duplicate is found, jump the left pointer to max(left, lastIndex[char] + 1).',
    pseudocode: `left = 0, maxLen = 0
charIndex = {} // maps char → last seen index

for right in range(len(s)):
    if s[right] in charIndex:
        left = max(left, charIndex[s[right]] + 1)
    charIndex[s[right]] = right
    maxLen = max(maxLen, right - left + 1)

return maxLen`,
  },

  // ROLE 5: Weak Concept
  weakConcept: {
    concept: 'HashMap Frequency / Index Tracking',
    slug: 'hashmap',
    explanation: 'Your solution shows a pattern of not fully utilizing HashMap capabilities. Specifically, you\'re not leveraging stored indices to optimize pointer movement, which is a core HashMap pattern in sliding window problems.',
  },

  // ROLE 6: Micro Lesson
  microLesson: {
    intuition: 'Think of a HashMap as your memory — it remembers exactly where you last saw something. In sliding window problems, this memory lets you teleport your left pointer instead of crawling forward one step at a time.',
    keyIdea: 'Store the INDEX (not just presence) of each element in your HashMap. When you encounter a duplicate, the stored index tells you exactly where to jump your window\'s left boundary.',
    commonMistakes: [
      'Storing only boolean presence instead of the actual index.',
      'Not using max(left, storedIndex + 1) — which can cause the left pointer to move backwards.',
      'Forgetting to update the map entry with the new index after finding a duplicate.',
    ],
  },

  // ROLE 7: Practice Problems
  practiceProblems: [
    { title: 'First Unique Character in a String', difficulty: 'Easy', concept: 'HashMap Frequency' },
    { title: 'Group Anagrams by Frequency Signature', difficulty: 'Medium', concept: 'HashMap Counting' },
    { title: 'Subarray Sum Equals K', difficulty: 'Medium', concept: 'HashMap Prefix Sum' },
    { title: 'Longest Substring with At Most K Distinct', difficulty: 'Hard', concept: 'HashMap + Sliding Window' },
  ],

  // ROLE 8: Adaptive Guidance
  nextStep: {
    type: 'teach',
    message: 'Your algorithmic intuition is developing well, but HashMap index tracking is a gap. Master this pattern first — it unlocks efficient solutions for 80% of sliding window problems.',
    action: 'Learn HashMap Index Tracking',
    actionRoute: '/learn/hashmap',
  },
};

export const MOCK_TEST_RESULTS = [
  { id: 1, input: 'abcabcbb', expected: 3, actual: 3, passed: true, runtime: '2ms' },
  { id: 2, input: 'bbbbb', expected: 1, actual: 3, passed: false, runtime: '1ms' },
  { id: 3, input: 'pwwkew', expected: 3, actual: 5, passed: false, runtime: '1ms' },
  { id: 4, input: '""', expected: 0, actual: 0, passed: true, runtime: '0ms' },
  { id: 5, input: 'aab', expected: 2, actual: 2, passed: true, runtime: '1ms' },
];
