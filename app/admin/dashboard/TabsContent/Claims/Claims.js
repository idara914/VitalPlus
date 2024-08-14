import React from "react";
import { Col, Table } from "antd";
import styles from "./Claims.module.css";
const columns = [
  {
    title: "Member Name",
    dataIndex: "memberName",
    key: "memberName",
  },
  {
    title: "Claim ID",
    dataIndex: "claimId",
    key: "claimId",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Net Amount",
    dataIndex: "netAmount",
    key: "netAmount",
  },
  {
    title: "Paid Date",
    dataIndex: "paidDate",
    key: "paidDate",
  },
  {
    title: "ACH Number",
    dataIndex: "achNumber",
    key: "achNumber",
  },
];
const data = [
  {
    memberName: "Member Name",
    claimId: "235410",
    date: "01/02/24",
    status: "Processed",
    netAmount: "$50.0",
    paidDate: "12/06/24",
    achNumber: "203612",
  },
  {
    memberName: "Member Name",
    claimId: "235410",
    date: "01/02/24",
    status: "Processed",
    netAmount: "$50.0",
    paidDate: "N/A",
    achNumber: "N/A",
  },
];
const Claims = () => (
  <Table
    columns={columns}
    dataSource={data}
    pagination={false}
    className={styles.table}
    style={{ width: "100%" }}
    scroll={{ x: "max-content" }}
  />
);

export default Claims;
