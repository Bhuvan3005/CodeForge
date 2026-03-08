import express from 'express';
import { submitCode, getSubmissionsByUserId } from '../controllers/submissionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, submitCode);
router.get('/:userId', protect, getSubmissionsByUserId);

export default router;
