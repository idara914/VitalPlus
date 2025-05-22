import { Select } from "antd";
import styles from "./SelectField.module.css";

const { Option, OptGroup } = Select;

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
        showSearch
        filterOption={(input, option) =>
          (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
        }
      >
        {options.map((opt) =>
          opt.options ? (
            <OptGroup key={opt.label} label={opt.label}>
              {opt.options.map((item) => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </OptGroup>
          ) : (
            <Option key={opt.value} value={opt.value}>
              {opt.label}
            </Option>
          )
        )}
      </Select>
    </div>
  );
};

export default SelectField;

