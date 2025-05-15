"use client";

import styles from "./visitdetail.css";
import MainLayout from "../../components/layouts/MainLayout";

export default function Features() {
  return (
    <MainLayout isSignedIn={true}>
      <div className={styles.container}>
        {/* Visit Summary */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Visit Summary</h2>
          <div className={styles.infoGrid}>
            <InfoItem label="Visit ID" value="12345678" />
            <InfoItem label="Patient" value="Jane Smith" />
            <InfoItem label="Service Pro" value="John Willans CNA" />
            <InfoItem label="Date of Visit" value="04/22/2024 – 09:00 AM" />
            <InfoItem label="Duration" value="53 minutes" />
          </div>
        </div>

        {/* Service Details */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Service Details</h2>
          <div className={styles.infoGrid}>
            <InfoItem label="Service Type" value="Home Health Aide" />
            <InfoItem label="HCPCS/CPT" value="CQ-G0156" />
            <InfoItem label="Modifiers" value="TT" />
            <InfoItem label="Revenue Code" value="0571" />
            <InfoItem label="Diagnosis Code(s)" value="I10" />
          </div>
        </div>

        {/* EVV Data */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>EVV Data</h2>
          <div className={styles.infoGrid}>
            <InfoItem label="Verification Method" value="GPS" />
            <InfoItem label="Check-In" value="📍GI-s" />
            <InfoItem label="Check-Out" value="📍Check-Out" />
            <InfoItem label="Status" value="Verified" />
            <InfoItem label="Device Used" value="Caregiver's phone" />
          </div>
        </div>

        {/* Documentation & Notes */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Documentation & Notes</h2>
          <div className={styles.formGrid}>
            <div className={styles.formItemFull}>
              <label className={styles.infoLabel}>SOAP Note</label>
              <div className={styles.infoValue}>
                Assisted patient with bathing and dressing. No new issues reported.
              </div>
            </div>
            <div className={styles.formItem}>
              <label className={styles.infoLabel}>Caregiver Signature</label>
              <div className={styles.infoValue}>______________________</div>
            </div>
            <div className={styles.formItem}>
              <label className={styles.infoLabel}>Patient Signature</label>
              <div className={styles.infoValue}>______________________</div>
            </div>
            <div className={styles.formItem}>
              <label className={styles.infoLabel}>Attachment</label>
              <div className={styles.infoValue}>______________________</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.formActions}>
          <button className={styles.clearBtn}>Edit Visit</button>
          <button className={styles.nextBtn}>Approve Visit</button>
          <button className={styles.clearBtn}>Flag for Review</button>
          <button className={styles.clearBtn}>Print Visit Note</button>
          <button className={styles.nextBtn}>Add to Claim</button>
          <button className={styles.clearBtn}>Reject / Delete</button>
        </div>
      </div>
    </MainLayout>
  );
}

function InfoItem({ label, value }) {
  const styles = require("./visitdetail.css");
  return (
    <div className={styles.infoItem}>
      <div className={styles.infoLabel}>{label}</div>
      <div className={styles.infoValue}>{value}</div>
    </div>
  );
}
