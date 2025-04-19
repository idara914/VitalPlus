"use client";

import React, { useEffect, useState } from "react";
import { DatePicker, Form, Input, Select, message } from "antd";
import styles from "./InsurancePayor.module.css";
import Button from "@/app/components/common/Button/Button";
import axios from "axios";

const customStyle = {
  marginRight: "10px",
};

function InsurancePayor({ onClick, form }) {
  const [insuranceOptions, setInsuranceOptions] = useState([]);

  useEffect(() => {
    const fetchInsuranceCompanies = async () => {
      try {
        const res = await axios.get("/api/insurance-companies");
        setInsuranceOptions(res.data || []);
      } catch (err) {
        console.error("❌ Failed to load insurance companies:", err);
      }
    };

    fetchInsuranceCompanies();
  }, []);

  const handleCompanySelect = (companyName) => {
    const selected = insuranceOptions.find(c => c.name === companyName);
    if (selected) {
      form.setFieldsValue({ payerId: selected.payerId });
    }
  };

  const handleVerify = async () => {
    if (!form) return;

    const values = form.getFieldsValue();
    console.log("🔍 Submitting for verification:", values);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Token not found.");
        return;
      }

      const res = await axios.post("/api/verify-insurance", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

        message.success("Insurance verified.");
      } else {
        message.warning("No benefits found for this member.");
      }
    } catch (err) {
      console.error("❌ Verification failed:", err.response?.data || err);
      message.error("Verification failed.");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.heading}>Insurance Payor</h1>
      <div className={styles.gridContainer}>
        <Form.Item label="Payor Name" name="payorName" style={customStyle}>
          <Select
            showSearch
            placeholder="Select insurance company"
            options={insuranceOptions.map((item) => ({
              label: item.name,
              value: item.name,
            }))}
            onSelect={handleCompanySelect}
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>

        {/* Hidden payerId sent with the form */}
        <Form.Item name="payerId" hidden>
          <Input />
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
          <DatePicker style={{ width: "100%", borderRadius: "8px", padding: "8px" }} />
        </Form.Item>
        <Form.Item label="Coverage End Date" name="coverageEndDate">
          <DatePicker style={{ width: "100%", borderRadius: "8px", padding: "8px" }} />
        </Form.Item>
        <Form.Item label="Eligibility Start Date" name="eligibilityStartDate" style={customStyle}>
          <DatePicker style={{ width: "100%", borderRadius: "8px", padding: "8px" }} />
        </Form.Item>
        <Form.Item label="Eligibility End Date" name="eligibilityEndDate">
          <DatePicker style={{ width: "100%", borderRadius: "8px", padding: "8px" }} />
        </Form.Item>
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
        <Form.Item label="Phone" style={{ marginBottom: "24px" }}>
  <div style={{ display: "flex", gap: "10px" }}>
    <Form.Item name="phone" noStyle>
      <Input placeholder="Enter here" style={{ height: "40px", borderRadius: "8px" }} />
    </Form.Item>
    <Button
      text="Verify"
      onClick={handleVerify}
      customStyle={{
        height: "40px",
        padding: "0 20px",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
      }}
    />
  </div>
</Form.Item>

  );
}

export default InsurancePayor;
