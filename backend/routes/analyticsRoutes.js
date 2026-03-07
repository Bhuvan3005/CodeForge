import express from 'express';
import { getProgress, getAnalysisReport } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/progress', getProgress);
router.get('/report', getAnalysisReport);

export default router;
