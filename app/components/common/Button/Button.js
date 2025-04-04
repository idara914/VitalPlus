import Image from "next/image";
import styles from "./Button.module.css";

export default function Button({ text, onClick, customStyle = {}, disabled = false, postImage }) {
  return (
    <button
      className={styles.btn}
      style={customStyle}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {text}
      {postImage && (
        <Image
          src={postImage}
          alt=""
          width={16}
          height={16}
          style={{ marginLeft: 10 }}
        />
      )}
    </button>
  );
}
