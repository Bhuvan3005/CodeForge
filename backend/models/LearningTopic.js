import mongoose from 'mongoose';

const learningTopicSchema = new mongoose.Schema({
  topicName: { type: String, required: true, unique: true },
  lessons: [{
    title: String,
    content: String,
    videoUrl: String
  }],
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] }
});

const LearningTopic = mongoose.model('LearningTopic', learningTopicSchema);
export default LearningTopic;
