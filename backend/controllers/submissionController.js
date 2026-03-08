import Submission from '../models/Submission.js';
import Problem from '../models/Problem.js';
import User from '../models/User.js';
import Progress from '../models/Progress.js';
import { executeCode } from '../utils/codeExecutor.js';

export const submitCode = async (req, res) => {
  const { problemId, code, language } = req.body;
  const userId = req.user._id; // Use authenticated user ID

  try {
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });

    // Execute code against test cases
    const executionResult = await executeCode(code, language, problem.testCases);

    // Save submission
    const submission = await Submission.create({
      userId,
      problemId,
      code,
      language,
      status: executionResult.status,
      runtime: executionResult.runtime,
      memory: executionResult.memory
    });

    // RECTIVE UPDATE: Update Progress and User Stats
    if (userId) {
      let progress = await Progress.findOne({ userId });
      if (!progress) {
        progress = await Progress.create({ userId });
      }

      progress.problemsAttempted += 1;
      progress.lastActive = Date.now();

      if (executionResult.status === 'Accepted') {
        // Update user's solved problems if first time solving
        const user = await User.findById(userId);
        if (user && !user.solvedProblems.includes(problemId)) {
          user.solvedProblems.push(problemId);
          await user.save();

          progress.problemsSolved += 1;
          
          // Update Topic Progress
          const topicIdx = progress.topicProgress.findIndex(tp => tp.topic === problem.topic);
          if (topicIdx > -1) {
            progress.topicProgress[topicIdx].solved += 1;
          } else {
            progress.topicProgress.push({ topic: problem.topic, solved: 1 });
          }
        }
      }

      // Simple streak logic (could be more complex, but for demo: if submitted today, keep streak)
      // Here just incrementing for simplicity of reactivity demonstration
      progress.streak += 1; 

      await progress.save();

      // Recalculate Weak Topics for User
      const user = await User.findById(userId);
      if (user) {
        // Logic: topics with least solved in topicProgress
        const sortedTopics = [...progress.topicProgress].sort((a, b) => a.solved - b.solved);
        user.weakTopics = sortedTopics.slice(0, 3).map(tp => tp.topic);
        await user.save();
      }
    }

    res.json({
      submission,
      results: executionResult.results
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubmissionsByUserId = async (req, res) => {
  try {
    // SECURITY: Ensure user is requesting their own submissions
    if (req.user._id.toString() !== req.params.userId) {
      return res.status(403).json({ message: 'Access denied. You can only view your own history.' });
    }

    const submissions = await Submission.find({ userId: req.params.userId }).populate('problemId', 'title');
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
