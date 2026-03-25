import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendOtpEmail = async (toEmail, otpCode) => {
  const mailOptions = {
    from: `"CodeForge" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: 'Your CodeForge Login Code',
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 480px; margin: auto; padding: 32px; background: #0f0e17; border-radius: 12px; border: 1px solid #2d2b55;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #6366f1, #a855f7); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 12px;">
            <span style="font-size: 24px;">⚡</span>
          </div>
          <h1 style="color: #e2e8f0; font-size: 1.4rem; margin: 0;">Your Login Code</h1>
        </div>
        <div style="background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.3); border-radius: 8px; padding: 24px; text-align: center; margin: 24px 0;">
          <p style="color: #94a3b8; margin: 0 0 8px 0; font-size: 0.85rem;">Use this code to sign in to CodeForge</p>
          <div style="font-size: 2.5rem; font-weight: 800; letter-spacing: 12px; color: #6366f1; font-family: monospace;">${otpCode}</div>
          <p style="color: #64748b; margin: 12px 0 0 0; font-size: 0.75rem;">Expires in 10 minutes</p>
        </div>
        <p style="color: #64748b; font-size: 0.8rem; text-align: center; margin: 0;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email send error:', error.message);
    return false;
  }
};
