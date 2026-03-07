/**
 * Simulated code execution engine
 * In a real production environment, this would use Docker or a sandboxed environment (like Judge0)
 */
export const executeCode = async (code, language, testCases) => {
  // Simulate network or execution delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let results = [];
  let allPassed = true;

  for (const testCase of testCases) {
    const passed = Math.random() > 0.2; // 80% chance of passing for simulation
    
    if (!passed) {
      allPassed = false;
    }

    results.push({
      input: testCase.input,
      expectedOutput: testCase.output,
      actualOutput: passed ? testCase.output : 'Unexpected error/wrong output',
      passed
    });
  }

  return {
    status: allPassed ? 'Accepted' : 'Wrong Answer',
    runtime: `${Math.floor(Math.random() * 100) + 10}ms`,
    memory: `${(Math.random() * 5 + 1).toFixed(2)}MB`,
    results
  };
};
