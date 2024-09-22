"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../../assets/auth.module.css";
import AuthLayout from "@/app/components/layouts/AuthLayout";
import instance from "@/services/axios";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Verify() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);

  const validateEmail = (email) => {
    if (!email) {
      return "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Invalid email address";
    } else {
      return null;
    }
  };

  const validateOtp = (otp) => {
    if (!otp) {
      return "Please enter your OTP";
    } else if (otp.length < 6 || otp.length > 6) {
      return "OTP is a 6 character code";
    } else {
      return null;
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    setError(validateEmail(email));
  };

  const handleOtpChange = (e) => {
    const otp = e.target.value;
    setOtp(otp);
    setError(validateOtp(otp));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const otpError = validateOtp(otp);
    if (emailError || otpError) {
      setError(emailError || otpError);
    } else {
      await instance.post('/auth/verify-otp', { email, otp })
        .then(response => {
          if (response.status == 200) {
            toast.success(response.data.message);
            router.push('/auth/2fa');
          }
        }).catch(error => {
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <AuthLayout
      heading="Welcome to"
      text="Enhance proactive homecare and improve health outcomes with our solutions. We're here to support better health and well-being at home."
    >
      <section className="verified-page-section">
        <h2 className={styles.title}>Account Verified Successfully!</h2>
        <p>
          Login to account? <Link href={"/auth/login"}>Sign In</Link>
        </p>
      </section>
    </AuthLayout>
  );
}
