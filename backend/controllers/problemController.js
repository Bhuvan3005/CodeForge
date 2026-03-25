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
        
        // Format the problems to match our MongoDB model
        const formattedProblems = (parsed.problems || []).map(p => ({
          title: p.name,
          topic: topic, // Use the topic passed to the function
          difficulty: difficulty,
          description: p.description,
          testCases: (p.testcases || []).map(tc => ({
            input: tc.input,
            output: tc.output,
            isPublic: true
          }))
        }));

        // Insert the generated problems into the database
        const savedProblems = await Problem.insertMany(formattedProblems);
        
        // Return the saved problems (now with MongoDB IDs)
        res.json({ problems: savedProblems });
      } catch (e) {
        console.error('Error processing AI problems:', e.message);
        res.status(500).json({ message: 'Error saving generated problems' });
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
