"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import MainLayout from "../../../components/layouts/MainLayout";
import TextField from "@/app/components/common/TextField/TextField";
import SelectField from "@/app/components/common/SelectField/SelectField";
import { Radio } from "antd";
import DateSelector from "@/app/components/common/DateSelector/DateSelector";
import Button from "@/app/components/common/Button/Button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const customField = { backgroundColor: "#fff" };

export default function ManualAdd() {
  const router = useRouter();
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/auth/login"; // ✅ Dev redirect
    } else {
      setUserLoaded(true);
    }
  }, []);

  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    MiddleInitial: "",
    AddressLine1: "",
    AddressLine2: "",
    City: "",
    State: "",
    ZipCode: "",
    PhoneNumber: "",
    Gender: "",
    Email: "",
    FaxNumber: "",
    NPI: "",
    DOB: "",
    Remarks: "",
  });

  const handleChange = (key) => (e) => {
    const value = e?.target?.value ?? e;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const requiredFields = ["FirstName", "LastName", "PhoneNumber", "Email", "ZipCode"];
    const missing = requiredFields.find((field) => !form[field]);
    if (missing) return toast.error(`${missing.replace(/([A-Z])/g, " $1")} is required.`);

    const token = localStorage.getItem("token");
    if (!token) return toast.error("Login session missing.");

    let userId;
    try {
      const decoded = jwtDecode(token);
      userId = decoded?.id;
      if (!userId) throw new Error("Invalid token payload.");
    } catch (e) {
      return toast.error("Invalid or expired session.");
    }

    const payload = { ...form, userId };

    try {
      const res = await fetch("/api/provider", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Provider saved");
      router.push("/admin/dashboard");
    } catch (err) {
      toast.error(err.message || "Error saving provider");
    }
  };

  const handleCancel = () => router.push("/care-provider/new");

  if (!userLoaded) return null; // ✅ Block rendering until auth check passes

  return (
    <main>
      <MainLayout isSignedIn={true}>
        <div className={styles.container}>
          {/* ... rest of your form unchanged ... */}
        </div>
      </MainLayout>
    </main>
  );
}
