"use client";

import { useState } from "react";
import MainLayout from "../../components/layouts/MainLayout";
import styles from "../../assets/care-provider.module.css";
import { Avatar, List } from "antd";
import Button from "@/app/components/common/Button/Button";
import TextField from "../../components/common/TextField/TextField";
import SelectField from "../../components/common/SelectField/SelectField";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import DateSelector from "../../components/common/DateSelector/DateSelector";
import StatusBar from "../../components/common/StatusBar/StatusBar";
import Link from "next/link";
import instance from "@/services/axios";

const cssPrefix = "careProvider";

export default function Features() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    providerCode: "",
    speciality: "",
    dob: "",
    npi: "",
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const customFieldStyle = {
    backgroundColor: "#fff",
    padding: "10px",
    height: "40px",
  };

  const handleChange = (key) => (e) => {
    const value = e?.target?.value ?? e;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const { data } = await instance.post("/api/searchprovider", form);
      setResults(data.results);
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
      providerCode: "",
      speciality: "",
      dob: "",
      npi: "",
    });
    setResults([]);
  };

  return (
    <main>
      <MainLayout isSignedIn={true}>
        <div className={styles[`${cssPrefix}Container`]}>
          <div className={styles[`${cssPrefix}SearchContainer`]}>
            <h1>
              <SearchOutlined /> Search service provider
            </h1>
            <div className={styles[`${cssPrefix}SearchContainerFirst`]}>
              <TextField placeholder="First Name" value={form.firstName} onChange={handleChange("firstName")} customStyle={customFieldStyle} />
              <TextField placeholder="Last Name" value={form.lastName} onChange={handleChange("lastName")} customStyle={customFieldStyle} />
              <TextField placeholder="Middle Name" value={form.middleName} onChange={handleChange("middleName")} customStyle={customFieldStyle} />
              <TextField placeholder="Provider ID" value={form.providerCode} onChange={handleChange("providerCode")} customStyle={customFieldStyle} />
              <TextField placeholder="Speciality" value={form.speciality} onChange={handleChange("speciality")} customStyle={customFieldStyle} />
              <DateSelector placeholder="Date of Birth" onChange={(date) => handleChange("dob")({ target: { value: date } })} customStyle={customFieldStyle} />
              <TextField placeholder="NPI" value={form.npi} onChange={handleChange("npi")} customStyle={customFieldStyle} />
            </div>
            <div className={styles[`${cssPrefix}SearchContainerSecond`]}>
              <Button
                text="Reset"
                onClick={handleReset}
                customStyle={{ height: "40px", fontSize: "14px", padding: "0 20px", marginRight: "10px", backgroundColor: "#fff", color: "#000" }}
              />
              <Button
                text={loading ? "Searching..." : "Search"}
                onClick={handleSearch}
                customStyle={{ height: "40px", fontSize: "14px", padding: "0 20px" }}
                disabled={loading}
              />
            </div>
          </div>
          <div className={styles[`${cssPrefix}List`]}>
            <List
              pagination={{ position: "bottom", align: "center" }}
              dataSource={results}
              locale={{ emptyText: "No providers found" }}
              renderItem={(item) => (
  <Link href={`/care-provider/${item.Id}`}>
    <List.Item style={{ cursor: "pointer" }}>
      <List.Item.Meta
        title={`${item.FirstName} ${item.LastName}`}
        description={
                        <div className={styles[`${cssPrefix}ListAbout`]}>
                          <span>{item.ServiceProviderCode || item.Code}</span>
                          <span className="small-circle"></span>
                          <span>{item.Remarks || "Speciality N/A"}</span>
                          <span className="small-circle"></span>
                          <span>{item.DOB || "DOB N/A"}</span>
                          <span className="small-circle"></span>
                          <StatusBar status="Available" type="Success" />
                        </div>
                      }
                    />
                  </List.Item>
                </Link>
              )}
            />
          </div>
        </div>
      </MainLayout>
    </main>
  );
}

