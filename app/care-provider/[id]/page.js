"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import MainLayout from "../../components/layouts/MainLayout";
import styles from "../../assets/care-provider.module.css";
import { Avatar, Table, Tag } from "antd";
import Button from "@/app/components/common/Button/Button";
import CardCalendar from "@/app/components/common/CardCalendar/CardCalendar";
import Link from "next/link";
import PdfIcon from "../../../public/icons/pdf-icon.svg";
import CsvIcon from "../../../public/icons/csv-icon.svg";
import Image from "next/image";
import NewTabIcon from "../../../public/icons/new-tab.svg";

const cssPrefix = "careProviderProfile";

export default function Features() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);

  const mockData = {
    imageUrl: "https://fakeimg.pl/600x400",
    type: "Doctor",
    joined: "28 December 1980",
    contact: {
      email: "john.doe@gmail.com",
      number: "1234567890",
    },
    terminationDate: "2021-09-01",
    effectiveDate: "2021-09-01",
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
      axios
        .post("/api/get-provider", { id })
        .then((res) => setProvider(res.data))
        .catch((err) => console.error("Provider fetch failed", err));
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
      render: () => (
        <Tag
          style={{
            background: "#ECFDF3",
            borderWidth: "2px",
            color: "#067647",
            borderColor: "#ABEFC6",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          Yes
        </Tag>
      ),
    },
  ];

  const customButton = {
    backgroundColor: "#fff",
    fontSize: "14px",
    color: "#000",
    padding: "8px 10px",
    border: "1px solid #D0D5DD",
    boxShadow: "none",
  };

  const fullName = `${provider?.FirstName || "John"} ${provider?.LastName || "Doe"}`;
  const contactEmail = provider?.Email || mockData.contact.email;
  const contactPhone = provider?.PhoneNumber || mockData.contact.number;
  const status = provider?.IsActive ? "Active" : "Inactive";
  const effDate = provider?.EffDt?.split("T")[0] || mockData.effectiveDate;
  const dob = provider?.DOB?.split("T")[0] || mockData.joined;

  return (
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
                <h1>{fullName}</h1>
                <div>
                  <span className="text-muted">{provider?.ServiceProviderCode || "SP-1234"}</span>
                  <span className="small-circle" />
                  <span className="text-muted">{mockData.type}</span>
                  <span className="small-circle" />
                  <span className="text-muted">{dob}</span>
                  <span className="small-circle" />
                  <Tag className="text-muted">{status}</Tag>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <Button text="Print Visit" customStyle={{ ...customButton, marginRight: "10px" }} />
              <Button text="Assign Visit" />
            </div>
          </div>

          <div className={styles[`${cssPrefix}ContainerMid`]}>
            <div className={styles[`${cssPrefix}ContainerMidFirst`]}>
              <div className={styles[`${cssPrefix}ContainerMidFirstInfo`]}>
                <span>
                  <span>
                    <p>Contact</p>
                    <p className="text-link">
                      <span>{contactPhone}</span>
                      <Image src={NewTabIcon} alt="link" style={{ marginLeft: 5 }} />
                    </p>
                  </span>
                  <span>
                    <p>Email</p>
                    <p className="text-link">
                      <span>{contactEmail}</span>
                      <Image src={NewTabIcon} alt="link" style={{ marginLeft: 5 }} />
                    </p>
                  </span>
                </span>
                <span>
                  <span>
                    <p>Termination Date</p>
                    <p className="text-muted">Sunday 29 September 2021</p>
                  </span>
                  <span>
                    <p>Effective Date</p>
                    <p className="text-muted">{effDate}</p>
                  </span>
                </span>
              </div>

              <div className={styles[`${cssPrefix}ContainerMidSecond`]}>
                <h1>Forms</h1>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div className={styles[`${cssPrefix}ContainerMidSecondDoc`]}>
                    <span>
                      <Image src={PdfIcon} alt="pdf" />
                      <span style={{ marginLeft: "8px" }}>General Medical Report</span>
                    </span>
                    <Link href={mockData.forms.generalMedicalReport}>
                      <Button text="Preview" customStyle={customButton} />
                    </Link>
                  </div>
                  <div className={styles[`${cssPrefix}ContainerMidSecondDoc`]}>
                    <span>
                      <Image src={CsvIcon} alt="csv" />
                      <span style={{ marginLeft: "8px" }}>Annual Physical Examination</span>
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
              className={styles[`${cssPrefix}TableInside`]}
              dataSource={mockData.visitLogs}
              columns={columns}
              pagination={false}
              footer={false}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

