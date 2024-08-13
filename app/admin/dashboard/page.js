"use client";

import MainLayout from "@/app/components/layouts/MainLayout";
import React from "react";
import styles from "./page.module.css";
import Tabs from "@/app/components/common/Tabs/Tabs";
import SearchBox from "./components/SearchBox";

function page() {
  const options = [
    {
      label: "Payments",
      key: 0,
      content: (
        <div className={styles.contentContainer}>
          <h1>Payments</h1> <SearchBox />
        </div>
      ),
    },
    {
      label: "Visits",
      key: 1,
      content: (
        <div className={styles.contentContainer}>
          <h1>Visits</h1> <SearchBox />
        </div>
      ),
    },
    {
      label: "Materials",
      key: 2,
      content: (
        <div className={styles.contentContainer}>
          <h1>Materials</h1> <SearchBox />
        </div>
      ),
    },
    {
      label: "Tasks",
      key: 3,
      content: (
        <div className={styles.contentContainer}>
          <h1>Tasks</h1> <SearchBox />
        </div>
      ),
    },
    {
      label: "Claims",
      key: 4,
      content: (
        <div className={styles.contentContainer}>
          <h1>Claims</h1> <SearchBox />
        </div>
      ),
    },
  ];
  return (
    <MainLayout isSignedIn={true}>
      <div className={styles.container}>
        <Tabs options={options} />
      </div>
    </MainLayout>
  );
}

export default page;
