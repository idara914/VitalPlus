"use client";

import { useState } from "react";
import MainLayout from "@/app/components/layouts/MainLayout";
import TextField from "@/app/components/common/TextField/TextField";
import SelectField from "@/app/components/common/SelectField/SelectField";
import DateSelector from "@/app/components/common/DateSelector/DateSelector";
import Button from "@/app/components/common/Button/Button";
import styles from "@/app/assets/member.module.css";

const steps = [
  "Patient Info",
  "Demographics",
  "Insurance Payor",
  "Contact",
];

export default function NewMemberForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    timeIn: "",
    timeOut: "",
    startDate: "",
    patientId: "",
    gender: "",
    dob: "",
    phone: "",
    address: "",
    state: "",
    zip: "",
    // demographics
    ethnicity: [],
    languageSpoken: "",
    languageWritten: "",
    preference: "",
    // insurance
    payorName: "",
    cobPolicy: "",
    career: "",
    responsibility: "",
    insAddress: "",
    insState: "",
    insCity: "",
    insZip: "",
    effDate: "",
    termDate: "",
    insPhone: "",
    // emergency
    emergencyContact: "",
    emergencyRelation: "",
    emergencyPhone: "",
    secondaryPhysician: "",
    secondaryPhysicianNumber: "",
    emergencyState: "",
    emergencyCity: "",
    emergencyZip: "",
    emergencyAddress: "",
  });

  const handleChange = (key) => (e) => {
    const value = e?.target?.value ?? e;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    const required = ["firstName", "lastName", "dob", "gender"];
    const missing = required.find((f) => !form[f]);
    if (missing) return alert(`${missing} is required`);
    console.log("Submitting:", form);
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
                <TextField label="Time In" value={form.timeIn} onChange={handleChange("timeIn")} />
                <TextField label="Time Out" value={form.timeOut} onChange={handleChange("timeOut")} />
                <DateSelector label="Start of Care Date" onChange={handleChange("startDate")} />
                <TextField label="Patient ID" value={form.patientId} onChange={handleChange("patientId")} />
                <SelectField
                  label="Gender"
                  options={[{ Id: "male", Name: "Male" }, { Id: "female", Name: "Female" }]}
                  onChange={handleChange("gender")}
                />
                <DateSelector label="Date of Birth" onChange={handleChange("dob")} />
                <TextField label="Phone Number" value={form.phone} onChange={handleChange("phone")} />
                <TextField label="Address" value={form.address} onChange={handleChange("address")} />
                <TextField label="State" value={form.state} onChange={handleChange("state")} />
                <TextField label="Zip Code" value={form.zip} onChange={handleChange("zip")} />
              </>
            )}

            {currentStep === 1 && (
              <>
                <TextField label="Language Spoken" value={form.languageSpoken} onChange={handleChange("languageSpoken")} />
                <TextField label="Language Written" value={form.languageWritten} onChange={handleChange("languageWritten")} />
                <DateSelector label="Date of Birth" onChange={handleChange("dob")} />
                <SelectField
                  label="Patient Preference"
                  options={[{ Id: "family", Name: "Family" }, { Id: "friend", Name: "Friend" }, { Id: "professional", Name: "Professional" }]}
                  onChange={handleChange("preference")}
                />
              </>
            )}

            {currentStep === 2 && (
              <>
                <TextField label="Payor Name" value={form.payorName} onChange={handleChange("payorName")} />
                <TextField label="COB Policy" value={form.cobPolicy} onChange={handleChange("cobPolicy")} />
                <TextField label="Career" value={form.career} onChange={handleChange("career")} />
                <TextField label="Payor Responsibility" value={form.responsibility} onChange={handleChange("responsibility")} />
                <TextField label="Address" value={form.insAddress} onChange={handleChange("insAddress")} />
                <TextField label="State" value={form.insState} onChange={handleChange("insState")} />
                <TextField label="City" value={form.insCity} onChange={handleChange("insCity")} />
                <TextField label="Zip Code" value={form.insZip} onChange={handleChange("insZip")} />
                <DateSelector label="EFF Date" onChange={handleChange("effDate")} />
                <DateSelector label="Term Date" onChange={handleChange("termDate")} />
                <TextField label="Phone" value={form.insPhone} onChange={handleChange("insPhone")} />
              </>
            )}

            {currentStep === 3 && (
              <>
                <TextField label="Emergency Contact Name" value={form.emergencyContact} onChange={handleChange("emergencyContact")} />
                <TextField label="Relationship" value={form.emergencyRelation} onChange={handleChange("emergencyRelation")} />
                <TextField label="Contact" value={form.emergencyPhone} onChange={handleChange("emergencyPhone")} />
                <TextField label="Address" value={form.emergencyAddress} onChange={handleChange("emergencyAddress")} />
                <TextField label="Secondary Physician" value={form.secondaryPhysician} onChange={handleChange("secondaryPhysician")} />
                <TextField label="Secondary Physician Number" value={form.secondaryPhysicianNumber} onChange={handleChange("secondaryPhysicianNumber")} />
                <TextField label="State" value={form.emergencyState} onChange={handleChange("emergencyState")} />
                <TextField label="City" value={form.emergencyCity} onChange={handleChange("emergencyCity")} />
                <TextField label="Zip Code" value={form.emergencyZip} onChange={handleChange("emergencyZip")} />
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
