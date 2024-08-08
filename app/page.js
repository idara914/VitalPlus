import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>THIS IS THE LANDING PAGE</h1>
      <Link href={"/auth/login"}>Login Page</Link>
      <Link href={"/auth/register"}>Register Page</Link>
    </main>
  );
}
