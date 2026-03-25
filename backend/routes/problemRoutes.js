import express from 'express';
import { getProblems, getProblemById, createProblem, generateProblems } from '../controllers/problemController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProblems);
router.post('/generate', generateProblems);
router.get('/:id', getProblemById);
router.post('/', createProblem);

export default router;
