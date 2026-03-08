import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);
import Problem from '../models/Problem.js';
import LearningTopic from '../models/LearningTopic.js';
import User from '../models/User.js';
import Progress from '../models/Progress.js';
import Submission from '../models/Submission.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Problem.deleteMany({});
    await LearningTopic.deleteMany({});
    await User.deleteMany({});
    await Progress.deleteMany({});
    await Submission.deleteMany({});

    // 1. Seed Problems
    const problems = await Problem.insertMany([
      {
        title: 'Two Sum',
        topic: 'Arrays',
        difficulty: 'Easy',
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        testCases: [{ input: '[2,7,11,15], 9', output: '[0,1]', isPublic: true }]
      },
      {
        title: 'Longest Substring Without Repeating Characters',
        topic: 'String',
        difficulty: 'Medium',
        description: 'Given a string s, find the length of the longest substring without repeating characters.',
        testCases: [{ input: '"abcabcbb"', output: '3', isPublic: true }]
      },
      {
        title: 'Reverse Linked List',
        topic: 'Linked List',
        difficulty: 'Easy',
        description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
        testCases: [{ input: '[1,2,3,4,5]', output: '[5,4,3,2,1]', isPublic: true }]
      }
    ]);

    // 2. Create a demo user
    const user = await User.create({
      _id: new mongoose.Types.ObjectId('69ac577afd45aa426e87ebc5'),
      name: 'Demo Engineer',
      email: 'demo@codeforge.com',
      password: 'password123',
      solvedProblems: [problems[0]._id],
      weakTopics: ['String']
    });

    // 3. Create progress data for user
    await Progress.create({
      userId: user._id,
      problemsSolved: 1,
      problemsAttempted: 2,
      streak: 5,
      topicProgress: [
        { topic: 'Arrays', solved: 1 },
        { topic: 'String', solved: 0 }
      ]
    });

    // 4. Seed Submissions
    await Submission.create({
      userId: user._id,
      problemId: problems[0]._id,
      code: 'function twoSum(nums, target) { ... }',
      language: 'javascript',
      status: 'Accepted',
      runtime: '56ms',
      memory: '42MB'
    });

    // 5. Seed Learning Topics
    await LearningTopic.insertMany([
      {
        topicName: 'Arrays & Hashing',
        difficulty: 'Beginner',
        lessons: [
          { title: 'Introduction to Arrays', content: 'Arrays are a collection of elements stored at contiguous memory locations...' }
        ]
      }
    ]);

    console.log('Seeding completed successfully!');
    console.log('Default User ID (Matches Frontend):', user._id);
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
