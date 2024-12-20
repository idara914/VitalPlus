"use client";

import { useState } from "react";
import TextField from "../../components/common/TextField/TextField";
import Button from "../../components/common/Button/Button";
import styles from "../../assets/auth.module.css";
import AuthLayout from "@/app/components/layouts/AuthLayout";
import instance from "@/services/axios";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Verify() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);

  const validateOtp = (otp) => {
    if (!otp) {
      return "Please enter your OTP";
    } else if (otp.length < 6 || otp.length > 6) {
      return "OTP is a 6 character code";
    } else {
      return null;
    }
  };

  const handleOtpChange = (e) => {
    const otp = e.target.value;
    setOtp(otp);
    setError(validateOtp(otp));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpError = validateOtp(otp);
    if (otpError) {
      setError(otpError);
    } else {
      await instance.post('/auth/verify-otp', { otp }, { headers: { "Authorization": "Bearer " + Cookies.get("token") } })
        .then(response => {
          if (response.status == 200) {
            toast.success(response.data.message);
            router.push('/account/update');
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
