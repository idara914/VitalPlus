import styles from "./Button.module.css";

const Button = ({ text, customStyle }) => {
  return (
    <button className={styles.btn} style={customStyle}>
      {text}
    </button>
  );
};

export default Button;
