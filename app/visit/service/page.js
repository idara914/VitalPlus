"use client";

import { useState } from "react";
import {
  Table,
  Button,
  Input,
  DatePicker,
  Select,
  Form,
  Modal,
  Flex,
} from "antd";
import {
  DownCircleOutlined,
  SearchOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import styles from "./service.module.css";
import MainLayout from "@/app/components/layouts/MainLayout";
import SelectField from "@/app/components/common/SelectField/SelectField";
import CustomModal from "@/app/components/common/Modal/CustomModal";
import { ChevronDown, ChevronUp } from "lucide-react";

const { TextArea } = Input;

export default function ServiceAuthorizationTable() {
  const [form] = Form.useForm();
  const [templateForm] = Form.useForm();
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  const data = [
    {
      key: "1",
      firstName: "Ali",
      lastName: "Khan",
      dob: "1985-05-10",
      memberId: "12345678",
      insurance: "ABC Health",
      fullName: "Ali Khan",
      ssn: "12345678",
      payerName: "ABC Health",
      payerId: "12345678",
    },
    {
      key: "2",
      firstName: "Ali",
      lastName: "Ahmed",
      dob: "1995-08-17",
      memberId: "12345678",
      insurance: "DEF Health",
      fullName: "Ali Ahmed",
      ssn: "12345678",
      payerName: "DEF Health",
      payerId: "12345678",
    },
    {
      key: "3",
      firstName: "Ali",
      lastName: "John",
      dob: "1985-04-11",
      memberId: "12345678",
      insurance: "XYZ Health",
      fullName: "Ali John",
      ssn: "12345678",
      payerName: "XYZ Health",
      payerId: "12345678",
    },
  ];

  const handleExpand = (expanded, record) => {
    setExpandedRowKeys(expanded ? [record.key] : []);
  };

  const handleRowSelection = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const handleClear = () => {
    setSelectedRowKeys([]);
  };

  const handleSaveSelection = () => {
    console.log("Saving selection:", selectedRowKeys);
  };

  const openTemplateModal = () => {
    setIsTemplateModalOpen(true);
  };

  const closeTemplateModal = () => {
    setIsTemplateModalOpen(false);
    templateForm.resetFields();
  };

  const handleSaveTemplate = () => {
    templateForm
      .validateFields()
      .then((values) => {
        console.log("Template saved:", values);
        closeTemplateModal();
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Member ID",
      dataIndex: "memberId",
      key: "memberId",
    },
    {
      title: "Insurance",
      dataIndex: "insurance",
      key: "insurance",
    },
    {
      title: "Select",
      key: "action",
      render: () => <Button type="link">Authorize</Button>,
    },
    {
      title: "",
      key: "expand",
      width: 50,
      render: (_, record) => (
        <Button
          type="text"
          icon={
            expandedRowKeys.includes(record.key) ? (
              <ChevronUp
                size={30}
                style={{
                  backgroundColor: "#F3F4F6",
                  borderRadius: "15px",
                  padding: "5px",
                  color: "black",
                }}
              />
            ) : (
              <ChevronDown
                size={30}
                style={{
                  backgroundColor: "#F3F4F6",
                  borderRadius: "15px",
                  padding: "5px",
                  color: "black",
                }}
              />
            )
          }
          onClick={(e) => {
            e.stopPropagation();
            handleExpand(!expandedRowKeys.includes(record.key), record);
          }}
          className={styles.expandBtn}
        />
      ),
    },
  ];

  const expandedRowRender = (record) => {
    return (
      <div className={styles.expandedRow}>
        {/* patient info and authorization details sections here */}
      </div>
    );
  };

  const modalFooter = (
    <Flex gap={5}>
      <Button onClick={closeTemplateModal} className={styles.modalCancelBtn}>
        Cancel
      </Button>
      <Button
        type="primary"
        onClick={handleSaveTemplate}
        className={styles.modalSaveBtn}
      >
        Save
      </Button>
    </Flex>
  );

  return (
    <MainLayout isSignedIn={true}>
      <div style={{ backgroundColor: "#e5e7eb", padding: "20px" }}>
        <div className={styles.container}>
          {/* everything else remains unchanged */}
        </div>
      </div>
    </MainLayout>
  );
}
