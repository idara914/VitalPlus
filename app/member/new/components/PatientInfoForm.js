import React from "react";
import { DatePicker, Form, Input, Radio } from "antd";
import styles from "./PatientInfoForm.module.css";
import Button from "@/app/components/common/Button/Button";
import SelectField from "@/app/components/common/SelectField/SelectField";

const customStyle = {
  marginRight: "10px",
};

function PatientInfoForm({ onClick, form }) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.gridContainer}>
        <Form.Item
          label="First Name"
          style={customStyle}
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input placeholder="Enter here" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
          ]}
        >
          <Input placeholder="Enter here" />
        </Form.Item>

        <Form.Item label="Time In" name="timeIn" style={customStyle}>
          <Input placeholder="Enter here" />
        </Form.Item>

        <Form.Item label="Time Out" name="timeOut">
          <Input placeholder="Enter here" />
        </Form.Item>

        <Form.Item
          label="Start Of Care Date"
          name="startOfCareDate"
          style={customStyle}
        >
          <DatePicker
            placeholder="Enter here"
            style={{
              width: "100%",
              borderRadius: "8px",
              padding: "8px",
            }}
          />
        </Form.Item>

        <Form.Item label="SSN" name="patientId">
          <Input placeholder="Enter here" />
        </Form.Item>
      </div>

      <Form.Item
        label="Gender"
        name="gender"
        style={{
          textAlign: "left",
        }}
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Radio.Group>
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
        </Radio.Group>
      </Form.Item>

      <div className={styles.gridContainer}>
        <Form.Item
          label="Date of Birth"
          name="dob"
          rules={[
            {
              required: true,
              message: "Please input your date of birth!",
            },
          ]}
          style={customStyle}
        >
          <DatePicker
            placeholder="Enter here"
            style={{
              width: "100%",
              borderRadius: "8px",
              padding: "8px",
            }}
          />
        </Form.Item>

        <Form.Item label="Phone Number" name="phone" style={customStyle}>
          <Input placeholder="Enter here" />
        </Form.Item>

        <Form.Item label="Address" name="address" style={customStyle}>
          <Input placeholder="Enter here" />
        </Form.Item>

        <Form.Item label="Status" name="status" style={customStyle}>
          <SelectField
            options={[]}
            placeholder={"Select here"}
            containerStyle={{
              backgroundColor: "#fff",
            }}
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

      <Form.Item label="Zip Code" name="zipCode">
        <Input placeholder="Enter here" />
      </Form.Item>

      <Button
        onClick={onClick}
        text={"Save"}
        customStyle={{
          width: "100%",
        }}
      />
    </div>
  );
}

export default PatientInfoForm;

