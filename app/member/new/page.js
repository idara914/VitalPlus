
"use client";

import { useState } from "react";
import MainLayout from "@/app/components/layouts/MainLayout";
import TextField from "@/app/components/common/TextField/TextField";
import SelectField from "@/app/components/common/SelectField/SelectField";
import DateSelector from "@/app/components/common/DateSelector/DateSelector";
import Button from "@/app/components/common/Button/Button";
import styles from "@/app/assets/member.module.css";

const steps = [
  "Personal Info",
  "Contact Details",
  "Membership",
  "Emergency Contact",
];

export default function NewMemberForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    membershipType: "",
    startDate: "",
    endDate: "",
    emergencyContact: "",
    emergencyRelation: "",
    emergencyPhone: "",
  });

  const handleChange = (key) => (e) => {
    const value = e?.target?.value ?? e;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    console.log("Submitting", form);
  };

  return (
    <MainLayout isSignedIn={true}>
      <div className={styles.memberFormWrapper}>
        <h1 className={styles.memberHeader}>New Member Registration</h1>
        <p className={styles.memberSubtext}>Step {currentStep + 1} of {steps.length} – {steps[currentStep]}</p>

        <div className={styles.memberStepper}>
          {steps.map((step, index) => (
            <button
              key={step}
              className={`${styles.stepButton} ${index === currentStep ? styles.activeStep : ""}`}
              onClick={() => setCurrentStep(index)}
            >
              {step}
            </button>
          ))}
        </div>

        <div className={styles.memberFormCard}>
          <div className={styles.memberFormGrid}>
            {currentStep === 0 && (
              <>
                <TextField label="First Name" value={form.firstName} onChange={handleChange("firstName")} />
                <TextField label="Last Name" value={form.lastName} onChange={handleChange("lastName")} />
                <DateSelector label="Date of Birth" onChange={handleChange("dob")} />
                <SelectField
                  label="Gender"
                  options={[
                    { Id: "male", Name: "Male" },
                    { Id: "female", Name: "Female" },
                    { Id: "other", Name: "Other" },
                  ]}
                  onChange={handleChange("gender")}
                />
              </>
            )}
            {currentStep === 1 && (
              <>
                <TextField label="Email Address" value={form.email} onChange={handleChange("email")} />
                <TextField label="Phone Number" value={form.phone} onChange={handleChange("phone")} />
                <TextField label="Street Address" value={form.address} onChange={handleChange("address")} />
                <TextField label="City" value={form.city} onChange={handleChange("city")} />
                <SelectField
                  label="State"
                  options={[
                    { Id: "TX", Name: "Texas" },
                    { Id: "CA", Name: "California" },
                    { Id: "NY", Name: "New York" },
                  ]}
                  onChange={handleChange("state")}
                />
                <TextField label="ZIP Code" value={form.zip} onChange={handleChange("zip")} />
              </>
            )}
            {currentStep === 2 && (
              <>
                <SelectField
                  label="Membership Type"
                  options={[
                    { Id: "basic", Name: "Basic" },
                    { Id: "premium", Name: "Premium" },
                    { Id: "vip", Name: "VIP" },
                  ]}
                  onChange={handleChange("membershipType")}
                />
                <DateSelector label="Start Date" onChange={handleChange("startDate")} />
                <DateSelector label="End Date" onChange={handleChange("endDate")} />
              </>
            )}
            {currentStep === 3 && (
              <>
                <TextField label="Emergency Contact Name" value={form.emergencyContact} onChange={handleChange("emergencyContact")} />
                <TextField label="Relationship" value={form.emergencyRelation} onChange={handleChange("emergencyRelation")} />
                <TextField label="Emergency Phone" value={form.emergencyPhone} onChange={handleChange("emergencyPhone")} />
              </>
            )}
          </div>

          <div className={styles.memberActions}>
            {currentStep > 0 && (
              <Button text="Back" onClick={handleBack} customStyle={{ backgroundColor: "#f3f4f6", color: "#111827" }} />
            )}
            {currentStep < steps.length - 1 ? (
              <Button text="Save and Continue" onClick={handleNext} />
            ) : (
              <Button text="Submit" onClick={handleSubmit} />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
