import Problem from '../models/Problem.js';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find({});
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (problem) {
      res.json(problem);
    } else {
      res.status(404).json({ message: 'Problem not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProblem = async (req, res) => {
  try {
    const problem = await Problem.create(req.body);
    res.status(201).json(problem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const generateProblems = (req, res) => {
  const { topic, difficulty, count } = req.body;
  
  if (!topic || !difficulty || !count) {
    return res.status(400).json({ message: 'Missing required fields: topic, difficulty, count' });
  }

  try {
    const agentsDir = path.resolve(__dirname, '../../agents');
    const scriptPath = path.resolve(agentsDir, 'problemCreator.py');
    const pythonProcess = spawn('python', [scriptPath, topic, difficulty, count], { cwd: agentsDir });
    
    let resultData = '';
    let errorData = '';

    pythonProcess.stdout.on('data', (data) => {
      resultData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorData += data.toString();
    });

    pythonProcess.on('close', async (code) => {
      if (code !== 0) {
        console.error('Python script error:', errorData);
        return res.status(500).json({ message: 'Error generating problems from AI' });
      }
      
      try {
        const parsed = JSON.parse(resultData);
        
        // Optional: you can save the generated problems to MongoDB here.
        // For example, if you wanted to save them:
        // await Problem.insertMany(parsed.problems);
        
        res.json(parsed);
      } catch (e) {
        console.error('Error parsing JSON from python script:', resultData);
        res.status(500).json({ message: 'Invalid JSON response from AI agent' });
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
