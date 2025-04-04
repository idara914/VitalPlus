import styles from "./Button.module.css";

const Button = ({ text, onClick, customStyle = {}, disabled = false, type = "button" }) => {
  return (
    <button
      className={styles.btn}
      style={customStyle}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
