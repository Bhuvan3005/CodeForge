import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  problemsSolved: { type: Number, default: 0 },
  problemsAttempted: { type: Number, default: 0 },
  topicProgress: [{
    topic: String,
    solved: { type: Number, default: 0 }
  }],
  streak: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now }
});

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;
