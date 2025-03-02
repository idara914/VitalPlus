import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.hostinger.com", // ✅ Ensure correct SMTP host
  port: parseInt(process.env.SMTP_PORT, 10) || 465, // ✅ Ensure port is parsed as an integer
  secure: true, // ✅ Use `true` for port 465 (SSL)
  auth: {
    user: process.env.SMTP_USER, // ✅ Your Hostinger email
    pass: process.env.SMTP_PASS, // ✅ Your Hostinger email password
  },
});

export const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: `"VitalPlus" <${process.env.SMTP_USER}>`, // ✅ Ensure this matches SMTP_USER
    to: email,
    subject: "Your OTP for Login",
    text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📧 OTP Email Sent!");
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};

