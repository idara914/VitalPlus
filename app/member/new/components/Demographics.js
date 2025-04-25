
"use client";

import React from "react";
import { DatePicker, Form, Input, Radio, Select } from "antd";
import styles from "./Demographics.module.css";
import Button from "@/app/components/common/Button/Button";

const customStyle = {
  marginRight: "10px",
};

const ethnicityOptions = [
  { label: "Hispanic or Latino", value: "hispanic" },
  { label: "Not Hispanic or Latino", value: "not_hispanic" },
  { label: "Puerto Rican", value: "puerto_rican" },
  { label: "Mexican", value: "mexican" },
  { label: "Cuban", value: "cuban" },
  { label: "Dominican", value: "dominican" },
  { label: "Central American", value: "central_american" },
  { label: "South American", value: "south_american" },
  { label: "Other Hispanic or Latino", value: "other_hispanic" },
  { label: "Decline to Answer", value: "decline" },
];

const raceOptions = [
  {
    label: "Asian",
    options: [
      { label: "Asian Indian", value: "asian_indian" },
      { label: "Chinese", value: "chinese" },
      { label: "Filipino", value: "filipino" },
      { label: "Japanese", value: "japanese" },
      { label: "Korean", value: "korean" },
      { label: "Vietnamese", value: "vietnamese" },
      { label: "Other Asian", value: "other_asian" },
    ],
  },
  {
    label: "Black or African American",
    options: [
      { label: "African American", value: "african_american" },
      { label: "African (e.g. Nigerian, Ethiopian)", value: "african" },
      { label: "Caribbean (e.g. Jamaican, Haitian)", value: "caribbean" },
      { label: "Other Black", value: "other_black" },
    ],
  },
  {
    label: "White",
    options: [
      { label: "White (European descent)", value: "white" },
      { label: "Middle Eastern (e.g. Arab, Persian)", value: "middle_eastern" },
      { label: "North African (e.g. Egyptian, Moroccan)", value: "north_african" },
      { label: "Other White", value: "other_white" },
    ],
  },
  {
    label: "American Indian or Alaska Native",
    options: [
      { label: "American Indian", value: "american_indian" },
      { label: "Alaska Native", value: "alaska_native" },
      { label: "Tribal Affiliation", value: "tribal_affiliation" },
    ],
  },
  {
    label: "Native Hawaiian or Other Pacific Islander",
    options: [
      { label: "Native Hawaiian", value: "native_hawaiian" },
      { label: "Guamanian or Chamorro", value: "guamanian" },
      { label: "Samoan", value: "samoan" },
      { label: "Tongan", value: "tongan" },
      { label: "Other Pacific Islander", value: "other_pacific_islander" },
    ],
  },
  {
    label: "Other",
    options: [
      { label: "Multiracial", value: "multiracial" },
      { label: "Other", value: "other" },
      { label: "Decline to Answer", value: "decline" },
    ],
  },
];

function DemographicForm({ onClick, form }) {
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.heading}>Ethnicity</h1>

      <Form.Item
        label="Ethnicity"
        name="ethnicity"
        rules={[{ required: true, message: "Please select ethnicity!" }]}
      >
        <Select
          options={ethnicityOptions}
          placeholder="Select ethnicity"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <h1 className={styles.heading}>Race</h1>

      <Form.Item
        label="Race"
        name="race"
        rules={[{ required: true, message: "Please select race!" }]}
      >
        <Select
          options={raceOptions}
          placeholder="Select race"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Please select gender!" }]}
        style={{ textAlign: "left" }}
      >
        <Radio.Group>
          <Radio value="M">Male</Radio>
          <Radio value="F">Female</Radio>
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
