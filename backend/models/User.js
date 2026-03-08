import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // Optional for social logins
  authProvider: { type: String, default: 'email', enum: ['email', 'google', 'github', 'apple'] },
  socialId: { type: String, sparse: true }, // Optional ID from social provider
  otpCode: { type: String }, // Random 6 digit OTP
  otpExpiry: { type: Date }, // Timestamp when OTP expires
  isEmailVerified: { type: Boolean, default: false },
  solvedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
  weakTopics: [String],
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving (only if password exists)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
