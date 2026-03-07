import Submission from '../models/Submission.js';
import User from '../models/User.js';

export const getProgress = async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await User.findById(userId).populate('solvedProblems', 'topic');
    const topicsSolved = user.solvedProblems.reduce((acc, problem) => {
      acc[problem.topic] = (acc[problem.topic] || 0) + 1;
      return acc;
    }, {});

    res.json({
      skillStats: user.skillStats,
      topicsSolved,
      totalSolved: user.solvedProblems.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnalysisReport = async (req, res) => {
  const { userId } = req.query;

  try {
    const submissions = await Submission.find({ userId }).sort({ createdAt: -1 }).limit(20);
    // Basic logic to identify weak topics based on recent "Wrong Answer" statuses
    const failures = submissions.filter(s => s.status !== 'Accepted');
    
    res.json({
      recentSubmissions: submissions,
      failureCount: failures.length,
      recommendation: failures.length > 5 ? 'Focus on fundamental topics' : 'Keep practicing advanced problems'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
