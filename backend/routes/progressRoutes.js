import express from 'express';
import { getUserProgress } from '../controllers/progressController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:userId', protect, getUserProgress);

export default router;
