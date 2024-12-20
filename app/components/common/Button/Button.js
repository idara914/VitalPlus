import Image from "next/image";
import styles from "./Button.module.css";

const Button = ({ text, customStyle, postImage }) => {
  return (
    <button className={styles.btn} style={customStyle}>
      {text}
      {postImage && <Image src={postImage} style={{ marginLeft: 10 }} />}
    </button>
  );
};

export default Button;
