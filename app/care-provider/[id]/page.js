"use client";

import MainLayout from "../../components/layouts/MainLayout";
import styles from "../../assets/care-provider.module.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Avatar, Table, Tag } from "antd";
import Button from "@/app/components/common/Button/Button";
import CardCalendar from "@/app/components/common/CardCalendar/CardCalendar";
import Link from "next/link";
import PdfIcon from "../../../public/icons/pdf-icon.svg";
import CsvIcon from "../../../public/icons/csv-icon.svg";
import Image from "next/image";
import NewTabIcon from "../../../public/icons/new-tab.svg";
import instance from "@/services/axios";

const cssPrefix = "careProviderProfile";

const customButton = {
  backgroundColor: "#fff",
  fontSize: "14px",
  color: "#000",
  padding: "8px 10px",
  border: "1px solid #D0D5DD",
  boxShadow: "none",
};

export default function Features() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);

  const mockData = {
    imageUrl: "https://fakeimg.pl/600x400",
    type: "Doctor",
    forms: {
      generalMedicalReport: "https://icseindia.org/document/sample.pdf",
      annualPhysicalExam: "https://icseindia.org/document/sample.pdf",
    },
    visitLogs: [
      {
        date: "2021-09-01",
        patientName: "Jane Doe",
        type: "In-Person",
        visitId: "123456",
        diagnosis: "Fever",
        notes: "Prescribed Tylenol",
        followUp: true,
      },
    ],
  };

  useEffect(() => {
    if (id) {
      instance
        .get(`/api/provider-detail/${id}`)
        .then((res) => setProvider(res.data))
        .catch((err) => console.error("Failed to load provider", err));
    }
  }, [id]);

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Patient Name", dataIndex: "patientName", key: "patientName" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Visit ID", dataIndex: "visitId", key: "visitId" },
    { title: "Diagnosis", dataIndex: "diagnosis", key: "diagnosis" },
    { title: "Notes", dataIndex: "notes", key: "notes" },
    {
      title: "Follow-Up",
      dataIndex: "followUp",
      key: "followUp",
      render: (val) =>
        val ? (
          <Tag style={{ background: "#ECFDF3", color: "#067647" }}>Yes</Tag>
        ) : (
          <Tag color="red">No</Tag>
        ),
    },
  ];

  const displayName = provider
    ? `${provider.FirstName} ${provider.LastName}`
    : "Loading...";

  const status =
    provider?.IsActive === 1
      ? "Active"
      : provider?.IsActive === 2
      ? "Inactive"
      : "Unknown";

  return (
    <main>
      <MainLayout isSignedIn={true}>
        <div className={styles[`${cssPrefix}Container`]}>
          <div className={styles[`${cssPrefix}ContainerInner`]}>
            <div className={styles[`${cssPrefix}ContainerTop`]}></div>
            <div className={styles[`${cssPrefix}ContainerHeader`]}>
              <div className={styles[`${cssPrefix}ContainerHeaderBasic`]}>
                <Avatar
                  size={64}
                  src={mockData.imageUrl}
                  style={{
                    border: "5px solid #fff",
                    height: "160px",
                    width: "160px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <div>
                  <h1>{displayName}</h1>
                  <div>
                    <span>{provider?.ServiceProviderCode || "—"}</span>
                    <span className="small-circle" />
                    <span>{mockData.type}</span>
                    <span className="small-circle" />
                    <span>{provider?.EffOt?.split("T")[0]}</span>
                    <span className="small-circle" />
                    <Tag>{status}</Tag>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "20px" }}>
                <Button text="Print Visit" />
                <Button text="Assign Visit" />
              </div>
            </div>

            <div className={styles[`${cssPrefix}ContainerMid`]}>
              <div
                className={styles[`${cssPrefix}ContainerMidFirst`]}
                style={{ marginRight: "20px" }}
              >
                <div className={styles[`${cssPrefix}ContainerMidFirstInfo`]}>
                  <span>
                    <span>
                      <p style={{ fontSize: "12px" }}>Contact</p>
                      <p
                        style={{
                          color: "#7f3dff",
                          marginTop: "5px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span>{provider?.PhoneNumber || "N/A"}</span>
                        <Image src={NewTabIcon} alt="contact" style={{ marginLeft: "5px" }} />
                      </p>
                    </span>
                    <span>
                      <p style={{ fontSize: "12px" }}>Email</p>
                      <p
                        style={{
                          color: "#7f3dff",
                          marginTop: "5px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span>{provider?.Email || "N/A"}</span>
                        <Image src={NewTabIcon} alt="email" style={{ marginLeft: "5px" }} />
                      </p>
                    </span>
                  </span>
                  <span>
                    <span>
                      <p style={{ fontSize: "12px" }}>Termination Date</p>
                      <p>{provider?.TermOt?.split("T")[0] || "N/A"}</p>
                    </span>
                    <span>
                      <p style={{ fontSize: "12px" }}>Effective Date</p>
                      <p>{provider?.EffOt?.split("T")[0] || "N/A"}</p>
                    </span>
                  </span>
                </div>

                <div
                  className={styles[`${cssPrefix}ContainerMidSecond`]}
                  style={{ margin: "20px 0" }}
                >
                  <h1>Forms</h1>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gridGap: "10px",
                    }}
                  >
                    <div className={styles[`${cssPrefix}ContainerMidSecondDoc`]}>
                      <span>
                        <Image src={PdfIcon} alt="pdf" />
                        <span style={{ fontSize: "16px", marginLeft: "8px" }}>
                          General Medical Report
                        </span>
                      </span>
                      <Link href={mockData.forms.generalMedicalReport}>
                        <Button text="Preview" customStyle={customButton} />
                      </Link>
                    </div>
                    <div className={styles[`${cssPrefix}ContainerMidSecondDoc`]}>
                      <span>
                        <Image src={CsvIcon} alt="csv" />
                        <span style={{ fontSize: "16px", marginLeft: "8px" }}>
                          Annual Physical Exam
                        </span>
                      </span>
                      <Link href={mockData.forms.annualPhysicalExam}>
                        <Button text="Preview" customStyle={customButton} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <CardCalendar />
            </div>

            <div className={styles[`${cssPrefix}Table`]}>
              <h1>Visit Log</h1>
              <Table
                dataSource={mockData.visitLogs}
                columns={columns}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </MainLayout>
    </main>
  );
}
