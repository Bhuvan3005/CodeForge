import express from 'express';
import { submitCode, runCode, getSubmissionsByUserId } from '../controllers/submissionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, submitCode);
router.post('/run', protect, runCode);
router.get('/:userId', protect, getSubmissionsByUserId);

export default router;
