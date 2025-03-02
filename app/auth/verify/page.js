"use client";

import { useState, useEffect } from "react";
import TextField from "../../components/common/TextField/TextField";
import Button from "../../components/common/Button/Button";
import styles from "../../assets/auth.module.css";
import AuthLayout from "@/app/components/layouts/AuthLayout";
import instance from "@/services/axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Verify() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  // ✅ Fetch email from cookies on component mount
  useEffect(() => {
    const storedEmail = Cookies.get("email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      toast.error("Email not found. Please log in again.");
    }
  }, []);

  // ✅ Validate OTP input
  const validateOtp = (otp) => {
    if (!otp) return "Please enter your OTP";
    if (otp.length !== 6) return "OTP must be exactly 6 digits";
    return null;
  };

  const handleOtpChange = (e) => {
    const otpValue = e.target.value;
    setOtp(otpValue);
    setError(validateOtp(otpValue));
  };

  // ✅ Submit OTP verification request
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpError = validateOtp(otp);
    if (otpError) {
      setError(otpError);
      return;
    }

    if (!email) {
      toast.error("Email is missing. Please log in again.");
      return;
    }

    try {
      const response = await instance.post("/api/auth", {
        action: "verify-otp",
        otp,
        email, // ✅ Ensure email is included in the request
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/account/update");
      }
    } catch (error) {
      console.error("❌ OTP Verification Failed:", error);
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <AuthLayout
      heading="Welcome to"
      text="Enhance proactive homecare and improve health outcomes with our solutions. We're here to support better health and well-being at home."
    >
      <section>
        <h1 className={styles.formHeading}>OTP Verification!</h1>
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
            text="Confirm OTP"
            onClick={handleSubmit} // ✅ Ensure button triggers the function
            customStyle={{
              marginTop: "50px",
              width: "100%",
            }}
          />
        </form>
      </section>
    </AuthLayout>
  );
}

