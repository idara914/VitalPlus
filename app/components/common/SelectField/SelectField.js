import { Select } from "antd";
import styles from "./SelectField.module.css";

const SelectField = ({
  options,
  label,
  type,
  placeholder,
  value,
  onChange,
  customStyle,
  containerStyle,
}) => {
  return (
    <div className={styles.container} style={containerStyle}>
      {label && <label className={styles.label}>{label}</label>}
      <Select
        className={styles.input}
        value={value}
        onChange={onChange}
        style={customStyle}
        placeholder={placeholder}
      >
        {options.map((e) => (
          <option value={e.Id} key={e.Id}>
            {e.Name}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default SelectField;
