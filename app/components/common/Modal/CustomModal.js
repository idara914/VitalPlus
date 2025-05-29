import React, { ReactNode } from "react";
import { Modal } from "antd";
import styles from "./CustomModal.module.css";

const CustomModal = ({
  title,
  open,
  onCancel,
  children,
  footer,
  width = 600,
}) => {
  return (
    <Modal
      title={null}
      open={open}
      onCancel={onCancel}
      centered
      footer={null}
      closable={false}
      width={width}
      // className={styles.customModal}
      maskClosable={true}
      // style={{ borderRadius: "20px" }}
    >
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>{title}</div>
          <button className={styles.closeButton} onClick={onCancel}>
            ×
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
        {footer && <div className={styles.modalFooter}>{footer}</div>}
      </div>
    </Modal>
  );
};

export default CustomModal;
