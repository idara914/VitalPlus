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
import dayjs from "dayjs";

const { TextArea } = Input;

const recurrenceOptions = [
  { label: "None", value: "None" },
  { label: "Daily", value: "Daily" },
  { label: "Every Weekday", value: "Weekdays" },
  { label: "Weekly", value: "Weekly" },
  { label: "Bi-Weekly", value: "BiWeekly" },
  { label: "Monthly", value: "Monthly" },
  { label: "Custom Days", value: "CustomDays" },
];

const workflowOptions = [
  { label: "Start of Care", value: "StartOfCare" },
  { label: "Resumption of Care", value: "ResumptionOfCare" },
  { label: "Recertification", value: "Recertification" },
  { label: "Routine Visit", value: "RoutineVisit" },
  { label: "Missed Visit", value: "MissedVisit" },
  { label: "Discharge Planning", value: "DischargePlanning" },
  { label: "End of Episode Review", value: "EndOfEpisode" },
  { label: "Evaluation Required", value: "NeedsEvaluation" },
  { label: "Incident Follow-Up", value: "IncidentFollowUp" },
  { label: "Manual Workflow", value: "Manual" },
  { label: "Ready for Billing", value: "ReadyForBilling" },
  { label: "None", value: "None" },
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
  { label: "QR", value: "qr" },
];

const durationOptions = Array.from({ length: 40 }, (_, i) => {
  const minutes = (i + 1) * 30;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const label = `${hours > 0 ? hours + "h" : ""}${mins > 0 ? " " + mins + "m" : ""}`.trim();
  const value = `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:00`;
  return { label, value };
});

export default function AdvancedVisitForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [members, setMembers] = useState([]);
  const [providers, setProviders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/clinicpatient")
      .then(res => res.json())
      .then(data =>
        setMembers(data.map(p => ({ label: p.name, value: p.id })))
      );

    fetch("/api/serviceprovider")
      .then(res => res.json())
      .then(data =>
        setProviders(data.map(p => ({ label: p.name, value: p.id })))
      );
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const scheduledstart = dayjs(values.date)
        .hour(dayjs(values.time).hour())
        .minute(dayjs(values.time).minute())
        .second(0)
        .toISOString();

      const durationParts = values.duration.split(":");
      const scheduledend = dayjs(scheduledstart)
        .add(Number(durationParts[0]), "hour")
        .add(Number(durationParts[1]), "minute")
        .toISOString();

      const payload = {
        ProviderId: values.serviceProvider,
        patientId: values.memberName,
        visitdate: scheduledstart,
        scheduledstart,
        scheduledend,
        visitduration: values.duration,
        location: values.location,
        notes: values.notes,
        visittype: values.serviceType,
        status: values.visitStatus,
        tasksperformed: {
          cptCodes: [values.cptCodes],
          visitVerification: values.visitVerification,
          workflowTrigger: values.workflowTrigger,
          recurrenceType: values.recurrenceType,
          selectedDays,
        },
        careplanid: values.carePlan,
        companyid: "demo-company-id", // Replace with actual value
      };

      const res = await fetch("/api/visits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save");

      message.success("Visit saved successfully");
      router.push("/visits");
    } catch (err) {
      console.error("Error submitting visit:", err);
      message.error("Failed to save visit");
    } finally {
      setLoading(false);
    }
  };

  const handleDayChange = (day, checked) => {
    const newSelectedDays = checked
      ? [...selectedDays, day]
      : selectedDays.filter(d => d !== day);
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

  return (
    <MainLayout isSignedIn={true}>
      <div style={{ backgroundColor: "#e5e7eb" }}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Advanced Visit Form</h1>
            <Button onClick={() => router.back()} className={styles.backButton}>
              Back
            </Button>
          </div>

          <div className={styles.formContainer}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                visitStatus: "Scheduled",
                recurrenceType: "CustomDays",
              }}
              className={styles.form}
            >
              <Form.Item
                name="memberName"
                label="Member Name"
                rules={[{ required: true }]}
              >
                <SelectField options={members} placeholder="Select member" />
              </Form.Item>

              <Form.Item
                name="serviceProvider"
                label="Service Provider"
                rules={[{ required: true }]}
              >
                <SelectField options={providers} placeholder="Select provider" />
              </Form.Item>

              <div className={styles.row}>
                <Form.Item
                  name="date"
                  label="Date"
                  className={styles.halfWidth}
                  rules={[{ required: true }]}
                >
                  <DatePicker format="DD/MM/YYYY" />
                </Form.Item>

                <Form.Item
                  name="time"
                  label="Time"
                  className={styles.halfWidth}
                  rules={[{ required: true }]}
                >
                  <TimePicker format="HH:mm" />
                </Form.Item>
              </div>

              <div className={styles.row}>
                <Form.Item
                  name="duration"
                  label="Duration"
                  className={styles.halfWidth}
                  rules={[{ required: true }]}
                >
                  <SelectField options={durationOptions} placeholder="Select duration" />
                </Form.Item>

                <Form.Item
                  name="location"
                  label="Location"
                  className={styles.halfWidth}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter location" />
                </Form.Item>
              </div>

              <Form.Item name="serviceType" label="Service Type">
                <Input />
              </Form.Item>

              <Form.Item name="visitStatus" label="Visit Status">
                <Input />
              </Form.Item>

              <Form.Item name="notes" label="Notes">
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item name="recurrenceType" label="Recurrence Type">
                <SelectField options={recurrenceOptions} />
              </Form.Item>

              <Form.Item name="selectedDays" label="Select Custom Days">
                <div className={styles.daysContainer}>
                  {daysOfWeek.map(day => (
                    <div key={day.value}>
                      <Checkbox
                        checked={selectedDays.includes(day.value)}
                        onChange={e =>
                          handleDayChange(day.value, e.target.checked)
                        }
                      >
                        {day.label}
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </Form.Item>

              <Form.Item name="cptCodes" label="Service / CPT Codes">
                <Input placeholder="Enter code (e.g. 99213)" />
              </Form.Item>

              <Form.Item name="carePlan" label="Care Plan">
                <SelectField options={carePlanOptions} />
              </Form.Item>

              <Form.Item name="visitVerification" label="Visit Verification">
                <SelectField options={verificationOptions} />
              </Form.Item>

              <Form.Item name="workflowTrigger" label="Workflow Trigger">
                <SelectField options={workflowOptions} />
              </Form.Item>

              <div className={styles.buttonContainer}>
                <Button onClick={() => router.back()}>Cancel</Button>
                <Button type="primary" htmlType="submit" loading={loading}>
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
