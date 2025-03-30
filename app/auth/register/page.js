"use client";

import { useState } from "react";
import TextField from "../../components/common/TextField/TextField";
import Button from "../../components/common/Button/Button";
import Divider from "../../components/common/Divider/Divider";
import Link from "next/link";
import styles from "../../assets/auth.module.css";
import AuthLayout from "@/app/components/layouts/AuthLayout";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          username: name,
          email: email,
          password: password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      toast.success(data.message);

      // ✅ Save email for OTP verification
      localStorage.setItem("verify_email", email);
      router.push("/auth/verify");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      heading="Get Registered"
      text="Enhance proactive homecare and improve health outcomes with our solutions. We're here to support better health and well-being at home."
    >
      <section>
        <h1 className={styles.formHeading}>Get Registered</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Your Name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            customStyle={{ marginBottom: "20px" }}
          />

          <TextField
            label="Email"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            customStyle={{ marginBottom: "20px" }}
          />

          <TextField
            label="Password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <Button
            text={loading ? "Creating Account..." : "Create Account"}
            customStyle={{ marginTop: "50px", width: "100%" }}
            disabled={loading}
          />
        </form>

        <Divider text="OR" />
        <p>
          Already have an account? <Link href={"/auth/login"}>Sign In</Link>
        </p>
      </section>
    </AuthLayout>
  );
}


