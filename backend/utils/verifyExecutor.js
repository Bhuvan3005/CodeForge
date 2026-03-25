import { executeCode } from './codeExecutor.js';

async function test() {
  const testCases = [
    { input: '1 2', output: '3' },
    { input: '5 5', output: '10' }
  ];

  console.log('--- Testing Python ---');
  const pythonCode = `
import sys
line = sys.stdin.read().split()
if line:
    print(int(line[0]) + int(line[1]))
  `;
  const pyResult = await executeCode(pythonCode, 'python', testCases);
  console.log('Python Status:', pyResult.status);
  console.log('Results:', pyResult.results.map(r => r.passed));

  console.log('\n--- Testing C++ ---');
  const cppCode = `
#include <iostream>
int main() {
    int a, b;
    if (std::cin >> a >> b) {
        std::cout << a + b << std::endl;
    }
    return 0;
}
  `;
  const cppResult = await executeCode(cppCode, 'cpp', testCases);
  console.log('C++ Status:', cppResult.status);
  console.log('Results:', cppResult.results.map(r => r.passed));

  console.log('\n--- Testing Java ---');
  const javaCode = `
import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int a = sc.nextInt();
            int b = sc.nextInt();
            System.out.println(a + b);
        }
    }
}
  `;
  const javaResult = await executeCode(javaCode, 'java', testCases);
  console.log('Java Status:', javaResult.status);
  console.log('Results:', javaResult.results.map(r => r.passed));

  console.log('\n--- Testing Javascript ---');
  const jsCode = `
import fs from 'fs';
const input = fs.readFileSync(0, 'utf8').trim().split(' ');
if (input.length >= 2) {
    console.log(parseInt(input[0]) + parseInt(input[1]));
}
  `;
  const jsResult = await executeCode(jsCode, 'javascript', testCases);
  console.log('JS Status:', jsResult.status);
  console.log('Results:', jsResult.results.map(r => r.passed));

  console.log('\n--- Testing Timeout ---');
  const timeoutCode = `
while True:
    pass
  `;
  const timeoutResult = await executeCode(timeoutCode, 'python', [{input: '', output: ''}]);
  console.log('Timeout Status:', timeoutResult.status);
}

test().catch(console.error);
