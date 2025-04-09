"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/app/components/layouts/MainLayout";
import Tabs from "@/app/components/common/Tabs/Tabs";
import SearchBox from "./components/SearchBox";
import Heading from "./components/Heading";
import Claims from "./TabsContent/Claims/Claims";
import Materials from "./TabsContent/Materials/Materials";
import Visits from "./TabsContent/Visits/Visits";
import Payments from "./TabsContent/Payments/Payments";
import Tasks from "./TabsContent/Tasks/Tasks";
import styles from "./page.module.css";

export default function DashboardPage() {
  const router = useRouter();
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.replace("/auth/login");
    } else {
      setUserLoaded(true);
    }
  }, [router]);

  if (!userLoaded) return null; // Prevent flashing before user check

  const options = [
    {
      label: "Payments",
      key: 0,
      content: (
        <div className={styles.contentContainer}>
          <Heading text={"Recent Payments"} />
          <div className={styles.contentInner}>
            <Payments />
          </div>
          <SearchBox />
        </div>
      ),
    },
    {
      label: "Visits",
      key: 1,
      content: (
        <div className={styles.contentContainer}>
          <Heading text={"Visits History"} />
          <div className={styles.contentInner}>
            <Visits />
          </div>
          <SearchBox />
        </div>
      ),
    },
    {
      label: "Materials",
      key: 2,
      content: (
        <div className={styles.contentContainer}>
          <Heading text={"Materials"} />
          <div className={styles.contentInner}>
            <Materials />
          </div>
          <SearchBox />
        </div>
      ),
    },
    {
      label: "Tasks",
      key
