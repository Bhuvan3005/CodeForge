import express from 'express';
import { submitCode, getSubmissionsByUserId } from '../controllers/submissionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', submitCode);
router.get('/:userId', getSubmissionsByUserId);

export default router;
