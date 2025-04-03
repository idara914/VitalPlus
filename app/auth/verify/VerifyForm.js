"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import TextField from "@/app/components/common/TextField/TextField";
import Button from "@/app/components/common/Button/Button";

export default function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify-otp", otp, token }), // ✅ action required
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("OTP Verified Successfully");
        router.push("/account/update");
      } else {
        toast.error(data.message || "OTP Verification Failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send-otp", token }), // ✅ action required
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "OTP Sent");
      } else {
        toast.error(data.message || "Failed to resend OTP");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setResending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="OTP"
        type="text"
        placeholder="123456"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <Button
        text={loading ? "Verifying..." : "Confirm OTP"}
        customStyle={{ marginTop: "50px", width: "100%" }}
        disabled={loading}
      />
      <Button
        text={resending ? "Resending..." : "Resend OTP"}
        customStyle={{
          marginTop: "20px",
          width: "50%",
          backgroundColor: "#f0f0f0",
          color: "#333",
        }}
        onClick={handleResend}
        disabled={resending || loading}
      />
    </form>
  );
}


