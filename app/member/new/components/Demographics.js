import React from "react";
import { Checkbox, DatePicker, Form, Input, Radio } from "antd";
import styles from "./Demographics.module.css";
import Button from "@/app/components/common/Button/Button";

const customStyle = {
  marginRight: "10px",
};

function DemographicForm({ onClick, form }) {
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.heading}>Ethnicity</h1>

      <Form.Item name="ethicity">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
            textAlign: "left",
          }}
        >
          <Checkbox>No, not of Hispanic, Latino or Spanish</Checkbox>
          <Checkbox>Yes, Mexican, Mexican American</Checkbox>
          <Checkbox>Yes, Cuban</Checkbox>
          <Checkbox>Other Hispanic, Latino or Spanish origin</Checkbox>
        </div>
      </Form.Item>

      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Please select gender!" }]}
        style={{ textAlign: "left" }}
      >
        <Radio.Group>
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
        </Radio.Group>
      </Form.Item>

      <div className={styles.gridContainer}>
        <Form.Item
          label="Language Spoken"
          style={customStyle}
          name="languageSpoken"
        >
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item label="Language Written" name="languageWritten">
          <Input placeholder="Enter here" />
        </Form.Item>
      </div>

      <Form.Item label="Date Of Birth" name="dob">
        <DatePicker
          placeholder="Enter here"
          style={{
            width: "100%",
            borderRadius: "8px",
            padding: "8px",
          }}
        />
      </Form.Item>

      <h1 className={styles.heading}>Patient Preference</h1>
      <Form.Item
        name="patientPreference"
        style={{ textAlign: "left" }}
      >
        <Radio.Group>
          <Radio value="Family">Family</Radio>
          <Radio value="Friend">Friend</Radio>
          <Radio value="Professional">Professional</Radio>
        </Radio.Group>
      </Form.Item>

      <Button
        onClick={onClick}
        text="Save"
        customStyle={{
          width: "100%",
        }}
      />
    </div>
  );
}

export default DemographicForm;


