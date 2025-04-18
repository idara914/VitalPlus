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
        <Form.Item label="Coverage Details" name="coverageDetails" style={customStyle}>
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item label="Coverage Status" name="coverageStatus">
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item label="Level Code" name="coverageLevelCode" style={customStyle}>
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item label="Authorization Required" name="authorizationRequired">
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item label="Copay Amount" name="copayAmount" style={customStyle}>
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item label="Deductible Amount" name="deductibleAmount">
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item label="Out of Pocket Limit" name="outOfPocketLimit" style={customStyle}>
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item label="Plan Name" name="planName">
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item label="Eligibility Start Date" name="eligibilityStartDate" style={customStyle}>
          <DatePicker
            placeholder="Enter here"
            style={{
              width: "100%",
              borderRadius: "8px",
              padding: "8px",
            }}
          />
        </Form.Item>
        <Form.Item label="Eligibility End Date" name="eligibilityEndDate">
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
