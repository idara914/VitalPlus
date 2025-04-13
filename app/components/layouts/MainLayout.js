"use client";

import styles from "../../assets/landing.module.css";
import Navbar from "../common/Navbar/Navbar";
import Footer from "../common/Footer/Footer";
import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MainLayout({ children, isSignedIn = false }) {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    axios
      .post("/api/user", {
        action: "getUserById",
        userId,
      })
      .then((res) => {
        if (res.data?.firstName) {
          setFirstName(res.data.firstName);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch user first name:", err);
      });
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

