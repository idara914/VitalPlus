import rateLimit from 'express-rate-limit';

// Limit OTP requests (5 per hour)
export const otpRequestLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // Limit each IP to 5 OTP requests per hour
  message: 'Too many OTP requests from this IP, please try again after an hour'
});

// Limit OTP verifications (10 per hour)
export const otpVerifyLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // Limit each IP to 10 OTP verification attempts per hour
  message: 'Too many OTP verification attempts, please try again after an hour'
});
