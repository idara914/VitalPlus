import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
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

export const runtime = "nodejs"; // ✅ ensures jwt works in Vercel

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/auth/login");

  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error("Invalid or expired token:", err.message);
    redirect("/auth/login");
  }

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
      key: 3,
      content: (
        <div className={styles.contentContainer}>
          <Heading text={"Tasks"} />
          <div className={styles.contentInner}>
            <Tasks />
          </div>
          <SearchBox />
        </div>
      ),
    },
    {
      label: "Claims",
      key: 4,
      content: (
        <div className={styles.contentContainer}>
          <Heading text={"Claims"} />
          <div className={styles.contentInner}>
            <Claims />
          </div>
          <SearchBox />
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
