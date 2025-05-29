import { useState, useEffect } from "react";
import { Select } from "antd";
import styles from "./SelectField.module.css";

const { Option, OptGroup } = Select;

const SelectField = ({
  options = [],
  label,
  placeholder,
  value,
  onChange,
  onSearch, // for dynamic search
  customStyle,
  containerStyle,
  showSearch = false,
  optionLabelProp = "label", // ✅ NEW prop with default
}) => {
  const [dynamicOptions, setDynamicOptions] = useState([]);

  useEffect(() => {
    if (!showSearch) return;
    setDynamicOptions(options); // initialize with props
  }, [options, showSearch]);

  const isGrouped = options.some((opt) => opt.children);

  const handleDynamicSearch = async (searchText) => {
    if (onSearch) {
      const results = await onSearch(searchText);
      setDynamicOptions(results);
    }
  };

  return (
    <div className={styles.container} style={containerStyle}>
      {label && <label className={styles.label}>{label}</label>}
      <Select
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={customStyle}
        className={styles.input}
        showSearch={showSearch}
        filterOption={!onSearch}
        onSearch={handleDynamicSearch}
        optionLabelProp={optionLabelProp} // ✅ dynamically control what shows in box
      >
        {(showSearch ? dynamicOptions : options).map((groupOrOption) =>
          groupOrOption.children ? (
            <OptGroup key={groupOrOption.label} label={groupOrOption.label}>
              {groupOrOption.children.map((item) => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </OptGroup>
          ) : (
            <Option key={groupOrOption.value} value={groupOrOption.value}>
              {groupOrOption.label}
            </Option>
          )
        )}
      </Select>
    </div>
  );
};

export default SelectField;

