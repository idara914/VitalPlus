"use client";

import React, { useState } from "react";
import styles from "./Tabs.module.css";

function Tabs({ options }) {
  const [currentTab, setCurrentTab] = useState(0);
  const handleTabChange = (index) => {
    setCurrentTab(index);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {options.map((option, i) => (
          <p
            key={option.key}
            onClick={() => handleTabChange(i)}
            className={i == currentTab ? styles.selected : ""}
          >
            {option.label}
          </p>
        ))}
      </div>
      <div className={styles.content}>{options[currentTab].content}</div>
    </div>
  );
}

export default Tabs;
