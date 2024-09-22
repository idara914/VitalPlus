"use client";

import Link from "next/link";
import styles from "../../assets/auth.module.css";
import AuthLayout from "@/app/components/layouts/AuthLayout";

export default function Verify() {
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
