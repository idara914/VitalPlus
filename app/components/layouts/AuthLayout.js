"use client";

import styles from "../../assets/auth.module.css";
import LogoWhite from "../../../public/logos/logo-white.png";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ heading, text, children }) {
  return (
    <section className={styles.container}>
      <div className={styles.containerLeft}>
        <div className={styles.containerLeftInner}>
          <h1 className={styles.heading}>{heading}</h1>
          <Link href="https://www.vital-plus.xyz/">
            <Image
              src={LogoWhite}
              alt="vitalplus"
              style={{ cursor: "pointer" }}
            />
          </Link>
          <p className={styles.paragraph}>{text}</p>
        </div>
      </div>
      <div className={styles.containerRight}>
        <div className={styles.containerRightInner}>{children}</div>
      </div>
    </section>
  );
}
