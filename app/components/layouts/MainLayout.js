
"use client";

import styles from "../../assets/landing.module.css";
import Navbar from "../common/Navbar/Navbar";
import Footer from "../common/Footer/Footer";
import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function MainLayout({ children, isSignedIn = false }) {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const fetchUserFirstName = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const userId = decoded?.id;

        if (!userId) return;

        const res = await axios.post("/api/user-info", { userId });
        if (res.data?.firstName) {
          setFirstName(res.data.firstName);
        }
      } catch (err) {
        console.error("Error fetching user first name:", err);
      }
    };

    fetchUserFirstName();
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
