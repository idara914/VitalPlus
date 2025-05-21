"use client";

import { useEffect, useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  Button,
  Checkbox,
  Upload,
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
    const fetchData = async () => {
      try {
        const [patientRes, providerRes] = await Promise.all([
          fetch("/api/clinicpatient"),
          fetch("/api/serviceprovider"),
        ]);
        const patientData = await patientRes.json();
        const providerData = await providerRes.json();
        setPatients(
          patientData.map((p) => ({
            label: `${p.FirstName} ${p.LastName}`,
            value: p.Id,
          }))
        );
        setProviders(
          providerData.map((s) => ({
            label: `${s.FirstName} ${s.LastName}`,
            value: s.Id,
          }))
        );
      } catch (error) {
        console.error("Error loading dropdown data", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to save visit");
      }

      message.success("Visit saved successfully");
      router.back();
    } catch (error) {
      console.error("Submit error", error);
      message.error("Something went wrong while saving");
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

  const durationOptions = Array.from({ length: 40 }, (_, i) => {
    const minutes = (i + 1) * 30;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const label = `${hours ? hours + "h" : ""} ${mins ? mins + "m" : ""}`.trim();
    return { label, value: minutes };
  });

  const recurrenceOptions = [
    { label: "None", value: "None" },
    { label: "Daily", value: "Daily" },
    { label: "Every Weekday", value: "Every Weekday" },
    { label: "Weekly", value: "Weekly" },
    { label: "Bi-Weekly", value: "Bi-Weekly" },
    { label: "Monthly", value: "Monthly" },
    { label: "Custom days", value: "Custom days" },
  ];

  const carePlanOptions = [
    { label: "Terminal Care", value: "terminal care" },
    { label: "Hospice", value: "hospice" },
    { label: "Elderly", value: "elderly" },
    { label: "Disabled", value: "disabled" },
  ];

  const verificationOptions = [
    { label: "Mobile", value: "mobile" },
    { label: "Call", value: "call" },
    { label: "QR", value: "QR" },
  ];

  const workflowOptions = [
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
  ].map((item) => ({ label: item, value: item }));

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
              initialValues={{ visitStatus: "Scheduled" }}
              className={styles.form}
            >
              <Form.Item name="memberName" label="Member Name" rules={[{ required: true }]}>
                <SelectField
                  options={patients}
                  placeholder="Select patient"
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
                  placeholder="Select provider"
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

              <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                <DatePicker className={styles.datePicker} format="DD/MM/YYYY" />
              </Form.Item>

              <Form.Item name="time" label="Time" rules={[{ required: true }]}>
                <TimePicker className={styles.timePicker} format="HH:mm" />
              </Form.Item>

              <Form.Item name="duration" label="Duration" rules={[{ required: true }]}>
                <SelectField
                  options={durationOptions}
                  placeholder="Select duration"
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

              <Form.Item name="location" label="Location" rules={[{ required: true }]}>
                <Input placeholder="Enter location" className={styles.input} />
              </Form.Item>

              <Form.Item name="carePlan" label="Care Plan">
                <SelectField
                  options={carePlanOptions}
                  placeholder="Select care plan"
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
                  options={verificationOptions}
                  placeholder="Select verification method"
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
                  options={workflowOptions}
                  placeholder="Select workflow trigger"
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

              <Form.Item name="recurrenceType" label="Recurrence Type">
                <SelectField
                  options={recurrenceOptions}
                  placeholder="Select recurrence type"
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
                    <Checkbox
                      key={day.value}
                      checked={selectedDays.includes(day.value)}
                      onChange={(e) => handleDayChange(day.value, e.target.checked)}
                    >
                      {day.label}
                    </Checkbox>
                  ))}
                </div>
              </Form.Item>

              <Form.Item name="notes" label="Notes">
                <TextArea rows={4} placeholder="Enter any notes..." className={styles.textarea} />
              </Form.Item>

              <div className={styles.buttonContainer}>
                <Button onClick={handleBack} className={styles.cancelButton}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" loading={loading} className={styles.saveButton}>
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
