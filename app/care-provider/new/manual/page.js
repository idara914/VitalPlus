"use client";

import styles from "./page.module.css";
import MainLayout from "../../../components/layouts/MainLayout";
import TextField from "@/app/components/common/TextField/TextField";
import SelectField from "@/app/components/common/SelectField/SelectField";
import { Radio } from "antd";
import DateSelector from "@/app/components/common/DateSelector/DateSelector";
import Button from "@/app/components/common/Button/Button";

const customField = {
  backgroundColor: "#fff",
};
export default function ManualAdd() {
  return (
    <main>
      <MainLayout isSignedIn={true}>
        <div className={styles.container}>
          <div className={styles.form}>
            <h1
              style={{
                marginBottom: "30px",
              }}
            >
              Add Provider
            </h1>
            <div className={styles.manualPageFormContainer}>
              <SelectField
                customStyle={customField}
                label="Type of professional"
                placeholder={"Choose"}
                options={[
                  {
                    Name: "Option 1",
                    Id: 1,
                  },
                ]}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gridGap: "20px",
                  width: "100%",
                  margin: "20px 0",
                }}
              >
                <TextField
                  label="Last Name"
                  placeholder=""
                  customStyle={customField}
                />
                <TextField
                  label="First Name"
                  placeholder=""
                  customStyle={customField}
                />
                <TextField
                  label="Middle Name"
                  placeholder=""
                  customStyle={customField}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gridGap: "20px",
                  width: "100%",
                  margin: "20px 0",
                }}
              >
                <TextField
                  label="Maiden Name"
                  placeholder=""
                  customStyle={customField}
                />
                <TextField
                  label="Other Name"
                  placeholder=""
                  customStyle={customField}
                />
              </div>
              <TextField
                label={"Address"}
                placeholder="Type here..."
                customStyle={customField}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gridGap: "20px",
                  width: "100%",
                  margin: "20px 0",
                }}
              >
                <TextField
                  label="City"
                  placeholder=""
                  customStyle={customField}
                />
                <TextField
                  label="State/Country"
                  placeholder=""
                  customStyle={customField}
                />
                <TextField
                  label="Postal Code"
                  placeholder=""
                  customStyle={customField}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  alignItems: "center",
                  gridGap: "20px",
                  width: "100%",
                  margin: "20px 0",
                }}
              >
                <TextField
                  label="Provider Phone Number"
                  placeholder=""
                  customStyle={customField}
                />
                <TextField
                  label="Social Security Number"
                  placeholder=""
                  customStyle={customField}
                />
                <Radio.Group
                  onChange={() => console.log("log")}
                  style={{
                    marginTop: "20px",
                  }}
                >
                  <Radio value={1}>Male</Radio>
                  <Radio value={2}>Female</Radio>
                </Radio.Group>
              </div>
            </div>
            <h3
              style={{
                margin: "30px 0",
              }}
            >
              Correspondence Address
            </h3>
            <div className={styles.manualPageFormContainer}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  alignItems: "center",
                  gridGap: "20px",
                  width: "100%",
                  margin: "20px 0",
                }}
              >
                <TextField
                  label="City"
                  placeholder=""
                  customStyle={customField}
                />
                <TextField
                  label="State/Country"
                  placeholder=""
                  customStyle={customField}
                />
                <TextField
                  label="Postal Code"
                  placeholder=""
                  customStyle={customField}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  alignItems: "center",
                  gridGap: "20px",
                  width: "100%",
                  margin: "20px 0",
                }}
              >
                <TextField
                  label="Phone Number"
                  placeholder=""
                  customStyle={customField}
                />
                <TextField
                  label="Fax Number"
                  placeholder=""
                  customStyle={customField}
                />
                <TextField
                  label="Email Address"
                  placeholder=""
                  customStyle={customField}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  alignItems: "center",
                  gridGap: "20px",
                  width: "100%",
                  margin: "20px 0",
                }}
              >
                <DateSelector
                  label={"Date of Birth"}
                  placeholder={"DD-MM-YYY"}
                  customStyle={customField}
                />
                <TextField
                  label="NPI"
                  placeholder=""
                  customStyle={customField}
                />
                <TextField
                  label="Speciality"
                  placeholder=""
                  customStyle={customField}
                />
              </div>
              <TextField
                label="Credentials"
                placeholder=""
                customStyle={customField}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                marginTop: "50px",
              }}
            >
              <Button
                text={"Cancel"}
                customStyle={{
                  color: "#000",
                  backgroundColor: "#fff",
                  marginRight: "10px",
                }}
              />
              <Button text={"Save"} />
            </div>
          </div>
        </div>
      </MainLayout>
    </main>
  );
}
