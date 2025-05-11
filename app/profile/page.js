"use client";

import { useState } from "react";
import { Input, Button, Tabs } from "antd";
import styles from "./profile.module.css";
import MainLayout from "../components/layouts/MainLayout";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("details");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const items = [
    {
      key: "details",
      label: "My details",
      children: <AccountDetailsTab />,
    },
    {
      key: "password",
      label: "Change Password",
      children: <ChangePasswordTab />,
    },
  ];

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.content}>
          <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            items={items}
            className={styles.customTabs}
          />
        </div>
      </div>
    </MainLayout>
  );
}

function AccountDetailsTab() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>Account Details</h2>
        <p>Update your profile information here.</p>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Email</label>
          <Input defaultValue="mjackson@example.com" className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label>Phone</label>
          <Input defaultValue="(123) 456-7890" className={styles.input} />
        </div>
      </div>

      <div className={styles.infoList}>
        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>First Name</div>
          <div className={styles.infoValue}>Mark</div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>Last Name</div>
          <div className={styles.infoValue}>Jackson</div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>Username</div>
          <div className={styles.infoValue}>mjackson</div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>Role</div>
          <div className={styles.infoValue}>Caregiver</div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>Status</div>
          <div className={styles.infoValue}>
            <span className={styles.statusDot}></span> Active
          </div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>Last Login</div>
          <div className={styles.infoValue}>April 29, 2025 – 11:08 AM</div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>Created Date</div>
          <div className={styles.infoValue}>March 4, 2025</div>
        </div>
      </div>

      <div className={styles.actions}>
        <Button className={styles.cancelButton}>Cancel</Button>
        <Button type="primary" className={styles.saveButton}>
          Save Profile
        </Button>
      </div>
    </div>
  );
}

function ChangePasswordTab() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>Password</h2>
        <p>Please enter your current password to change your password.</p>
      </div>

      <div className={styles.passwordForm}>
        <div className={styles.formField}>
          <div className={styles.fieldRow}>
            <label className={styles.fieldLabel}>
              Current password <span className={styles.required}>*</span>
            </label>
            <Input.Password
              className={styles.passwordInput}
              defaultValue="••••••••"
            />
          </div>
        </div>

        <div className={styles.formField}>
          <div className={styles.fieldRow}>
            <label className={styles.fieldLabel}>
              New password <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <Input.Password
                className={styles.passwordInput}
                defaultValue="••••••••"
              />
              <div className={styles.passwordHint}>
                Your new password must be more than 8 characters.
              </div>
            </div>
          </div>
        </div>

        <div className={styles.formField}>
          <div className={styles.fieldRow}>
            <label className={styles.fieldLabel}>
              Confirm new password <span className={styles.required}>*</span>
            </label>
            <Input.Password
              className={styles.passwordInput}
              defaultValue="••••••••"
            />
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Button className={styles.cancelButton}>Cancel</Button>
        <Button type="primary" className={styles.updateButton}>
          Update password
        </Button>
      </div>
    </div>
  );
}
