"use client";

import { useEffect, useState } from "react";
import { Form, Input, Button, AutoComplete, Radio, DatePicker } from "antd";
import axios from "axios";
import styles from "../../assets/member.module.css";

export default function InsurancePayor({ onClick }) {
  const [form] = Form.useForm();
  const [insuranceCompanies, setInsuranceCompanies] = useState([]);
  const [hasInsurance, setHasInsurance] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const res = await axios.get("/api/insurance-companies");
        setInsuranceCompanies(res.data);
      } catch (error) {
        console.error("Error fetching insurance companies:", error);
      }
    }
    fetchCompanies();
  }, []);

  const handleVerify = async () => {
    try {
      setVerifying(true);
      const values = await form.validateFields();
      const formattedValues = {
        ...values,
        patientBirthDate: values.patientBirthDate.format("YYYY-MM-DD")
      };
      const response = await axios.post("/api/verify-insurance", formattedValues, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setVerificationResult(response.data);
    } catch (error) {
      console.error("Verification failed:", error);
      setVerificationResult({ error: "Unable to verify insurance." });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div>
      <Form layout="vertical" form={form} className={styles.formGroup}>
        <Form.Item label="Do they have insurance?" name="hasInsurance">
          <Radio.Group onChange={(e) => setHasInsurance(e.target.value)}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>

        {hasInsurance && (
          <>
            <Form.Item
              label="Insurance Company"
              name="insuranceCompanyName"
              rules={[{ required: true, message: "Please enter insurance company name" }]}
            >
              <AutoComplete
                options={insuranceCompanies.map((c) => ({ value: c.name }))}
                placeholder="Start typing..."
                filterOption={(inputValue, option) =>
                  option?.value.toLowerCase().includes(inputValue.toLowerCase())
                }
              />
            </Form.Item>

            <Form.Item
              label="Member ID"
              name="memberId"
              rules={[{ required: true, message: "Please enter Member ID" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Patient First Name"
              name="patientFirstName"
              rules={[{ required: true, message: "Please enter first name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Patient Last Name"
              name="patientLastName"
              rules={[{ required: true, message: "Please enter last name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Patient Date of Birth"
              name="patientBirthDate"
              rules={[{ required: true, message: "Please select birth date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Button type="primary" onClick={handleVerify} loading={verifying}>
              Verify
            </Button>

            {verificationResult && (
              <div className={styles.result}>
                {verificationResult.error ? (
                  <p style={{ color: "red" }}>{verificationResult.error}</p>
                ) : (
                  <pre>{JSON.stringify(verificationResult, null, 2)}</pre>
                )}
              </div>
            )}
          </>
        )}

        <Form.Item>
          <Button type="primary" onClick={onClick} className={styles.nextBtn}>
            Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
