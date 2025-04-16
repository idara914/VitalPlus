"use client";

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
  const mockData = {
    name: "John Doe",
    imageUrl: "https://fakeimg.pl/600x400",
    number: "1234567890",
    type: "Doctor",
    joined: "28 December 1980",
    status: "Active",
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
      {
        date: "2021-09-01",
        patientName: "Jane Doe",
        type: "In-Person",
        visitId: "123456",
        diagnosis: "Fever",
        notes: "Prescribed Tylenol",
        followUp: false,
      },
    ],
  };
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Visit ID",
      dataIndex: "visitId",
      key: "visitId",
    },
    {
      title: "Diagnosis",
      dataIndex: "diagnosis",
      key: "diagnosis",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Follow-Up",
      dataIndex: "followUp",
      key: "followUp",
      render: () => {
        return (
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
        );
      },
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
  return (
    <main>
      <MainLayout isSignedIn={true}>
        <div className={styles[`${cssPrefix}Container`]}>
          <div className={styles[`${cssPrefix}ContainerInner`]}>
            <div className={styles[`${cssPrefix}ContainerTop`]}></div>
            <div
              className={styles[`${cssPrefix}ContainerHeader`]}
              style={{ marginBottom: "20px" }}
            >
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
                  <h1>{mockData.name}</h1>
                  <div>
                    <span
                      style={{
                        color: "#4B5565",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "20px",
                      }}
                    >
                      {mockData.number}
                    </span>
                    <span className="small-circle"></span>
                    <span
                      style={{
                        color: "#4B5565",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "20px",
                      }}
                    >
                      {mockData.type}
                    </span>
                    <span className="small-circle"></span>
                    <span
                      style={{
                        color: "#4B5565",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "20px",
                      }}
                    >
                      {mockData.joined}
                    </span>
                    <span className="small-circle"></span>

                    <Tag
                      style={{
                        background: "#fff",
                        borderWidth: "2px",
                        color: "#027A48",
                        borderColor: "#027A48",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      {" "}
                      {mockData.status}
                    </Tag>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "20px" }}>
                <Button
                  text={"Print Visit"}
                  customStyle={{
                    height: "40px",
                    fontSize: "14px",
                    padding: "0 20px",
                    backgroundColor: "#fff",
                    color: "#000",
                    marginRight: "10px",
                    boxShadow: "none",
                    border: "1px solid #D0D5DD",
                  }}
                />
                <Button
                  text={"Assign Visit"}
                  customStyle={{
                    height: "40px",
                    fontSize: "14px",
                    padding: "0 20px",
                    boxShadow: "none",
                  }}
                />
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
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span>{mockData.contact.number}</span>
                        <Image
                          src={NewTabIcon}
                          alt="csv"
                          style={{
                            marginLeft: "5px",
                          }}
                        />
                      </p>
                    </span>
                    <span>
                      <p style={{ fontSize: "12px" }}>Email</p>
                      <p
                        style={{
                          color: "#7f3dff",
                          marginTop: "5px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span>{mockData.contact.email}</span>
                        <Image
                          src={NewTabIcon}
                          alt="csv"
                          style={{
                            marginLeft: "5px",
                          }}
                        />
                      </p>
                    </span>
                  </span>
                  <span>
                    <span>
                      <p style={{ fontSize: "12px" }}>Termination Date</p>
                      <p
                        style={{
                          color: "#344054",
                          marginTop: "5px",
                        }}
                      >
                        Sunday 29 September 2021
                      </p>
                    </span>
                    <span>
                      <p style={{ fontSize: "12px" }}>Effective Date</p>
                      <p
                        style={{
                          color: "#344054",
                          marginTop: "5px",
                        }}
                      >
                        Sunday 29 September 2024
                      </p>
                    </span>
                  </span>
                </div>
                <div
                  className={styles[`${cssPrefix}ContainerMidSecond`]}
                  style={{
                    margin: "20px 0",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "20px",
                      fontWeight: "semi-bold",
                      color: "#101828",
                    }}
                  >
                    Forms
                  </h1>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gridGap: "10px",
                    }}
                  >
                    <div
                      className={styles[`${cssPrefix}ContainerMidSecondDoc`]}
                    >
                      <span>
                        <Image src={PdfIcon} alt="csv" />
                        <span style={{ fontSize: "16px", marginLeft: "8px" }}>
                          General Medical Report
                        </span>
                      </span>

                      <Link href={mockData.forms.generalMedicalReport}>
                        <Button text={"Preview"} customStyle={customButton} />
                      </Link>
                    </div>
                    <div
                      className={styles[`${cssPrefix}ContainerMidSecondDoc`]}
                    >
                      <span>
                        <Image src={CsvIcon} alt="csv" />
                        <span style={{ fontSize: "16px", marginLeft: "8px" }}>
                          Annual Physical Examination
                        </span>
                      </span>
                      <Link href={mockData.forms.annualPhysicalExam}>
                        <Button text={"Preview"} customStyle={customButton} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <CardCalendar />
            </div>
            <div className={styles[`${cssPrefix}Table`]}>
              <h1
                style={{
                  fontSize: "20px",
                  fontWeight: "semi-bold",
                  color: "#101828",
                }}
              >
                Visit Log
              </h1>
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
    </main>
  );
}
