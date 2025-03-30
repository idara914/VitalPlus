"use client";

import { useState } from "react";
import TextField from "../../components/common/TextField/TextField";
import Button from "../../components/common/Button/Button";
import styles from "../../assets/auth.module.css";
import AuthLayout from "@/app/components/layouts/AuthLayout";
import instance from "@/services/axios";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateOtp = (otp) => {
    if (!otp) return "Please enter your OTP";
    if (otp.length !== 6) return "OTP must be exactly 6 digits";
    return null;
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    setOtp(value);
    setError(validateOtp(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error("Invalid OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await instance.post("/api/auth", {
        action: "verify-otp",
        otp,
        token,
      });

      if (res.status === 200) {
        toast.success("OTP Verified Successfully!");
        router.push("/account/update");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      heading="Welcome to"
      text="Enhance proactive homecare and improve health outcomes with our solutions. We're here to support better health and well-being at home."
    >
      <section>
        <h1 className={styles.formHeading}>OTP Verification</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="OTP"
            type="text"
            placeholder="123456"
            value={otp}
            onChange={handleOtpChange}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button
            text={loading ? "Verifying..." : "Confirm OTP"}
            customStyle={{
              marginTop: "50px",
              width: "100%",
            }}
            disabled={loading}
          />
        </form>
      </section>
    </AuthLayout>
  );
}
