import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserProfile);

export default router;
