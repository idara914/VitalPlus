import React from "react";
import { Form, Input } from "antd";
import { useFormInstance } from "antd/es/form/context";
import axios from "axios";
import styles from "./Contact.module.css";
import Button from "@/app/components/common/Button/Button";

const customStyle = {
  marginRight: "10px",
};

function Contact() {
  const form = useFormInstance();

  const handleSave = async () => {
    const values = form.getFieldsValue(true);
    try {
      await axios.post("/api/save-patient", values);
      alert("Saved successfully");
    } catch (e) {
      console.error("Failed to save", e);
      alert("Failed to save");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.gridContainer}>
        <Form.Item
          label="Emergency Contact Name"
          style={customStyle}
          name="emergencyContactName"
        >
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item label="Relationship" name="relationship">
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item label="Contact" name="contact" style={customStyle}>
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input placeholder="Enter here" />
        </Form.Item>

        <Form.Item
          label="Secondary Physician"
          name="secondaryPhysician"
          style={customStyle}
        >
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item
          label="Secondary Physician Number"
          name="secondaryPhysicianNumber"
        >
          <Input placeholder="Enter here" />
        </Form.Item>

        <Form.Item label="State" name="state" style={customStyle}>
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item label="City" name="city">
          <Input placeholder="Enter here" />
        </Form.Item>

        <Form.Item label="Zip Code" name="zip" style={customStyle}>
          <Input placeholder="Enter here" />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input placeholder="Enter here" />
        </Form.Item>
      </div>

      <Form.Item>
        <Button
          htmltype="submit"
          onClick={handleSave}
          text={"Save"}
          customStyle={{
            width: "100%",
          }}
        />
      </Form.Item>
    </div>
  );
}

export default Contact;

