import Progress from '../models/Progress.js';

export const getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.params.userId });
    if (progress) {
      res.json(progress);
    } else {
      // Return empty progress structure if none exists
      res.json({
        problemsSolved: 0,
        problemsAttempted: 0,
        streak: 0,
        topicProgress: []
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
