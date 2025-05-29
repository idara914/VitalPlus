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
  const [selectedRows, setSelectedRows] = useState([]);
const [selectedRowKeys, setSelectedRowKeys] = useState([]);
const [savedRowKeys, setSavedRowKeys] = useState([]);

  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
const [tableData, setTableData] = useState([]);

  const findServiceType = (hcpcsCode) => {
  const serviceOptions = [
    // Managed Care
    { label: "NURSING - HHS OF RN EA 15 MIN", value: "G0299" },
    { label: "NURSING - HHS OF LPN EA 15 MIN", value: "G0300" },
    { label: "NURSING - HHS OF AIDE EA 15 MIN", value: "G0156" },
    { label: "OT - ELECTRIC STIMULATION THERAPY", value: "97014" },
    { label: "OT - PHYSICAL MEDICINE PROCEDURE", value: "97799" },
    { label: "OT - ELECTRICAL STIMULATION", value: "97032" },
    { label: "OT - THERAPEUTIC EXERCISES", value: "97110" },
    { label: "OT - NEUROMUSCULAR REEDUCATION", value: "97112" },
    { label: "OT - GAIT TRAINING THERAPY", value: "97116" },
    { label: "OT - THERAPEUTIC PROCEDURE", value: "97124" },
    { label: "OT - MANUAL THERAPY 1/> REGIONS", value: "97140" },
    { label: "OT - THERAPEUTIC ACTIVITIES", value: "97530" },
    { label: "OT - SELF CARE MNGMENT TRAINING", value: "97535" },
    { label: "OT - COMMUNITY/WORK REINTEGRATION", value: "97537" },
    { label: "OT - WHEELCHAIR MNGMENT TRAINING", value: "97542" },
    { label: "OT - PHYSICAL PERFORMANCE TEST", value: "97750" },
    { label: "RN Assessment of delegation of CFC tasks (MDCP)", value: "G0162" },
    { label: "RN Training and Supervision of Delegated tasks", value: "G0495" },
    { label: "Respite Care Specialized RN, (CDS)", value: "T1005" },
    { label: "FFSS Specialized RN, (CDS)", value: "S9482" },
    { label: "Nursing Services - RN Agency", value: "S9123" },
    { label: "Nursing Care - LVN Agency", value: "S9124" },
    { label: "Occupational Therapy Agency", value: "S9129" },
    { label: "Physical Therapy Agency", value: "S9131" },
    { label: "Private Duty Nursing (PDN)", value: "T1000" },

    // Acute Care FFS
    { label: "NURSING - RN-Skilled Care in the Client's Home", value: "S9123" },
    { label: "NURSING - LVN-Skilled Care in the Client's Home", value: "S9124" },
    { label: "PT - PHYSICAL MEDICINE PROCEDURE", value: "97799" },
    { label: "PT - ELECTRIC STIMULATION THERAPY", value: "97014" },
    { label: "PT - THERAPEUTIC EXERCISES", value: "97110" },
    { label: "PT - GAIT TRAINING THERAPY", value: "97116" },
    { label: "PT - THERAPEUTIC PROCEDURE", value: "97124" },
    { label: "PT - MANUAL THERAPY 1/> REGIONS", value: "97140" },
    { label: "PT - THERAPEUTIC ACTIVITIES", value: "97530" },
    { label: "PT - SELF CARE MNGMENT TRAINING", value: "97535" },

    // Shared between Managed and Acute (no duplicates needed but left for clarity)
    { label: "OT - ELECTRICAL STIMULATION", value: "97032" },
    { label: "OT - NEUROMUSCULAR REEDUCATION", value: "97112" },
    { label: "OT - COMMUNITY/WORK REINTEGRATION", value: "97537" },

    // Longterm Care FFS
    { label: "In-Home OCCUPATIONAL THERAPY - EVV OHFH", value: "G0152" },
    { label: "In-Home PHYSICAL THERAPY - EVV OHFH", value: "G0151" },
    { label: "In-Home NURSING SERVICES BY LPN/LVN - EVV OHFH", value: "T1003" },
    { label: "In-Home CDS NURSING RN - EVV OHFH", value: "T1002" },
    { label: "In-Home OCCUPATIONAL THERAPY - CDS - EVV OHFH", value: "G0152" },
    { label: "In-Home Physical Therapy - LC 1, 8 - EVV OHFH", value: "S8990" },
    { label: "In-Home CDS Occupational Therapy - LC 1 - EVV OHFH", value: "M0232" },
    { label: "In-Home CDS Physical Therapy - LC 1 - EVV OHFH", value: "M0235" },
    { label: "In-Home CDS Physical Therapy - LC 1 - EVV OHFH", value: "G0151" },
  ];

  return serviceOptions.find((option) => option.value === hcpcsCode);
};
  
const handleSearch = async (values) => {
  const [firstName, lastName = ""] = (values.name || "").split(" ");
  const payload = {
    firstName,
    lastName,
    dob: values.dob?.format("YYYY-MM-DD") || null,
    clinicPatientCode: values.clinicPatientCode || null,
    isActive: "true",
  };

  try {
    const res = await fetch("/api/membersearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    const newResults = data.results.map((r, i) => ({
      key: r.Id || i,
      firstName: r.FirstName,
      lastName: r.LastName,
      dob: r.DOB,
      memberId: r.ClinicPatientCode,
      insurance: "Unknown",
      fullName: `${r.FirstName} ${r.LastName}`,
      ssn: r.ClinicPatientCode,
      payerName: "Unknown",
      payerId: "N/A",
    }));

    // Merge selected rows and remove duplicates by `key`
    const mergedData = [...selectedRows, ...newResults];
    const uniqueData = Array.from(
      new Map(mergedData.map((item) => [item.key, item])).values()
    );

    setTableData(uniqueData);
  } catch (err) {
    console.error("🔴 Search failed:", err);
  }
};




  const handleExpand = (expanded, record) => {
    setExpandedRowKeys(expanded ? [record.key] : []);
  };

 const handleRowSelection = (newSelectedKeys, selectedRecords) => {
  const newSelectedRows = [
    ...selectedRows.filter((r) => !newSelectedKeys.includes(r.key)),
    ...selectedRecords,
  ];
  setSelectedRowKeys(newSelectedKeys);
  setSelectedRows(newSelectedRows);
};


  const handleClear = () => {
  setSelectedRowKeys([]);
  setSelectedRows([]);
  setTableData([]);
  form.resetFields();
};


  const handleSaveSelection = () => {
  const newSaved = Array.from(new Set([...savedRowKeys, ...selectedRowKeys]));
  setSavedRowKeys(newSaved);
  console.log("✅ Saved selection:", newSaved);
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
const handleExpandNext = (currentKey) => {
  const currentIndex = selectedRowKeys.indexOf(currentKey);

  if (selectedRowKeys.length === 0) return;

  const nextIndex = (currentIndex + 1) % selectedRowKeys.length;
  const nextKey = selectedRowKeys[nextIndex];

  setExpandedRowKeys([nextKey]);
};



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
  <Input value="45" readOnly />
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

           
<Form.Item
  name="hcpcsCode"
  label="Procedure Code(s)"
  className={styles.formItem}
  rules={[{ required: true, message: "Please select a HCPCS Code" }]}
>
  <SelectField
optionLabelProp="value"
 showSearch
  labelInValue={false}
    options={[
      {
        label: "Managed Care",
        children: [
          { label: "NURSING - HHS OF RN EA 15 MIN", value: "G0299" },
          { label: "NURSING - HHS OF LPN EA 15 MIN", value: "G0300" },
          { label: "NURSING - HHS OF AIDE EA 15 MIN", value: "G0156" },
          { label: "OT - ELECTRIC STIMULATION THERAPY", value: "97014" },
          { label: "OT - PHYSICAL MEDICINE PROCEDURE", value: "97799" },
          { label: "OT - ELECTRICAL STIMULATION", value: "97032" },
          { label: "OT - THERAPEUTIC EXERCISES", value: "97110" },
          { label: "OT - NEUROMUSCULAR REEDUCATION", value: "97112" },
          { label: "OT - GAIT TRAINING THERAPY", value: "97116" },
          { label: "OT - THERAPEUTIC PROCEDURE", value: "97124" },
          { label: "OT - MANUAL THERAPY 1/> REGIONS", value: "97140" },
          { label: "OT - THERAPEUTIC ACTIVITIES", value: "97530" },
          { label: "OT - SELF CARE MNGMENT TRAINING", value: "97535" },
          { label: "OT - COMMUNITY/WORK REINTEGRATION", value: "97537" },
          { label: "OT - WHEELCHAIR MNGMENT TRAINING", value: "97542" },
          { label: "OT - PHYSICAL PERFORMANCE TEST", value: "97750" },
          { label: "RN Assessment of delegation of CFC tasks (MDCP)", value: "G0162" },
          { label: "RN Training and Supervision of Delegated tasks", value: "G0495" },
          { label: "Respite Care Specialized RN, (CDS)", value: "T1005" },
          { label: "FFSS Specialized RN, (CDS)", value: "S9482" },
          { label: "Nursing Services - RN Agency", value: "S9123" },
          { label: "Nursing Care - LVN Agency", value: "S9124" },
          { label: "Occupational Therapy Agency", value: "S9129" },
          { label: "Physical Therapy Agency", value: "S9131" },
          { label: "Private Duty Nursing (PDN)", value: "T1000" }
        ]
      },
      {
        label: "Acute Care FFS",
        children: [
          { label: "NURSING - RN-Skilled Care in the Client's Home", value: "S9123" },
          { label: "NURSING - LVN-Skilled Care in the Client's Home", value: "S9124" },
          { label: "NURSING - HHS OF AIDE EA 15 MIN", value: "G0156" },
          { label: "NURSING - HHS OF RN EA 15 MIN", value: "G0299" },
          { label: "NURSING - HHS OF LPN EA 15 MIN", value: "G0300" },
          { label: "PT - PHYSICAL MEDICINE PROCEDURE", value: "97799" },
          { label: "PT - ELECTRIC STIMULATION THERAPY", value: "97014" },
          { label: "OT - ELECTRICAL STIMULATION", value: "97032" },
          { label: "PT - THERAPEUTIC EXERCISES", value: "97110" },
          { label: "OT - NEUROMUSCULAR REEDUCATION", value: "97112" },
          { label: "PT - GAIT TRAINING THERAPY", value: "97116" },
          { label: "PT - THERAPEUTIC PROCEDURE", value: "97124" },
          { label: "PT - MANUAL THERAPY 1/> REGIONS", value: "97140" },
          { label: "PT - THERAPEUTIC ACTIVITIES", value: "97530" },
          { label: "PT - SELF CARE MNGMENT TRAINING", value: "97535" },
          { label: "OT - COMMUNITY/WORK REINTEGRATION", value: "97537" }
        ]
      },
      {
        label: "Longterm Care FFS",
        children: [
          { label: "In-Home OCCUPATIONAL THERAPY - EVV OHFH", value: "G0152" },
          { label: "In-Home PHYSICAL THERAPY - EVV OHFH", value: "G0151" },
          { label: "In-Home NURSING SERVICES BY LPN/LVN - EVV OHFH", value: "T1003" },
          { label: "In-Home CDS NURSING RN - EVV OHFH", value: "T1002" },
          { label: "In-Home OCCUPATIONAL THERAPY - CDS - EVV OHFH", value: "G0152" },
          { label: "In-Home Physical Therapy - LC 1, 8 - EVV OHFH", value: "S8990" },
          { label: "In-Home CDS Occupational Therapy - LC 1 - EVV OHFH", value: "M0232" },
          { label: "In-Home CDS Physical Therapy - LC 1 - EVV OHFH", value: "M0235" },
          { label: "In-Home CDS Physical Therapy - LC 1 - EVV OHFH", value: "G0151" }
        ]
      }
    ]}
    placeholder="HPCS Codes"
    containerStyle={{ backgroundColor: "#fff" }}
    customStyle={{
      backgroundColor: "#fff",
      border: "1px solid #d0d3d7",
      padding: "2px",
      height: "39px",
      textAlign: "left"
    }}
  />
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
              <Button
  type="primary"
  className={styles.nextBtn}
  onClick={() => handleExpandNext(record.key)}
>
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

<Form
  form={form}
  onFinish={handleSearch}
>
  <div className={styles.filters}>
    <Form.Item name="name" noStyle>
      <Input placeholder="First + Last" className={styles.filterInput} />
    </Form.Item>

    <Form.Item name="dob" noStyle>
      <DatePicker
        format="DD/MM/YYYY"
        placeholder="Date of Birth"
        className={styles.datePicker}
      />
    </Form.Item>

    <Form.Item name="clinicPatientCode" noStyle>
      <Input
        placeholder="SSN / Member ID"
        className={styles.searchInput}
      />
    </Form.Item>

    <Form.Item noStyle>
      <Button
        htmlType="submit"
        className={styles.SearchBtn}
        icon={<SearchOutlined />}
      />
    </Form.Item>
  </div>
</Form>


    <Table
  rowSelection={{
    type: "checkbox",
    selectedRowKeys,
    onChange: handleRowSelection,
  }}
  rowClassName={(record) =>
    savedRowKeys.includes(record.key) ? styles.savedRow : ""
  }
  columns={columns}
  scroll={{ x: 768 }}
  dataSource={tableData}
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
