import React from "react";
import styles from "./StatusBar.module.css";

function StatusBar({ status, type }) {
  return <div className={`${styles[`status${type}`]}`}>{status}</div>;
}

export default StatusBar;
