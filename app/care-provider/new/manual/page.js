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
    console.log("TOKEN FROM LOCAL STORAGE:", token);

    if (!token) {
      window.location.href = "/auth/login";
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

  if (!userLoaded) return <p style={{ padding: "2rem" }}>Checking login...</p>;

  return (
    <main>
      <MainLayout isSignedIn={true}>
        <div className={styles.container}>
          <div className={styles.form}>
            <h1 style={{ marginBottom: "30px" }}>Add Provider</h1>
            <div className={styles.manualPageFormContainer}>
              <SelectField
                customStyle={customField}
                label="Type of professional"
                placeholder="Choose"
                options={[
                  { Name: "Registered Nurse (RN)", Id: 1 },
                  { Name: "Certified Nursing Assistant (CNA)", Id: 2 },
                  { Name: "Nurse Technician", Id: 3 },
                ]}
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gridGap: "20px", width: "100%", margin: "20px 0" }}>
                <TextField label="Last Name" value={form.LastName} onChange={handleChange("LastName")} customStyle={customField} />
                <TextField label="First Name" value={form.FirstName} onChange={handleChange("FirstName")} customStyle={customField} />
                <TextField label="Middle Initial" value={form.MiddleInitial} onChange={handleChange("MiddleInitial")} customStyle={customField} />
              </div>
              <TextField label="Address Line 1" value={form.AddressLine1} onChange={handleChange("AddressLine1")} customStyle={customField} />
              <TextField label="Address Line 2" value={form.AddressLine2} onChange={handleChange("AddressLine2")} customStyle={customField} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gridGap: "20px", width: "100%", margin: "20px 0" }}>
                <TextField label="City" value={form.City} onChange={handleChange("City")} customStyle={customField} />
                <TextField label="State/Country" value={form.State} onChange={handleChange("State")} customStyle={customField} />
                <TextField label="Postal Code" value={form.ZipCode} onChange={handleChange("ZipCode")} customStyle={customField} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", alignItems: "center", gridGap: "20px", width: "100%", margin: "20px 0" }}>
                <TextField label="Provider Phone Number" value={form.PhoneNumber} onChange={handleChange("PhoneNumber")} customStyle={customField} />
                <Radio.Group onChange={(e) => setForm((prev) => ({ ...prev, Gender: e.target.value }))} style={{ marginTop: "20px" }}>
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                </Radio.Group>
              </div>
            </div>

            <h3 style={{ margin: "30px 0" }}>Correspondence Address</h3>
            <div className={styles.manualPageFormContainer}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", alignItems: "center", gridGap: "20px", width: "100%", margin: "20px 0" }}>
                <TextField label="City" customStyle={customField} />
                <TextField label="State/Country" customStyle={customField} />
                <TextField label="Postal Code" customStyle={customField} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", alignItems: "center", gridGap: "20px", width: "100%", margin: "20px 0" }}>
                <TextField label="Phone Number" value={form.PhoneNumber} onChange={handleChange("PhoneNumber")} customStyle={customField} />
                <TextField label="Fax Number" value={form.FaxNumber} onChange={handleChange("FaxNumber")} customStyle={customField} />
                <TextField label="Email Address" value={form.Email} onChange={handleChange("Email")} customStyle={customField} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", alignItems: "center", gridGap: "20px", width: "100%", margin: "20px 0" }}>
                <DateSelector label="Date of Birth" placeholder="DD-MM-YYYY" onChange={handleChange("DOB")} customStyle={customField} />
                <TextField label="NPI" value={form.NPI} onChange={handleChange("NPI")} customStyle={customField} />
                <TextField label="Speciality" value={form.Remarks} onChange={handleChange("Remarks")} customStyle={customField} />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: "50px" }}>
              <Button text="Cancel" onClick={handleCancel} customStyle={{ color: "#000", backgroundColor: "#fff", marginRight: "10px" }} />
              <Button text="Save" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </MainLayout>
    </main>
  );
}
