import { Select, Cascader } from "antd";
import styles from "./SelectField.module.css";

const { Option } = Select;

const SelectField = ({
  options,
  label,
  placeholder,
  value,
  onChange,
  customStyle,
  containerStyle,
}) => {
  const isGrouped = options.some((opt) => opt.children); // Check for multilevel structure

  return (
    <div className={styles.container} style={containerStyle}>
      {label && <label className={styles.label}>{label}</label>}
      {isGrouped ? (
        <Cascader
          options={options}
          onChange={(val, selectedOptions) => {
            const finalValue = val[val.length - 1];
            onChange(finalValue);
          }}
          placeholder={placeholder}
          style={{ ...customStyle, zIndex: 9999 }} // add z-index directly
          popupClassName={styles.input}
          getPopupContainer={() => document.body} // force dropdown to root level
          dropdownRender={(menus) => (
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>{menus}</div>
          )}
        />
      ) : (
        <Select
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{ ...customStyle, zIndex: 9999 }}
          className={styles.input}
          getPopupContainer={() => document.body}
        >
          {options.map((opt) => (
            <Option key={opt.value} value={opt.value}>
              {opt.label}
            </Option>
          ))}
        </Select>
      )}
    </div>
  );
};

export default SelectField;

