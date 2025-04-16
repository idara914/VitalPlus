import React from "react";
import { DatePicker, Form, Input } from "antd";
import styles from "./InsurancePayor.module.css";
import Button from "@/app/components/common/Button/Button";

const customStyle = {
  marginRight: "10px",
};
function InsurancePayor({ onClick }) {
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.heading}>Insurance Payor</h1>
      <div className={styles.gridContainer}>
        <Form.Item label="Payor Name" style={customStyle} name="payorName">
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item label="COB Policy" name="cob">
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item label="Career" name="career" style={customStyle}>
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item label="Payor Responsibility" name="payorResponsibility">
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item label="Address" name="address" style={customStyle}>
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item label="State" name="state">
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item label="City" name="city" style={customStyle}>
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item label="Zip Code" name="zipCode">
          <Input placeholder="Enter here" />
        </Form.Item>

        <Form.Item label="EFF Date" name="effDate" style={customStyle}>
          <DatePicker
            placeholder="Enter here"
            style={{
              width: "100%",
              borderRadius: "8px",
              padding: "8px",
            }}
          />
        </Form.Item>
        <Form.Item label="Term Date" name="termDate">
          <DatePicker
            placeholder="Enter here"
            style={{
              width: "100%",
              borderRadius: "8px",
              padding: "8px",
            }}
          />
        </Form.Item>
      </div>
      <Form.Item label="Phone" name="phone">
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

export default InsurancePayor;
