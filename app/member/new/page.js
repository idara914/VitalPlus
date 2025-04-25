"use client";

import { useState } from "react";
import MainLayout from "@/app/components/layouts/MainLayout";
import styles from "@/app/assets/member.module.css";
import Stepper from "@/app/components/common/Stepper/Stepper";
import { Form } from "antd";
import axios from "axios";
import PatientInfoForm from "./components/PatientInfoForm";
import DemographicForm from "./components/Demographics";
import InsurancePayor from "./components/InsurancePayor";
import Contact from "./components/Contact";

export default function NewMemberForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values:", values);
      await axios.post("/api/save-patient", values);
      alert("Saved successfully");
    } catch (error) {
      console.error("Validation failed:", error);
      alert("Save failed");
    }
  };

  const onChange = (current) => {
    if (current < currentStep) {
      setCurrentStep(current);
    }
  };

  return (
    <MainLayout isSignedIn={true}>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          {["Patient Information", "Patient Demographics", "Insurance Payor", "Emergency Contact"][currentStep]}
        </h1>

        <Stepper
          steps={[
            { title: "Patient Info" },
            { title: "Demographics" },
            { title: "Insurance Payor" },
            { title: "Contact" },
          ]}
          currentStep={currentStep}
          onChange={onChange}
        />

        <div className={styles.containerCard}>
          <Form layout="vertical" form={form}>
            <div style={{ display: currentStep === 0 ? "block" : "none" }}>
              <PatientInfoForm form={form} onClick={() => setCurrentStep(1)} />
            </div>
            <div style={{ display: currentStep === 1 ? "block" : "none" }}>
              <DemographicForm form={form} onClick={() => setCurrentStep(2)} />
            </div>
            <div style={{ display: currentStep === 2 ? "block" : "none" }}>
              <InsurancePayor form={form} onClick={() => setCurrentStep(3)} />
            </div>
            <div style={{ display: currentStep === 3 ? "block" : "none" }}>
              <Contact form={form} onClick={handleFormSubmit} />
            </div>
          </Form>
        </div>
      </div>
    </MainLayout>
  );
}

