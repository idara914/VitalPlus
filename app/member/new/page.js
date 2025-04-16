"use client";

import { useState } from "react";
import MainLayout from "@/app/components/layouts/MainLayout";
import styles from "@/app/assets/member.module.css";
import Stepper from "@/app/components/common/Stepper/Stepper";
import { Form } from "antd";
import PatientInfoForm from "./components/PatientInfoForm";
import DemographicForm from "./components/Demographics";
import InsurancePayor from "./components/InsurancePayor";
import Contact from "./components/Contact";

export default function NewMemberForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const handleFormSubmit = async (e) => {
    try {
      const values = await form.validateFields();
      console.log("Form values:", values);
      // Handle form submission logic here
      // For example, send the data to your API or perform any other actions
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };
  return (
    <MainLayout isSignedIn={true}>
      <div className={styles.container}>
        {currentStep === 0 && (
          <h1 className={styles.heading}>Patient Information</h1>
        )}
        {currentStep === 1 && (
          <h1 className={styles.heading}>Patient Demographics</h1>
        )}{" "}
        {currentStep === 2 && (
          <h1 className={styles.heading}>Insurance Payor</h1>
        )}
        {currentStep === 3 && (
          <h1 className={styles.heading}>Emergency Contact</h1>
        )}
        <Stepper
          steps={[
            {
              title: "Patient Info",
            },
            {
              title: "Demographics",
            },
            {
              title: "Insurance Payor",
            },
            {
              title: "Contact",
            },
          ]}
          currentStep={currentStep}
        />
        <div className={styles.containerCard}>
          <Form layout="vertical" form={form}>
            {currentStep === 0 && (
              <PatientInfoForm onClick={() => setCurrentStep(1)} />
            )}
            {currentStep === 1 && (
              <DemographicForm onClick={() => setCurrentStep(2)} />
            )}
            {currentStep === 2 && (
              <InsurancePayor onClick={() => setCurrentStep(3)} />
            )}

            {currentStep === 3 && (
              <Contact onClick={() => handleFormSubmit()} />
            )}
          </Form>
        </div>
      </div>
    </MainLayout>
  );
}
