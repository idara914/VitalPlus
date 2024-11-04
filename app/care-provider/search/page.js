"use client";

import MainLayout from "../../components/Layouts/MainLayout";
import styles from "../../assets/care-provider.module.css";
import { Avatar, DatePicker, List } from "antd";
import Button from "@/app/components/common/Button/Button";
import TextField from "../../components/common/TextField/TextField";
import SelectField from "../../components/common/SelectField/SelectField";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import DateSelector from "../../components/common/DateSelector/DateSelector";
import StatusBar from "../../components/common/StatusBar/StatusBar";
import Link from "next/link";

const cssPrefix = "careProvider";
export default function Features() {
  const mockData = {
    profiles: [
      {
        imageUrl: "https://via.placeholder.com/150",
        name: "John Doe",
        number: "1234567890",
        type: "Doctor",
        joined: "2021-09-01",
        status: "Available",
      },
    ],
  };
  const customFieldStyle = {
    backgroundColor: "#fff",
    padding: "10px",
    height: "40px",
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
              <TextField
                placeholder={"First Name"}
                customStyle={customFieldStyle}
              />
              <TextField
                placeholder={"Last Name"}
                customStyle={customFieldStyle}
              />
              <TextField
                placeholder={"Middle Name"}
                customStyle={customFieldStyle}
              />
              <TextField
                placeholder={"Provider ID"}
                customStyle={customFieldStyle}
              />
              <TextField
                placeholder={"Speciality"}
                customStyle={customFieldStyle}
              />
              <DateSelector
                customStyle={customFieldStyle}
                placeholder={"Date of Birth"}
                onChange={(date) => console.log("date", date)}
              />

              <DateSelector
                customStyle={customFieldStyle}
                placeholder={"Date Range"}
                onChange={(date) => console.log("date", date)}
              />

              <SelectField
                placeholder={"Available (Y/N)"}
                options={[{ Id: "y", Name: "Yes" }]}
                customStyle={customFieldStyle}
              />
              <TextField placeholder={"NPI"} customStyle={customFieldStyle} />
              <TextField
                placeholder={"Patient Name"}
                customStyle={customFieldStyle}
              />
              <TextField
                placeholder={"Patient Middle Name"}
                customStyle={customFieldStyle}
              />
              <TextField
                placeholder={"Patient Last Name"}
                customStyle={customFieldStyle}
              />
            </div>
            <div className={styles[`${cssPrefix}SearchContainerSecond`]}>
              <Button
                text={"Reset"}
                customStyle={{
                  height: "40px",
                  fontSize: "14px",
                  padding: "0 20px",
                  marginRight: "10px",
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              />
              <Button
                text={"Search"}
                customStyle={{
                  height: "40px",
                  fontSize: "14px",
                  padding: "0 20px",
                }}
              />
            </div>
          </div>
          <div className={styles[`${cssPrefix}List`]}>
            <List
              pagination={{ position: "bottom", align: "center" }}
              dataSource={mockData.profiles}
              renderItem={(item, index) => (
                <Link href="/care-provider/1234">
                  <List.Item style={{ cursor: "pointer" }}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.imageUrl} size={"large"} />}
                      title={item.name}
                      description={
                        <div className={styles[`${cssPrefix}ListAbout`]}>
                          <span>{item.number}</span>
                          <span className="small-circle"></span>
                          <span>{item.type}</span>
                          <span className="small-circle"></span>
                          <span>{item.joined}</span>
                          <span className="small-circle"></span>
                          <StatusBar status={item.status} type="Success" />
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
