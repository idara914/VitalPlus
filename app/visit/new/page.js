"use client";

import { useEffect, useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  Button,
  Checkbox,
  message,
} from "antd";

import { useRouter } from "next/navigation";
import styles from "./advanceForm.module.css";
import MainLayout from "@/app/components/layouts/MainLayout";
import SelectField from "@/app/components/common/SelectField/SelectField";

const { TextArea } = Input;

export default function AdvancedVisitForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [patients, setPatients] = useState([]);
  const [providers, setProviders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/clinicpatient")
      .then((res) => res.json())
      .then((data) =>
        setPatients(data.map((p) => ({ label: p.FirstName + " " + p.LastName, value: p.Id })))
      );

    fetch("/api/serviceprovider")
      .then((res) => res.json())
      .then((data) =>
        setProviders(data.map((sp) => ({ label: sp.FirstName + " " + sp.LastName, value: sp.Id })))
      );
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await fetch("/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to save visit");

      message.success("Visit saved successfully");
      form.resetFields();
      router.back();
    } catch (error) {
      message.error("Error saving visit");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleDayChange = (day, checked) => {
    const newSelectedDays = checked
      ? [...selectedDays, day]
      : selectedDays.filter((d) => d !== day);

    setSelectedDays(newSelectedDays);
    form.setFieldsValue({ selectedDays: newSelectedDays });
  };

  const daysOfWeek = [
    { label: "Monday", value: "monday" },
    { label: "Tuesday", value: "tuesday" },
    { label: "Wednesday", value: "wednesday" },
    { label: "Thursday", value: "thursday" },
    { label: "Friday", value: "friday" },
    { label: "Saturday", value: "saturday" },
    { label: "Sunday", value: "sunday" },
  ];

  const visitVerificationOptions = [
    { label: "Mobile", value: "mobile" },
    { label: "Call", value: "call" },
    { label: "QR", value: "qr" },
  ];

  const carePlanOptions = [
    { label: "Terminal Care", value: "terminal care" },
    { label: "Hospice", value: "hospice" },
    { label: "Elderly", value: "elderly" },
    { label: "Disabled", value: "disabled" },
  ];

  const workflowTriggerOptions = [
    "Start of Care",
    "Resumption of Care",
    "Recertification",
    "Routine Visit",
    "Missed Visit",
    "Discharge Planning",
    "End of Episode Review",
    "Evaluation Required",
    "Incident Follow-Up",
    "Ready for Billing",
    "None",
  ].map((label) => ({ label, value: label }));

  const recurrenceOptions = [
    "None",
    "Daily",
    "Every Weekday",
    "Weekly",
    "Bi-Weekly",
    "Monthly",
    "Custom days",
  ].map((label) => ({ label, value: label }));

  const durationOptions = Array.from({ length: 40 }, (_, i) => {
    const hours = Math.floor(i * 30 / 60);
    const minutes = (i * 30) % 60;
    const label = `${hours > 0 ? `${hours}h` : ""} ${minutes > 0 ? `${minutes}m` : ""}`.trim();
    return { label, value: `${hours}:${minutes.toString().padStart(2, "0")}` };
  });

  return (
    <MainLayout isSignedIn={true}>
      <div style={{ backgroundColor: "#e5e7eb" }}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Advanced Visit Form</h1>
            <Button onClick={handleBack} className={styles.backButton}>
              Back
            </Button>
          </div>

          <div className={styles.formContainer}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className={styles.form}
            >
              <Form.Item name="memberName" label="Member Name" rules={[{ required: true }]}>
                <SelectField
                  options={patients}
                  placeholder="Select here"
                  containerStyle={{ backgroundColor: "#fff" }}
                  customStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #d0d3d7",
                    padding: "2px",
                    height: "39px",
                    textAlign: "left",
                  }}
                />
              </Form.Item>

              <Form.Item name="serviceProvider" label="Service Provider" rules={[{ required: true }]}>
                <SelectField
                  options={providers}
                  placeholder="Select here"
                  containerStyle={{ backgroundColor: "#fff" }}
                  customStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #d0d3d7",
                    padding: "2px",
                    height: "39px",
                    textAlign: "left",
                  }}
                />
              </Form.Item>

              <div className={styles.row}>
                <Form.Item name="date" label="Date" className={styles.halfWidth} rules={[{ required: true }]}>
                  <DatePicker format="DD/MM/YYYY" className={styles.datePicker} />
                </Form.Item>
                <Form.Item name="time" label="Time" className={styles.halfWidth} rules={[{ required: true }]}>
                  <TimePicker format="HH:mm" className={styles.timePicker} />
                </Form.Item>
              </div>

              <div className={styles.row}>
                <Form.Item name="duration" label="Duration" className={styles.halfWidth} rules={[{ required: true }]}>
                  <SelectField
                    options={durationOptions}
                    placeholder="Select here"
                    containerStyle={{ backgroundColor: "#fff" }}
                    customStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #d0d3d7",
                      padding: "2px",
                      height: "39px",
                      textAlign: "left",
                    }}
                  />
                </Form.Item>
                <Form.Item name="location" label="Location" className={styles.halfWidth} rules={[{ required: true }]}>
                  <Input placeholder="Enter location" className={styles.input} />
                </Form.Item>
              </div>

              <Form.Item name="recurrenceType" label="Recurrence Type">
                <SelectField
                  options={recurrenceOptions}
                  placeholder="Select here"
                  containerStyle={{ backgroundColor: "#fff" }}
                  customStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #d0d3d7",
                    padding: "2px",
                    height: "39px",
                    textAlign: "left",
                  }}
                />
              </Form.Item>

              <Form.Item name="selectedDays" label="Select Custom Days">
                <div className={styles.daysContainer}>
                  {daysOfWeek.map((day) => (
                    <div key={day.value} className={styles.dayCheckbox}>
                      <Checkbox
                        checked={selectedDays.includes(day.value)}
                        onChange={(e) =>
                          handleDayChange(day.value, e.target.checked)
                        }
                      >
                        {day.label}
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </Form.Item>

              <Form.Item name="notes" label="Notes">
                <TextArea rows={4} placeholder="Enter any notes..." className={styles.textarea} />
              </Form.Item>

              <Form.Item name="cptCodes" label="Service / CPT Codes">
                <Input placeholder="Enter code (e.g. 99213)" className={styles.input} />
              </Form.Item>

              <Form.Item name="carePlan" label="Care Plan">
                <SelectField
                  options={carePlanOptions}
                  placeholder="Select here"
                  containerStyle={{ backgroundColor: "#fff" }}
                  customStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #d0d3d7",
                    padding: "2px",
                    height: "39px",
                    textAlign: "left",
                  }}
                />
              </Form.Item>

              <Form.Item name="visitVerification" label="Visit Verification">
                <SelectField
                  options={visitVerificationOptions}
                  placeholder="Select here"
                  containerStyle={{ backgroundColor: "#fff" }}
                  customStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #d0d3d7",
                    padding: "2px",
                    height: "39px",
                    textAlign: "left",
                  }}
                />
              </Form.Item>

              <Form.Item name="workflowTrigger" label="Workflow Trigger">
                <SelectField
                  options={workflowTriggerOptions}
                  placeholder="Select here"
                  containerStyle={{ backgroundColor: "#fff" }}
                  customStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #d0d3d7",
                    padding: "2px",
                    height: "39px",
                    textAlign: "left",
                  }}
                />
              </Form.Item>

              <div className={styles.buttonContainer}>
                <Button onClick={handleBack} className={styles.cancelButton}>
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className={styles.saveButton}
                >
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
