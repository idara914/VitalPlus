import React from "react"; 
import { DatePicker, Form, Input } from "antd";
import styles from "./InsurancePayor.module.css";
import Button from "@/app/components/common/Button/Button";
import axios from "axios";
import { useFormInstance } from "antd/es/form/context";

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
        <Form.Item label="Coverage Start Date" name="coverageStartDate" style={customStyle}>
          <DatePicker
            placeholder="Enter here"
            style={{
              width: "100%",
              borderRadius: "8px",
              padding: "8px",
            }}
          />
        </Form.Item>
        <Form.Item label="Coverage End Date" name="coverageEndDate">
          <DatePicker
            placeholder="Enter here"
            style={{
              width: "100%",
              borderRadius: "8px",
              padding: "8px",
            }}
          />
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

      <div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
        <Form.Item label="Phone" name="phone" style={{ flex: 1 }}>
          <Input placeholder="Enter here" />
        </Form.Item>
       const form = useFormInstance();

<Button
  text="Verify"
  onClick={async () => {
    const values = form.getFieldsValue();
    try {
      const res = await axios.post("/api/verify-insurance", values);
      const plan = res.data.plans?.[0];

      if (plan) {
        form.setFieldsValue({
          coverageStartDate: plan.coverageStartDate,
          coverageEndDate: plan.coverageEndDate,
          coverageDetails: plan.description,
          coverageStatus: plan.status,
          coverageLevelCode: plan.benefits?.[0]?.levelCode,
          authorizationRequired: plan.benefits?.[0]?.authorizationRequired,
          copayAmount: plan.benefits?.[0]?.copaymentAmount,
          deductibleAmount: plan.benefits?.[0]?.deductibleAmount,
          outOfPocketLimit: plan.benefits?.[0]?.outOfPocketLimit,
          planName: plan.planName,
          eligibilityStartDate: plan.eligibilityStartDate,
          eligibilityEndDate: plan.eligibilityEndDate,
        });
      }
    } catch (err) {
      console.error("Error verifying coverage", err);
    }
  }}
  customStyle={{
    height: "40px",
    marginBottom: "10px",
  }}
/>


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

