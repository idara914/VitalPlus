import styles from "./Button.module.css";

const Button = ({
  text,
  onClick,
  customStyle = {},
  disabled = false,
  type = "submit",
  ...others
}) => {
  return (
    <button
      className={styles.btn}
      style={customStyle}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...others}
    >
      {text}
    </button>
  );
};

export default Button;
