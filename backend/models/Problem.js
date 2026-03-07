import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  description: { type: String, required: true },
  testCases: [{
    input: String,
    output: String,
    isPublic: { type: Boolean, default: false }
  }]
});

const Problem = mongoose.model('Problem', problemSchema);
export default Problem;
