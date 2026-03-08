import User from '../models/User.js';
import Progress from '../models/Progress.js';
import jwt from 'jsonwebtoken';
import { sendOtpEmail } from '../utils/emailService.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '30d' });
};

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const requestOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    let user = await User.findOne({ email });
    const otpCode = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    if (!user) {
      // Create an unverified user shell
      user = await User.create({
        name: email.split('@')[0],
        email,
        authProvider: 'email',
        otpCode,
        otpExpiry,
        isEmailVerified: false
      });

      // Initialize zeroed out progress for new user
      await Progress.create({ userId: user._id });
    } else {
      // Update existing user with new OTP
      user.otpCode = otpCode;
      user.otpExpiry = otpExpiry;
      await user.save();
    }

    // Send Email
    const emailSent = await sendOtpEmail(email, otpCode);
    if (emailSent) {
      res.status(200).json({ message: 'OTP sent to your email.' });
    } else {
      res.status(500).json({ message: 'Failed to send OTP email.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otpCode } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.otpCode !== otpCode) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Success! Clear OTP and verify email
    user.otpCode = undefined;
    user.otpExpiry = undefined;
    user.isEmailVerified = true;
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      provider: user.authProvider,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const socialLogin = async (req, res) => {
  const { email, name, provider, socialId } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // First time social login
      user = await User.create({
        name,
        email,
        authProvider: provider,
        socialId: socialId,
        isEmailVerified: true // Social providers pre-verify emails
      });

      // Initialize zeroed out progress for new user
      await Progress.create({ userId: user._id });
    } else {
      // Existing user, maybe updating auth provider reference
      if (!user.socialId) {
        user.socialId = socialId;
        user.authProvider = provider;
        await user.save();
      }
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      provider: user.authProvider,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -otpCode -otpExpiry');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Legacy password-based routes (kept for backward compat)
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    const user = await User.create({ name, email, password, isEmailVerified: true });
    await Progress.create({ userId: user._id });
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && user.password && (await user.comparePassword(password))) {
      res.json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
