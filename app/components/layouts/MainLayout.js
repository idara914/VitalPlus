"use client";

import styles from "../../assets/landing.module.css";
import Navbar from "../common/Navbar/Navbar";
import Footer from "../common/Footer/Footer";
import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function MainLayout({ children, isSignedIn = false }) {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.firstName) setFirstName(decoded.firstName);
      } catch (err) {
        console.error("Invalid token", err);
      }
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
        <Navbar isSignedIn={isSignedIn} firstName={firstName} />
        {children && (
          <div className={styles.containerRightInner}>{children}</div>
        )}
        {!children && <div style={{ height: "100vh" }}></div>}
        <Footer />
      </div>
    </ConfigProvider>
  );
}

