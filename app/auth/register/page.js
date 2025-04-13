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
import instance from "@/services/axios";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await instance.post("/api/auth", {
        action: "register",
        username: name,
        email: email,
        password: password,
      });

      const data = res.data;

      localStorage.setItem("userId", data.userId);
      localStorage.setItem("email", email);
      localStorage.setItem("token", data.token);

      toast.success("Account created");
      router.push("/account/update");
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      heading={
        <Link href="https://www.vital-plus.xyz/" style={{ textDecoration: "none", color: "#000" }}>
          Get Registered - <strong>Vital +</strong>
        </Link>
      }
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

