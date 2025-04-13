"use client";

import styles from "../../assets/landing.module.css";
import Navbar from "../common/Navbar/Navbar";
import Footer from "../common/Footer/Footer";
import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";

export default function MainLayout({ children, isSignedIn = false }) {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("firstName");
    if (storedName) {
      setFirstName(storedName);
    }
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
        },
        components: {
          Dropdown: {
            paddingBlock: 10,
          },
        },
      }}
    >
      <div>
        <Navbar isSignedIn={isSignedIn} user={{ FirstName: firstName }} />
        {children && (
          <div className={styles.containerRightInner}>{children}</div>
        )}
        {!children && <div style={{ height: "100vh" }}></div>}
        <Footer />
      </div>
    </ConfigProvider>
  );
}

