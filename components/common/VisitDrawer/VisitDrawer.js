"use client";

import { useState } from "react";
import {
  Drawer,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Button,
  Typography,
  Flex,
} from "antd";
import styles from "./VisitDrawer.module.css";
import Link from "next/link";
import SelectField from "../SelectField/SelectField";

const { TextArea } = Input;
const { Title } = Typography;

export default function VisitDrawer({ open, onClose }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log("Form values:", values);
    // Here you would typically send the data to your API
    setTimeout(() => {
      setLoading(false);
      form.resetFields();
      onClose();
    }, 1000);
  };

  const handleSaveAndAddAnother = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      console.log("Form values:", values);
      // Here you would typically send the data to your API
      setTimeout(() => {
        setLoading(false);
        form.resetFields();
        // Don't close the drawer
      }, 1000);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Drawer
      title="Create New Visit"
      width={600}
      closable={false}
      onClose={onClose}
      open={open}
      extra={
        <Button onClick={onClose} type="text">
          ✕
        </Button>
      }
      headerStyle={{
        padding: "16px 24px",
        backgroundColor: "#E5E7EB",
        borderBottom: "1px solid #e9ecef",
        fontWeight: "bold",
      }}
      footerStyle={{
        backgroundColor: "#E5E7EB",
        padding: "15px 10px 15px 10px",
      }}
      footer={
        <Flex justify="space-between" gap={5}>
          <Button size="large" onClick={onClose} className={styles.cancelBtn}>
            Cancel
          </Button>
          <Button
            size="large"
            onClick={handleSaveAndAddAnother}
            disabled={loading}
            className={styles.addBtn}
          >
            Save & Add Another
          </Button>
          <Button
            size="large"
            onClick={form.submit}
            loading={loading}
            className={styles.saveBtn}
          >
            Save
          </Button>
        </Flex>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          visitStatus: "Scheduled",
        }}
      >
        <Form.Item
          name="memberName"
          label="Member Name"
          rules={[{ required: true, message: "Please enter member name" }]}
        >
          <Input placeholder="Member Name" />
        </Form.Item>

        <Form.Item
          name="serviceProvider"
          label="Service Provider"
          rules={[{ required: true, message: "Please select a provider" }]}
        >
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

        <div className={styles.formRow}>
          <Form.Item
            name="date"
            label="Date"
            className={styles.halfWidth}
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              placeholder="dd/mm/yyyy"
              className={styles.fullWidth}
            />
          </Form.Item>

          <Form.Item
            name="time"
            label="Time"
            className={styles.halfWidth}
            rules={[{ required: true, message: "Please select time" }]}
          >
            <TimePicker
              format="HH:mm"
              placeholder="--:-- --"
              className={styles.fullWidth}
            />
          </Form.Item>
        </div>

        <Form.Item
          name="duration"
          label="Duration"
          rules={[{ required: true, message: "Please select duration" }]}
        >
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

        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: "Please enter location" }]}
        >
          <Input placeholder="Enter location" />
        </Form.Item>

        <Form.Item
          name="serviceType"
          label="Service Type"
          rules={[{ required: true, message: "Please select service type" }]}
        >
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

        <Form.Item
          name="visitStatus"
          label="Visit Status"
          rules={[{ required: true, message: "Please select visit status" }]}
        >
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

        <Form.Item name="notes" label="Notes">
          <TextArea rows={4} placeholder="Enter any notes..." />
        </Form.Item>

        <Form.Item>
          <Link href="/visit/new">
            <Button type="default" className={styles.advanceBtn}>
              Advanced Options
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
