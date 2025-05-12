"use client";
import { Form, Input, DatePicker, Button } from "antd";
import styles from "./Patient.module.css";
import SelectField from "@/components/common/SelectField/SelectField";
import MainLayout from "@/components/Layouts/MainLayout";

const { TextArea } = Input;

export default function PatientInfoPage() {
  const [form] = Form.useForm();

  const handleVerify = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form values:", values);
        // Here you would typically verify the patient information
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.formLayout}>
          {/* Left Column - Patient Info */}
          <div className={styles.leftColumn}>
            <div className={styles.patientInfoHeader}>
              <h2>Patient Info</h2>
            </div>

            <div className={styles.formGroup}>
              <label>Patient Name</label>
              <Input className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label>Date of Birth</label>
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="dd/mm/yyyy"
                className={styles.datePicker}
              />
            </div>

            <div className={styles.formGroup}>
              <label>SSN / Member ID</label>
              <Input className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label>Gender</label>
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
            </div>

            <div className={styles.formGroup}>
              <label>Payer Name</label>
              <Input className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label>Payer ID</label>
              <Input placeholder="CMS/NPI format" className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label>Insurance Type</label>
              <Input placeholder="e.g. Medicare" className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label>Policy / Subscriber ID</label>
              <Input className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label>Group Number</label>
              <Input className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label>Relationship to Insured</label>
              <Input className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label>Eligibility Check Date</label>
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="dd/mm/yyyy"
                className={styles.datePicker}
              />
            </div>

            <Button
              type="primary"
              onClick={handleVerify}
              className={styles.verifyButton}
            >
              Verify
            </Button>
          </div>

          {/* Right Column - Coverage Details and Financials */}
          <div className={styles.rightColumn}>
            {/* Coverage Details Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Coverage Details</h2>
              </div>

              <div className={styles.sectionContent}>
                <div className={styles.formRow}>
                  <div className={styles.formColumn}>
                    <label>Plan Name</label>
                    <Input className={styles.input} />
                  </div>

                  <div className={styles.formColumn}>
                    <label>Plan Type</label>
                    <Input
                      placeholder="HMO, PPO, etc."
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formColumn}>
                    <label>Coverage Level Code</label>
                    <Input className={styles.input} />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formColumn}>
                    <label>Coverage Status</label>
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
                  </div>

                  <div className={styles.formColumn}>
                    <label>Eligibility Start Date</label>
                    <DatePicker
                      format="DD/MM/YYYY"
                      placeholder="dd/mm/yyyy"
                      className={styles.datePicker}
                    />
                  </div>

                  <div className={styles.formColumn}>
                    <label>Eligibility End Date</label>
                    <DatePicker
                      format="DD/MM/YYYY"
                      placeholder="dd/mm/yyyy"
                      className={styles.datePicker}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formColumn}>
                    <label>Authorization Required</label>
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
                  </div>

                  <div className={styles.formColumn}>
                    <label>Precert Required</label>
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
                  </div>

                  <div className={styles.formColumn}>
                    <label>Service Type Codes</label>
                    <Input placeholder="e.g. 30" className={styles.input} />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formColumn}>
                    <label>Coverage Details Summary</label>
                    <TextArea rows={4} className={styles.textarea} />
                  </div>

                  <div className={styles.formColumn}>
                    <label>Limitations / Notes</label>
                    <TextArea rows={4} className={styles.textarea} />
                  </div>
                </div>
              </div>
            </div>

            {/* Financials Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Financials</h2>
              </div>

              <div className={styles.sectionContent}>
                <div className={styles.formRow}>
                  <div className={styles.formColumn}>
                    <label>Copay Amount</label>
                    <Input defaultValue="$0.00" className={styles.input} />
                  </div>

                  <div className={styles.formColumn}>
                    <label>Coinsurance Percent</label>
                    <Input defaultValue="20%" className={styles.input} />
                  </div>

                  <div className={styles.formColumn}>
                    <label>Deductible Amount (Individual)</label>
                    <Input className={styles.input} />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formColumn}>
                    <label>Deductible Remaining</label>
                    <Input className={styles.input} />
                  </div>

                  <div className={styles.formColumn}>
                    <label>Out-of-Pocket Max</label>
                    <Input className={styles.input} />
                  </div>

                  <div className={styles.formColumn}>
                    <label>Remaining Out-of-Pocket</label>
                    <Input className={styles.input} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
