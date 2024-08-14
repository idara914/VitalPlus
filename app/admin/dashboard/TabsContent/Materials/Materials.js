import React from "react";
import { Table } from "antd";
import styles from "./Materials.module.css";
const columns = [
  {
    title: "Member Name",
    dataIndex: "memberName",
    key: "memberName",
  },
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Order Type",
    dataIndex: "orderType",
    key: "orderType",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Ship Date",
    dataIndex: "shipDate",
    key: "shipDate",
  },
];
const data = [
  {
    memberName: "Member Name",
    orderId: "235410",
    date: "01/02/24",
    orderType: "HP Monitor",
    status: "$50.0",
    shipDate: "12/06/24",
  },

  {
    memberName: "Member Name",
    orderId: "235410",
    date: "01/02/24",
    orderType: "HP Monitor",
    status: "$50.0",
    shipDate: "N/A",
  },
];
const Materials = () => (
  <Table
    columns={columns}
    dataSource={data}
    pagination={false}
    className={styles.table}
    style={{ width: "100%" }}
    scroll={{ x: "max-content" }}
  />
);

export default Materials;
