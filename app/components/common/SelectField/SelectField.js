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
  const isGrouped = options.some((opt) => opt.children); // detect cascader format

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
  style={customStyle}
  popupClassName={styles.input}
  dropdownRender={(menus) => <div style={{ maxHeight: "1000px", overflowY: "auto" }}>{menus}</div>}
  getPopupContainer={(triggerNode) => document.body} // ✅ Forces dropdown to body
/>

      ) : (
        <Select
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={customStyle}
          className={styles.input}
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


