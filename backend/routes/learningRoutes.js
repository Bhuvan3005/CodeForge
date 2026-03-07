import express from 'express';
import { getTopics, getTopicById } from '../controllers/learningController.js';

const router = express.Router();

router.get('/', getTopics);
router.get('/:id', getTopicById);

export default router;
