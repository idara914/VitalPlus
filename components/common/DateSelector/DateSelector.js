import { DatePicker } from "antd";
import React from "react";
import styles from "./DateSelector.module.css";

function DateSelector({
  placeholder,
  onChange,
  label,
  containerStyles,
  customStyle,
}) {
  return (
    <div className={styles.container} style={containerStyles}>
      <label className={styles.label}>{label}</label>
      <DatePicker
        className={styles.input}
        onChange={onChange}
        placeholder={placeholder}
        style={customStyle}
      />
    </div>
  );
}

export default DateSelector;
