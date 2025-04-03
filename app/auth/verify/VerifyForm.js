
"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function VerifyForm() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimeout, setResendTimeout] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "verify-otp", email, otp }),
    });

    if (res.ok) {
      toast.success("OTP Verified");
    } else {
      const data = await res.json();
      toast.error(data.message);
    }
    setLoading(false);
  };

  const handleResend = async () => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "send-otp", email }),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("OTP Sent");
      setResendTimeout(30);
      const timer = setInterval(() => setResendTimeout((t) => (t > 0 ? t - 1 : 0)), 1000);
      setTimeout(() => clearInterval(timer), 30000);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
      <button type="button" onClick={handleResend} disabled={resendTimeout > 0}>
        {resendTimeout > 0 ? `Resend in ${resendTimeout}s` : "Resend OTP"}
      </button>
    </form>
  );
}
