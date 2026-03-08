import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  requestOtp,
  verifyOtp,
  socialLogin
} from '../controllers/authController.js';

const router = express.Router();

// Legacy password-based routes
router.post('/signup', registerUser);
router.post('/login', loginUser);

// OTP-based routes
router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);

// Social login
router.post('/social-login', socialLogin);

router.get('/:id', getUserProfile);

export default router;
