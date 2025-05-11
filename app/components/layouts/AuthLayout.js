import styles from "../../assets/auth.module.css";
import LogoWhite from "../../../public/logos/logo-white.png";
import Image from "next/image";

export default function AuthLayout({ heading, text, children }) {
  return (
    <section className={styles.container}>
      <div className={styles.containerLeft}>
        <div className={styles.containerLeftInner}>
          <h1 className={styles.heading}>{heading}</h1>
          <Image src={LogoWhite} alt="vitalplus" />
          <p className={styles.paragraph}>{text}</p>
        </div>
      </div>
      <div className={styles.containerRight}>
        <div className={styles.containerRightInner}>{children}</div>
      </div>
    </section>
  );
}
