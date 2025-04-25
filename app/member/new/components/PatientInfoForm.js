"use client";

import React from "react";
import { DatePicker, Form, Input, Radio, Select } from "antd"; // Use native Select from Ant Design
import styles from "./PatientInfoForm.module.css";
import Button from "@/app/components/common/Button/Button";

const customStyle = { marginRight: "10px" };

const stateOptions = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "American Samoa", value: "AS" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "District of Columbia", value: "DC" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Guam", value: "GU" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Northern Mariana Islands", value: "MP" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Puerto Rico", value: "PR" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virgin Islands", value: "VI" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" }
];

function PatientInfoForm({ onClick, form }) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.gridContainer}>
        <Form.Item
          label="First Name"
          style={customStyle}
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input placeholder="Enter here" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input placeholder="Enter here" />
        </Form.Item>

        <Form.Item label="Middle Name" name="middleName" style={customStyle}>
          <Input placeholder="Enter here" />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input placeholder="Enter here" />
        </Form.Item>

        <Form.Item
          label="Start Of Care Date"
          name="startOfCareDate"
          style={customStyle}
        >
          <DatePicker
            placeholder="Enter here"
            style={{ width: "100%", borderRadius: "8px", padding: "8px" }}
          />
        </Form.Item>

        <Form.Item label="SSN" name="ZZno">
          <Input placeholder="Enter here" />
        </Form.Item>
      </div>

      <Form.Item
        label="Gender"
        name="gender"
        style={{ textAlign: "left" }}
        rules={[{ required: true, message: "Please select gender!" }]}
      >
        <Radio.Group>
          <Radio value="M">Male</Radio>
          <Radio value="F">Female</Radio>
        </Radio.Group>
      </Form.Item>

      <div className={styles.gridContainer}>
        <Form.Item
          label="Date of Birth"
          name="dob"
          rules={[{ required: true, message: "Please input your date of birth!" }]}
          style={customStyle}
        >
          <DatePicker
            placeholder="Enter here"
            style={{ width: "100%", borderRadius: "8px", padding: "8px" }}
          />
        </Form.Item>

        <Form.Item label="Phone Number" name="phone" style={customStyle}>
          <Input placeholder="Enter here" />
        </Form.Item>

        <Form.Item label="Address" name="address" style={customStyle}>
          <Input placeholder="Enter here" />
        </Form.Item>

        <Form.Item label="State" name="state" style={customStyle}>
          <Select
            options={stateOptions}
            placeholder="Select here"
            style={{
              width: "100%",
              borderRadius: "8px",
              padding: "2px",
              height: "39px",
              textAlign: "left",
              backgroundColor: "#fff",
            }}
          />
        </Form.Item>
      </div>

      <div className={styles.gridContainer}>
        <Form.Item label="Zip Code" name="zipCode" style={customStyle}>
          <Input placeholder="Enter here" />
        </Form.Item>

        <Form.Item label="City" name="city">
          <Input placeholder="Enter here" />
        </Form.Item>
      </div>

      <Button
        onClick={onClick}
        text="Save"
        customStyle={{ width: "100%" }}
      />
    </div>
  );
}

export default PatientInfoForm;

