"use client";

import { useState } from "react";
import MainLayout from "../../components/layouts/MainLayout";
import styles from "../../assets/care-provider.module.css";
import { Avatar, List } from "antd";
import Button from "@/app/components/common/Button/Button";
import TextField from "../../components/common/TextField/TextField";
import SelectField from "../../components/common/SelectField/SelectField";
import DateSelector from "../../components/common/DateSelector/DateSelector";
import StatusBar from "../../components/common/StatusBar/StatusBar";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import instance from "@/services/axios";

const cssPrefix = "careProvider";

export default function MemberSearch() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    clinicPatientCode: "",
    phone: "",
    dob: "",
    zip: "",
    isActive: "",
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // 🆕 track if search was made

  const handleChange = (key) => (e) => {
    const value = e?.target?.value ?? e;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const { data } = await instance.post("/api/search-clinic-patient", form);
      setResults(data.results);
      setHasSearched(true); // ✅ flag search complete
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({
      firstName: "",
      lastName: "",
      middleName: "",
      clinicPatientCode: "",
      phone: "",
      dob: "",
      zip: "",
      isActive: "",
    });
    setResults([]);
    setHasSearched(false); // 🔄 reset flag on clear
  };

  const fieldStyle = {
    backgroundColor: "#fff",
    padding: "10px",
    height: "40px",
  };

  return (
    <MainLayout isSignedIn={true}>
      <div className={styles[`${cssPrefix}Container`]}>
        <div className={styles[`${cssPrefix}SearchContainer`]}>
          <h1><SearchOutlined /> Search Member</h1>
          <div className={styles[`${cssPrefix}SearchContainerFirst`]}>
            <TextField placeholder="First Name" value={form.firstName} onChange={handleChange("firstName")} customStyle={fieldStyle} />
            <TextField placeholder="Last Name" value={form.lastName} onChange={handleChange("lastName")} customStyle={fieldStyle} />
            <TextField placeholder="Middle Name" value={form.middleName} onChange={handleChange("middleName")} customStyle={fieldStyle} />
            <TextField placeholder="Member ID" value={form.clinicPatientCode} onChange={handleChange("clinicPatientCode")} customStyle={fieldStyle} />
            <TextField placeholder="Phone Number" value={form.phone} onChange={handleChange("phone")} customStyle={fieldStyle} />
            <DateSelector placeholder="Date of Birth" onChange={(date) => handleChange("dob")({ target: { value: date } })} customStyle={fieldStyle} />
            <TextField placeholder="ZIP Code" value={form.zip} onChange={handleChange("zip")} customStyle={fieldStyle} />
            <SelectField
              placeholder="Status"
              value={form.isActive}
              onChange={handleChange("isActive")}
              options={[
                { Id: "true", Name: "Active" },
                { Id: "false", Name: "Inactive" },
              ]}
              customStyle={fieldStyle}
            />
          </div>
          <div className={styles[`${cssPrefix}SearchContainerSecond`]}>
            <Button text="Reset" onClick={handleReset} customStyle={{ height: "40px", fontSize: "14px", padding: "0 20px", marginRight: "10px", backgroundColor: "#fff", color: "#000" }} />
            <Button text={loading ? "Searching..." : "Search"} onClick={handleSearch} customStyle={{ height: "40px", fontSize: "14px", padding: "0 20px" }} disabled={loading} />
          </div>
        </div>

        <div className={styles[`${cssPrefix}List`]}>
          <List
            pagination={{ position: "bottom", align: "center" }}
            dataSource={results}
            locale={hasSearched ? { emptyText: "No members found" } : {}}
            renderItem={(item) => (
              <List.Item key={item.Id} style={{ cursor: "pointer" }}>
                <List.Item.Meta
                  avatar={<Avatar src="https://via.placeholder.com/150" size="large" />}
                  title={`${item.FirstName} ${item.LastName}`}
                  description={
                    <div className={styles[`${cssPrefix}ListAbout`]}>
                      <span>{item.ClinicPatientCode || "N/A"}</span>
                      <span className="small-circle" />
                      <span>{item.DOB || "DOB N/A"}</span>
                      <span className="small-circle" />
                      <span>{item.ZipCode || "ZIP N/A"}</span>
                      <span className="small-circle" />
                      <StatusBar status={item.IsActive ? "Active" : "Inactive"} type={item.IsActive ? "Success" : "Warning"} />
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </MainLayout>
  );
}
