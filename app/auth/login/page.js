"use client";

import { useState } from "react";
import TextField from "../../components/common/TextField/TextField";
import Button from "../../components/common/Button/Button";
import Divider from "../../components/common/Divider/Divider";
import Link from "next/link";
import styles from "../../assets/auth.module.css";
import AuthLayout from "@/app/components/layouts/AuthLayout";
import instance from "@/services/axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const validateEmail = (email) => {
    if (!email) return "Please enter your email";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email address";
    return null;
  };

  const validatePassword = (password) => {
    if (!password) return "Please enter your password";
    if (password.length < 8) return "Password must be at least 8 characters";
    return null;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError || passwordError) {
    setError(emailError || passwordError);
    return;
  }

  try {
    const response = await instance.post("/api/auth", {
      action: "login",
      email,
      password,
    });

    const data = response.data;

    if (!data?.user?.id) {
      toast.error("Login failed: user not found.");
      return;
    }

    // ✅ Store user info in localStorage (simplified auth)
    localStorage.setItem("userId", data.user.id);
    localStorage.setItem("email", data.user.email);

    toast.success("Login successful");

    // ✅ Redirect
    window.location.href = "/admin/dashboard";
  } catch (err) {
    console.error("Login error:", err);
    toast.error(err?.response?.data?.message || "Login failed");
  }
};


  return (
    <AuthLayout
      heading="Welcome to"
      text="Enhance proactive homecare and improve health outcomes with our solutions."
    >
      <section>
        <h1 className={styles.formHeading}>Welcome Back!</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(validateEmail(e.target.value));
            }}
            customStyle={{ marginBottom: "20px" }}
          />

          <TextField
            label="Password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(validatePassword(e.target.value));
            }}
          />

          <p className={styles.forgotText}>
            <Link href="/auth/forgot-password">Forgot Password?</Link>
          </p>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <Button text="Login" type="submit" customStyle={{ marginTop: "50px", width: "100%" }} />
        </form>

        <Divider text="OR" />
        <p>
          Don&apos;t have an account? <Link href="/auth/register">Register</Link>
        </p>
      </section>
    </AuthLayout>
  );
}
