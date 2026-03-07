import LearningTopic from '../models/LearningTopic.js';

export const getTopics = async (req, res) => {
  try {
    const topics = await LearningTopic.find({});
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTopicById = async (req, res) => {
  try {
    const topic = await LearningTopic.findById(req.params.id);
    if (topic) {
      res.json(topic);
    } else {
      res.status(404).json({ message: 'Topic not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
