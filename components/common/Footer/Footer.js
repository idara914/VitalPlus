// import Image from "next/image";
import styles from "./Footer.module.css";
// import TwitterLogo from "../../../../public/icons/twitter.svg";
import Link from "next/link";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerTopLeft}>
          <p>
            This is a big one and i consider it one of the most important things
            for a business.
          </p>
          <div>
            {/* <Image src={TwitterLogo} alt="twitter" />
            <Image src={TwitterLogo} alt="twitter" />
            <Image src={TwitterLogo} alt="twitter" />
            <Image src={TwitterLogo} alt="twitter" /> */}
          </div>
        </div>
        <div className={styles.footerTopRight}>
          <ul>
            <h3>Quick Links</h3>
            <li>
              <Link href={"/home"}>Home</Link>
            </li>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            <li>
              <Link href={"/appointment"}>Appointment</Link>
            </li>
            <li>
              <Link href={"/blog"}>Blog</Link>
            </li>
            <li>
              <Link href={"/contact"}>Contact</Link>
            </li>
          </ul>
          <ul>
            <h3>Company</h3>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            <li>
              <Link href={"/contact"}>Contact</Link>
            </li>
            <li>
              <Link href={"/careers"}>Careers</Link>
            </li>
            <li>
              <Link href={"/press"}>Press</Link>
            </li>
          </ul>
          <ul>
            <h3>Information</h3>
            <li>
              <Link href={"/privacy-policy"}>Privacy Policy</Link>
            </li>
            <li>
              <Link href={"/terms-and-condition"}>Terms & Condition</Link>
            </li>
            <li>
              <Link href={"/faq"}>FAQ</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>Copyright © 2024 Solifuge</p>
        <p>All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
