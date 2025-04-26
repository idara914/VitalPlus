"use client";

import React from "react";
import { Form, Input } from "antd";
import styles from "./Contact.module.css";
import Button from "@/app/components/common/Button/Button";

const customStyle = {
  marginRight: "10px",
};

function Contact({ form, onClick }) {
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

        <Form.Item
          label="Relationship"
          name="relationship"
          style={customStyle}
        >
          <Input placeholder="Enter here" />
        </Form.Item>

        <Form.Item
          label="Contact"
          name="ContactNumber2"
          style={customStyle}
        >
          <Input placeholder="Enter here" />
        </Form.Item>
      </div>

      <Form.Item>
        <Button
          htmltype="submit"
          onClick={onClick}
          text="Save"
          customStyle={{
            width: "100%",
          }}
        />
      </Form.Item>
    </div>
  );
}

export default Contact;
