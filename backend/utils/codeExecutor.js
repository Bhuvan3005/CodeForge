import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import crypto from 'crypto';

const TEMP_DIR = path.resolve('temp');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

/**
 * Real code execution engine
 * Spawns child processes to compile and run code in a temporary directory
 */
export const executeCode = async (code, language, testCases) => {
  const runId = crypto.randomBytes(8).toString('hex');
  const userDir = path.join(TEMP_DIR, runId);
  fs.mkdirSync(userDir);

  let results = [];
  let allPassed = true;
  let overallStatus = 'Accepted';
  let totalRuntime = 0;

  try {
    const config = getExecutionConfig(language, userDir, code);
    
    // Save code to file
    fs.writeFileSync(path.join(userDir, config.fileName), code);

    // Compile if necessary
    if (config.compileCmd) {
      const compileResult = await runProcess(config.compileCmd.command, config.compileCmd.args, userDir);
      if (compileResult.code !== 0) {
        return {
          status: 'Compilation Error',
          runtime: '0ms',
          memory: '0MB',
          results: [],
          error: compileResult.stderr
        };
      }
    }

    for (const testCase of testCases) {
      const start = Date.now();
      const executionResult = await runProcess(config.runCmd.command, config.runCmd.args, userDir, testCase.input);
      const runtime = Date.now() - start;
      totalRuntime += runtime;

      if (executionResult.code !== 0) {
        allPassed = false;
        overallStatus = executionResult.stderr.includes('Time Limit Exceeded') ? 'Time Limit Exceeded' : 'Runtime Error';
        results.push({
          input: testCase.input,
          expectedOutput: testCase.output,
          actualOutput: executionResult.stderr || 'Runtime Error',
          passed: false,
          error: executionResult.stderr
        });
        continue;
      }

      const actualOutput = executionResult.stdout.trim();
      const expectedOutput = testCase.output.trim();
      const passed = actualOutput === expectedOutput;

      if (!passed) {
        allPassed = false;
        overallStatus = 'Wrong Answer';
      }

      results.push({
        input: testCase.input,
        expectedOutput,
        actualOutput,
        passed,
        runtime: `${runtime}ms`
      });
    }

  } catch (error) {
    console.error('Execution Error:', error);
    overallStatus = 'Internal Error';
    return { status: 'Internal Error', error: error.message, results: [] };
  } finally {
    // Cleanup - Wait a bit to ensure files aren't locked on Windows
    setTimeout(() => {
      try {
        if (fs.existsSync(userDir)) {
          fs.rmSync(userDir, { recursive: true, force: true });
        }
      } catch (err) {
        console.error('Cleanup error:', err);
      }
    }, 1000);
  }

  return {
    status: overallStatus,
    runtime: `${Math.floor(totalRuntime / (testCases.length || 1))}ms`,
    memory: 'N/A',
    results
  };
};

const getExecutionConfig = (language, userDir, code) => {
  switch (language.toLowerCase()) {
    case 'python':
      return {
        fileName: 'solution.py',
        runCmd: { command: 'python', args: ['solution.py'] }
      };
    case 'cpp':
      return {
        fileName: 'solution.cpp',
        compileCmd: { command: 'g++', args: ['solution.cpp', '-o', 'solution.exe'] },
        runCmd: { command: 'solution.exe', args: [] }
      };
    case 'java':
      // Requires public class Solution
      return {
        fileName: 'Solution.java',
        compileCmd: { command: 'javac', args: ['Solution.java'] },
        runCmd: { command: 'java', args: ['Solution'] }
      };
    case 'javascript':
      return {
        fileName: 'solution.js',
        runCmd: { command: 'node', args: ['solution.js'] }
      };
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
};

const runProcess = (command, args, cwd, input = '') => {
  return new Promise((resolve) => {
    const child = spawn(command, args, { cwd, shell: true });
    let stdout = '';
    let stderr = '';

    const timeout = setTimeout(() => {
      child.kill('SIGKILL');
      resolve({ code: -1, stdout, stderr: 'Time Limit Exceeded' });
    }, 5000);

    if (input) {
      child.stdin.write(input + '\n');
      child.stdin.end();
    }

    child.stdout.on('data', (data) => { stdout += data.toString(); });
    child.stderr.on('data', (data) => { stderr += data.toString(); });

    child.on('close', (code) => {
      clearTimeout(timeout);
      resolve({ code, stdout, stderr });
    });

    child.on('error', (err) => {
      clearTimeout(timeout);
      resolve({ code: 1, stdout, stderr: err.message });
    });
  });
};
