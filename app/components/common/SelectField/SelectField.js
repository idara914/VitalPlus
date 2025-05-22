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
  style={{ ...customStyle, zIndex: 10000 }}
  popupClassName={styles.input}
  getPopupContainer={() => document.body} // Force to body
  dropdownRender={(menus) => (
    <div
      style={{
        maxHeight: "500px",
        overflowY: "auto",
        backgroundColor: "#fff",
        zIndex: 10000,
      }}
    >
      {menus}
    </div>
  )}
  popupStyle={{
    maxHeight: "500px",
    overflowY: "auto",
    zIndex: 10000,
    position: "absolute",
  }}
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

