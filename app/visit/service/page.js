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
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Patient Info</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Full Name</div>
              <div className={styles.infoValue}>{record.fullName}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>DOB</div>
              <div className={styles.infoValue}>{record.dob}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>SSN / Member ID</div>
              <div className={styles.infoValue}>{record.ssn}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Payer Name</div>
              <div className={styles.infoValue}>{record.payerName}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Payer ID</div>
              <div className={styles.infoValue}>{record.payerId}</div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Authorization Details</h3>
            <div className={styles.templateActions}>
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
                  height: "35px",
                  width: "180px",
                  textAlign: "left",
                }}
              />
              <Button
                type="primary"
                className={styles.createTemplateBtn}
                onClick={openTemplateModal}
              >
                Create Template
              </Button>
            </div>
          </div>

          <Form form={form} layout="vertical" className={styles.authForm}>
            <div className={styles.formGrid}>
              <Form.Item label="Service Type Code" className={styles.formItem}>
                <Input placeholder="e.g. 42" />
              </Form.Item>

              <Form.Item label="Place of Service" className={styles.formItem}>
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
                label="Diagnosis Code (ICD-10)"
                className={styles.formItem}
              >
                <Input placeholder="F331" />
              </Form.Item>

              <Form.Item label="Procedure Code(s)" className={styles.formItem}>
                <Input placeholder="CPT/HCPCS" />
              </Form.Item>

              <Form.Item label="Units Requested" className={styles.formItem}>
                <Input placeholder="20" />
              </Form.Item>

              <Form.Item label="Frequency" className={styles.formItem}>
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

              <Form.Item label="Start Date" className={styles.formItem}>
                <DatePicker
                  format="DD/MM/YYYY"
                  placeholder="dd/mm/yyyy"
                  className={styles.fullWidth}
                />
              </Form.Item>

              <Form.Item label="End Date" className={styles.formItem}>
                <DatePicker
                  format="DD/MM/YYYY"
                  placeholder="dd/mm/yyyy"
                  className={styles.fullWidth}
                />
              </Form.Item>

              <Form.Item label="Prior Auth Number" className={styles.formItem}>
                <Input placeholder="Optional" />
              </Form.Item>

              <Form.Item
                label="Authorization Template"
                className={styles.formItem}
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
                label="Supporting Documents"
                className={styles.formItemFull}
              >
                <div className={styles.fileUploadContainer}>
                  <label
                    htmlFor="file-upload"
                    className={styles.chooseFileButton}
                  >
                    Choose file
                  </label>
                  <div className={styles.fileNameDisplay}>No file chosen</div>
                  <input
                    id="file-upload"
                    type="file"
                    className={styles.hiddenFileInput}
                    onChange={(e) => {
                      const fileName = e.target.files?.[0]?.name;
                      if (fileName) {
                        const fileDisplay = document.querySelector(
                          `.${styles.fileNameDisplay}`
                        );
                        if (fileDisplay) fileDisplay.textContent = fileName;
                      }
                    }}
                  />
                </div>
              </Form.Item>

              <Form.Item
                label="Notes / Justification"
                className={styles.formItemFull}
              >
                <TextArea
                  rows={2}
                  placeholder="Optional for payer communication"
                />
              </Form.Item>
            </div>

            <div className={styles.formActions}>
              <Button className={styles.submitBtn}>Submit</Button>
              <Button type="primary" className={styles.nextBtn}>
                Next
              </Button>
            </div>
          </Form>
        </div>
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
          <div className={styles.header}>
            <div className={styles.title}>
              <div className={styles.icon}></div>
              <h2>Service Authorization</h2>
            </div>
            <div className={styles.actions}>
              <Button onClick={handleClear} className={styles.clearBtn}>
                Clear
              </Button>
              <Button
                type="primary"
                onClick={handleSaveSelection}
                className={styles.saveBtn}
              >
                Save Selection
              </Button>
            </div>
          </div>

          <div className={styles.filters}>
            <Input placeholder="All" className={styles.filterInput} />

            <DatePicker
              format="DD/MM/YYYY"
              placeholder=""
              className={styles.datePicker}
            />

            <Input
              placeholder="SSN / Member ID"
              //   suffix={<SearchOutlined />}
              className={styles.searchInput}
            />
            <Button className={styles.SearchBtn} icon={<SearchOutlined />} />
            {/* </div> */}
          </div>

          <Table
            rowSelection={{
              type: "checkbox",
              selectedRowKeys,
              onChange: handleRowSelection,
            }}
            columns={columns}
            scroll={{ x: 768 }}
            dataSource={data}
            expandable={{
              expandedRowRender,
              expandedRowKeys,
              showExpandColumn: false,
            }}
            pagination={false}
            className={styles.table}
          />

          <CustomModal
            title="Create Template"
            open={isTemplateModalOpen}
            onCancel={closeTemplateModal}
            footer={modalFooter}
          >
            <Form form={templateForm} layout="vertical">
              <Form.Item
                name="templateName"
                label="Template Name"
                rules={[
                  { required: true, message: "Please enter a template name" },
                ]}
              >
                <Input placeholder="Enter name of template" />
              </Form.Item>
            </Form>
          </CustomModal>
        </div>
      </div>
    </MainLayout>
  );
}

