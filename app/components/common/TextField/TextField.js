import styles from "./TextField.module.css";

const TextField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  customStyle,
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={customStyle}
      />
    </div>
  );
};

export default TextField;
