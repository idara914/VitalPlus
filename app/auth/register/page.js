"use client";

import { useState } from "react";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import Divider from "../../components/Divider";
import Link from "next/link";
import styles from "../../assets/auth.module.css";
import AuthLayout from "@/app/components/Layouts/AuthLayout";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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

  const validateName = (name) => {
    if (!name) {
      return "Please enter your name";
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

  const handleNameChange = (e) => {
    const name = e.target.value;
    setName(name);
    setError(validateName(name));
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    setError(validateEmail(email));
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    setError(validatePassword(password));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (emailError || passwordError) {
      setError(emailError || passwordError);
    } else {
      // Proceed with login logic here
      console.log("Login successful");
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
            type="name"
            placeholder="Your Name"
            value={name}
            onChange={handleNameChange}
            customStyle={{
              marginBottom: "20px",
            }}
          />

          <TextField
            label="Email"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={handleEmailChange}
            customStyle={{
              marginBottom: "20px",
            }}
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
          ></p>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button
            text="Create Account"
            customStyle={{
              marginTop: "50px",
              width: "100%",
            }}
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
