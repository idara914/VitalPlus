import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // ✅ Use Hostinger's SMTP host
  port: 465, // ✅ Use port 465 for secure SSL connection
  secure: true, // ✅ Must be `true` for SSL
  auth: {
    user: process.env.SMTP_USER, // ✅ Your Hostinger email
    pass: process.env.SMTP_PASS, // ✅ Your Hostinger email password
  },
});

export const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: `"VitalPlus" <${process.env.SMTP_USER}>`, // ✅ Ensure this matches the auth user
    to: email,
    subject: "Your OTP for Login",
    text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
  };

  return transporter.sendMail(mailOptions);
};
