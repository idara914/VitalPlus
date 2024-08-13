import React, { useState } from "react";
import styles from "./SearchBox.module.css";
import SearchBar from "@/app/components/common/SearchBar/SearchBar";
import MagnifyingGlassIcon from "../../../../public/icons/magnifyig-glass.png";

function SearchBox({ onChange }) {
  const [searchText, setSearchText] = useState("");
  return (
    <div className={styles.container}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.{" "}
      </p>
      <SearchBar
        icon={MagnifyingGlassIcon}
        value={searchText}
        placeholder={"Type to search"}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
}

export default SearchBox;
