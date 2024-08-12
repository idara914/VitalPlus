"use client";

import styles from "./Navbar.module.css";
import Logo from "../../../../public/logos/logo.png";
import Bell from "../../../../public/icons/bell.png";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Button from "../Button/Button";

const LoggedOutNavOptions = ({ isMobile, toggleMobileMenu }) => (
  <>
    <div className={styles.navOptions}>
      <Link href="/about" onClick={toggleMobileMenu}>
        About
      </Link>
      <Link href="/about" onClick={toggleMobileMenu}>
        Feature
      </Link>
      <Link href="/about" onClick={toggleMobileMenu}>
        Contact Us
      </Link>
    </div>
    <Link href="/get-started" onClick={toggleMobileMenu}>
      <Button text={"Get Started"} customStyle={{ padding: "10px 14px" }} />
    </Link>
  </>
);

const LoggedInNavOptions = ({ isMobile, toggleMobileMenu }) => (
  <>
    <div className={styles.navOptions}>
      <Link href="/user/member" onClick={toggleMobileMenu}>
        Member
      </Link>
      <Link href="/user/care-provider" onClick={toggleMobileMenu}>
        Care Provider
      </Link>
      <Link href="/user/visit" onClick={toggleMobileMenu}>
        Visit
      </Link>
      <Link href="/user/billing" onClick={toggleMobileMenu}>
        Billing
      </Link>
      <Link href="/user/action" onClick={toggleMobileMenu}>
        Action
      </Link>
      <Link href="/user/report" onClick={toggleMobileMenu}>
        Report
      </Link>
      <Link href="/user/resources" onClick={toggleMobileMenu}>
        Resources
      </Link>
    </div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Link
        href="/admin/dashboard"
        onClick={toggleMobileMenu}
        style={{ marginRight: "10px" }}
      >
        <Button text={"Admin"} customStyle={{ padding: "10px 14px" }} />
      </Link>
      <Image src={Bell} alt="bell" />
    </div>
  </>
);

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav className={styles.nav}>
      <Link href={"/"}>
        <Image src={Logo} alt="vitalplus" />
      </Link>
      {isLoggedIn ? (
        <LoggedInNavOptions
          isMobile={isMobile}
          toggleMobileMenu={toggleMobileMenu}
        />
      ) : (
        <LoggedOutNavOptions
          isMobile={isMobile}
          toggleMobileMenu={toggleMobileMenu}
        />
      )}
    </nav>
  );
};

export default Navbar;
