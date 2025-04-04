"use client";

import { useEffect, useState } from "react";
import TextField from "../../components/common/TextField/TextField";
import Button from "../../components/common/Button/Button";
import Divider from "../../components/common/Divider/Divider";
import Link from "next/link";
import styles from "../../assets/auth.module.css";
import AuthLayout from "@/app/components/layouts/AuthLayout";
import instance from "@/services/axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "@/app/user/index";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const validatePassword = (password) => {
    if (!password) {
      return "Please enter your password";
    } else if (password.length < 8) {
      return "Password must be at least 8 characters";
    } else {
      return null;
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setError(validatePassword(value));
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

      if (response.status === 200) {
        signIn(response.data.token, response.data.user);
        toast.success(response.data.message);
        router.push("/admin/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthLayout
      heading="Welcome to"
      text="Enhance proactive homecare and improve health outcomes with our solutions. We're here to support better health and well-being at home."
    >
      <section>
        <h1 className={styles.formHeading}>Welcome Back!</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={handleEmailChange}
            customStyle={{ marginBottom: "20px" }}
          />

          <TextField
            label="Password"
            type="password"
            placeholder="********"
            value={password}
            onChange={handlePasswordChange}
          />

          <p
            style={{
              fontSize: "16px",
              color: "#425466",
              textAlign: "left",
              marginTop: "16px",
            }}
          >
            <Link href={"/auth/forgot-password"} style={{ color: "#425466" }}>
              Forgot Password?
            </Link>
          </p>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <Button
            text="Login"
            type="submit"
            customStyle={{ marginTop: "50px", width: "100%" }}
          />
        </form>

        <Divider text="OR" />
        <p>
          Don&apos;t have an account? <Link href={"/auth/register"}>Register</Link>
        </p>
      </section>
    </AuthLayout>
  );
}
