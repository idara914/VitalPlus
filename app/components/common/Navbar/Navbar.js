"use client";

import styles from "./Navbar.module.css";
import Logo from "../../../../public/logos/logo.png";
import Bell from "../../../../public/icons/bell.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "../Button/Button";
import { Dropdown } from "antd";
import {
  resourseItems,
  adminItems,
  reportItems,
  memberItems,
  careProviderItems,
  visitItems,
  actionItems,
  billingItems,
} from "./helpers";

const LoggedOutNavOptions = ({ isMobile, toggleMobileMenu }) => (
  <>
    <div className={styles.navOptions}>
      <Link href="/aboutus" onClick={toggleMobileMenu}>
        About
      </Link>
      <Link href="/features" onClick={toggleMobileMenu}>
        Feature
      </Link>
      <Link href="/contact-us" onClick={toggleMobileMenu}>
        Contact Us
      </Link>
    </div>
    <Link href="/auth/register" onClick={toggleMobileMenu}>
      <Button text={"Get Started"} customStyle={{ padding: "10px 14px" }} />
    </Link>
  </>
);

const LoggedInNavOptions = ({ isMobile, toggleMobileMenu, pushToRoute }) => (
  <>
    <div className={styles.navOptions}>
      <Dropdown
        menu={{
          items: memberItems,
        }}
      >
        <Link href="#" onClick={toggleMobileMenu}>
          Member
        </Link>
      </Dropdown>
      <Dropdown
        menu={{
          items: careProviderItems,
        }}
      >
        <Link h href="#" onClick={toggleMobileMenu}>
          Care Provider
        </Link>
      </Dropdown>
      <Dropdown
        menu={{
          items: visitItems,
        }}
      >
        <Link href="#" onClick={toggleMobileMenu}>
          Visit
        </Link>
      </Dropdown>
      <Dropdown
        menu={{
          items: billingItems,
        }}
      >
        <Link href="#" onClick={toggleMobileMenu}>
          Billing
        </Link>
      </Dropdown>
      <Dropdown
        menu={{
          items: actionItems,
        }}
      >
        <Link href="#" onClick={toggleMobileMenu}>
          Action
        </Link>
      </Dropdown>
      <Dropdown
        menu={{
          items: reportItems,
        }}
      >
        <Link href="#" onClick={toggleMobileMenu}>
          Report
        </Link>
      </Dropdown>
      <Dropdown
        menu={{
          items: resourseItems,
        }}
      >
        <Link href="#" onClick={toggleMobileMenu}>
          Resources
        </Link>
      </Dropdown>
    </div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Dropdown
        menu={{
          items: adminItems,
        }}
      >
        <Link
          href="#"
          onClick={toggleMobileMenu}
          style={{ marginRight: "10px" }}
        >
          <Button text={"Admin"} customStyle={{ padding: "10px 14px" }} />
        </Link>
      </Dropdown>
      <Dropdown
        menu={{
          items: [
            {
              label: (
                <Link href={"/admin/notifications"}>User 1 logged in</Link>
              ),
              key: "0",
            },
            {
              type: "divider",
            },
            {
              label: (
                <Link href={"/admin/notifications"}>User 2 logged in</Link>
              ),
              key: "2",
            },
          ],
        }}
      >
        <Image src={Bell} alt="bell" style={{ cursor: "pointer" }} />
      </Dropdown>
    </div>
  </>
);

const Navbar = ({ isSignedIn }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isSignedIn);
  }, [isSignedIn]);

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
