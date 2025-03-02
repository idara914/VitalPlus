import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.hostinger.com", // ✅ Ensure correct SMTP host
  port: parseInt(process.env.SMTP_PORT, 10) || 465, // ✅ Ensure port is parsed as an integer
  secure: true, // ✅ Use `true` for port 465 (SSL)
  auth: {
    user: process.env.SMTP_USER || "", // ✅ Ensure SMTP_USER exists
    pass: process.env.SMTP_PASS || "", // ✅ Ensure SMTP_PASS exists
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
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error("SMTP credentials are missing!");
    }

    await transporter.sendMail(mailOptions);
    console.log("📧 OTP Email Sent!");
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};

