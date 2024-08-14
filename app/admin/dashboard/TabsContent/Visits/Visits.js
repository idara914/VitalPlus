import React from "react";
import { Table } from "antd";
import styles from "./Visits.module.css";
const columns = [
  {
    title: "",
    dataIndex: "date",
    key: "date",
    render: (obj) =>
      obj === "Total" ? (
        <p
          style={{
            padding: 0,
            margin: 0,
            color: "#484646",
            fontWeight: "800",
            fontSize: "20px",
          }}
        >
          {obj}
        </p>
      ) : (
        <p
          style={{
            padding: 0,
            margin: 0,
            color: "#484646",
            fontWeight: "500",
          }}
        >
          {obj}
        </p>
      ),
  },
  {
    title: "",
    dataIndex: "rate",
    key: "rate",
    render: (obj) =>
      obj == "20k" ? (
        <p
          style={{
            fontWeight: "800",
            textAlign: "right",
            padding: 0,
            margin: 0,
            fontSize: "20px",
          }}
        >
          <label
            style={{
              backgroundColor: "#e0e0e0",
              padding: "10px",
              color: "#484646",
              borderRadius: "10px",
            }}
          >
            {obj}
          </label>
        </p>
      ) : (
        <p
          style={{
            padding: 0,
            margin: 0,
            textAlign: "right",
            color: "#484646",
            fontWeight: "500",
          }}
        >
          {obj}
        </p>
      ),
  },
];
const data = [
  {
    date: "July 2024",
    rate: "10,000",
  },
  {
    date: "May 2024",
    rate: "10,000",
  },
  {
    date: "Total",
    rate: "20k",
  },
];
const Visits = () => (
  <Table
    columns={columns}
    dataSource={data}
    pagination={false}
    className={styles.table}
    style={{ width: "100%" }}
    scroll={{ x: "max-content" }}
  />
);

export default Visits;
