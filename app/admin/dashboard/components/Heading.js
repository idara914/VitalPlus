"use client";
import React, { useState } from "react";
import { Select } from "antd";
import styles from "./Heading.module.css";

function Heading({ text }) {
  const [yearSelected, setYearSelected] = useState("2024");
  const handleChange = (e) => {
    setYearSelected(e);
  };
  return (
    <div className={styles.container}>
      <h1>{text}</h1>
      <Select
        variant="borderless"
        defaultValue={yearSelected}
        style={{
          width: 120,
        }}
        onChange={handleChange}
        options={[
          {
            value: "2024",
            label: "2024",
          },
          {
            value: "2023",
            label: "2023",
          },
          {
            value: "2022",
            label: "2022",
          },
        ]}
      />
    </div>
  );
}

export default Heading;
