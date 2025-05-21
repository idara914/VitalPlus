"use client";

import { useState } from "react";
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
  const router = useRouter();

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log("Form values:", values);
    setTimeout(() => {
      setLoading(false);
      message.success("Visit saved successfully");
    }, 1000);
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
              initialValues={{
                visitStatus: "Scheduled",
                recurrenceType: "Custom Days",
              }}
              className={styles.form}
            >
              <Form.Item
                name="memberName"
                label="Member Name"
                rules={[{ required: true, message: "Please enter member name" }]}
              >
                <Input placeholder="Member Name" className={styles.input} />
              </Form.Item>

              <Form.Item
                name="serviceProvider"
                label="Service Provider"
                rules={[{ required: true, message: "Please select a provider" }]}
              >
                <SelectField
                  options={[]}
                  placeholder={"Select here"}
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
                <Form.Item
                  name="date"
                  label="Date"
                  className={styles.halfWidth}
                  rules={[{ required: true, message: "Please select date" }]}
                >
                  <DatePicker
                    format="DD/MM/YYYY"
                    placeholder="dd/mm/yyyy"
                    className={styles.datePicker}
                  />
                </Form.Item>

                <Form.Item
                  name="time"
                  label="Time"
                  className={styles.halfWidth}
                  rules={[{ required: true, message: "Please select time" }]}
                >
                  <TimePicker
                    format="HH:mm"
                    placeholder="--:-- --"
                    className={styles.timePicker}
                  />
                </Form.Item>
              </div>

              <div className={styles.row}>
                <Form.Item
  name="duration"
  label="Duration"
  className={styles.halfWidth}
  rules={[{ required: true, message: "Please select duration" }]}
>
  <SelectField
    options={Array.from({ length: 37 }, (_, i) => {
      const totalMinutes = (i + 4) * 30;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const label = `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
      return { label, value: label };
    })}
    placeholder={"Select here"}
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
                <Form.Item
                  name="location"
                  label="Location"
                  className={styles.halfWidth}
                  rules={[{ required: true, message: "Please enter location" }]}
                >
                  <Input placeholder="Enter location" className={styles.input} />
                </Form.Item>
              </div>

              <div className={styles.row}>
                <Form.Item
                  name="serviceType"
                  label="Service Type"
                  className={styles.halfWidth}
                  rules={[{ required: true, message: "Please select service type" }]}
                >
                  <SelectField
                    options={[]}
                    placeholder={"Select here"}
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

                <Form.Item
                  name="visitStatus"
                  label="Visit Status"
                  className={styles.halfWidth}
                  rules={[{ required: true, message: "Please select visit status" }]}
                >
                  <SelectField
                    options={[]}
                    placeholder={"Select here"}
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
              </div>

              <Form.Item name="notes" label="Notes">
                <TextArea
                  rows={4}
                  placeholder="Enter any notes..."
                  className={styles.textarea}
                />
              </Form.Item>

              <Form.Item name="recurrenceType" label="Recurrence Type">
  <SelectField
    options={[
      { label: "None", value: "None" },
      { label: "Daily", value: "Daily" },
      { label: "Every Weekday", value: "Every Weekday" },
      { label: "Weekly", value: "Weekly" },
      { label: "Bi-Weekly", value: "Bi-Weekly" },
      { label: "Monthly", value: "Monthly" },
      { label: "Custom days", value: "Custom days" },
    ]}
    placeholder={"Select here"}
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

              <Form.Item name="attachments" label="Attachments">
                <div className={styles.fileUploadContainer}>
                  <label
                    htmlFor="file-upload"
                    className={styles.chooseFileButton}
                  >
                    Choose file
                  </label>
                  <div className={styles.fileNameDisplay}>No file chosen</div>
                  <input
                    id="file-upload"
                    type="file"
                    className={styles.hiddenFileInput}
                    onChange={(e) => {
                      const fileName = e.target.files?.[0]?.name;
                      if (fileName) {
                        const fileDisplay = document.querySelector(
                          `.${styles.fileNameDisplay}`
                        );
                        if (fileDisplay) fileDisplay.textContent = fileName;
                      }
                    }}
                  />
                </div>
              </Form.Item>

              <Form.Item name="cptCodes" label="Service / CPT Codes">
                <Input
                  placeholder="Enter code (e.g. 99213)"
                  className={styles.input}
                />
              </Form.Item>

            <Form.Item name="carePlan" label="Care Plan">
  <SelectField
    options={[
      { label: "Hospice", value: "Hospice" },
      { label: "Elderly", value: "Elderly" },
      { label: "Disabled", value: "Disabled" },
    ]}
    placeholder={"Select here"}
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
    options={[
      { label: "Mobile", value: "Mobile" },
      { label: "Call", value: "Call" },
      { label: "QR", value: "QR" },
    ]}
    placeholder={"Select here"}
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
    options={[
      { label: "Start of Care", value: "Start of Care" },
      { label: "Resumption of Care", value: "Resumption of Care" },
      { label: "Recertification", value: "Recertification" },
      { label: "Routine Visit", value: "Routine Visit" },
      { label: "Missed Visit", value: "Missed Visit" },
      { label: "Discharge Planning", value: "Discharge Planning" },
      { label: "End of Episode Review", value: "End of Episode Review" },
      { label: "Evaluation Required", value: "Evaluation Required" },
      { label: "Incident Follow-Up", value: "Incident Follow-Up" },
      { label: "Ready for Billing", value: "Ready for Billing" },
      { label: "None", value: "None" },
    ]}
    placeholder={"Select here"}
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

