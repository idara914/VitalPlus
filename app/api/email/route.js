// /app/api/email/route.js
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ message: "Invalid email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const formLink = `https://www.vital-plus.xyz/care-provider/new/manual`;

    const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",  // ✅ Hostinger SMTP server
  port: 465,                   // ✅ SSL port
  secure: true,                // ✅ true for port 465
  auth: {
    user: process.env.SMTP_USER, // your Hostinger email address
    pass: process.env.SMTP_PASS, // your email password (not Gmail app password)
  },
});


    await transporter.sendMail({
      from: `"Vital Plus" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "You're invited to register as a provider",
      html: `<p>You’ve been invited to complete a registration form.</p>
             <p><a href="${formLink}">Click here to fill it out</a></p>`,
    });

    return new Response(JSON.stringify({ message: "Email sent" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Email error:", error);
    return new Response(JSON.stringify({ message: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
