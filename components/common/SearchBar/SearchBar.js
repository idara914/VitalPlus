import Image from "next/image";
import React from "react";
import styles from "./SearchBar.module.css";

function SearchBar({ icon, placeholder, value, onChange, customStyle }) {
  return (
    <div className={styles.container}>
      <Image src={icon} />
      <input
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={customStyle}
      />
    </div>
  );
}

export default SearchBar;
