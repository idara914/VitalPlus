import { useState, useEffect } from "react";
import { Select, Dropdown, Menu } from "antd";
import styles from "./SelectField.module.css";

const { Option } = Select;

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
}) => {
  const [dynamicOptions, setDynamicOptions] = useState([]);

  useEffect(() => {
    if (!showSearch) return;
    setDynamicOptions(options); // initialize with props
  }, [options, showSearch]);

  const isGrouped = options.some((opt) => opt.children);

  const getLabelForValue = (val) => {
    for (const group of options) {
      const match = group.children?.find((item) => item.value === val);
      if (match) return match.label;
    }
    const match = options.find((item) => item.value === val);
    return match?.label || null;
  };

  const buildMenu = () => (
    <Menu>
      {options.map((group) => (
        <Menu.SubMenu key={group.label} title={group.label}>
          {group.children.map((item) => (
            <Menu.Item key={item.value} onClick={() => onChange(item.value)}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  );

  const handleDynamicSearch = async (searchText) => {
    if (onSearch) {
      const results = await onSearch(searchText);
      setDynamicOptions(results);
    }
  };

  return (
    <div className={styles.container} style={containerStyle}>
      {label && <label className={styles.label}>{label}</label>}
      {isGrouped ? (
        <Dropdown overlay={buildMenu()} trigger={["click"]} placement="bottomLeft">
          <div className={styles.input} style={{ cursor: "pointer", ...customStyle }}>
            {getLabelForValue(value) || placeholder}
          </div>
        </Dropdown>
      ) : (
        <Select
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={customStyle}
          className={styles.input}
          showSearch={showSearch}
          filterOption={false}
          onSearch={handleDynamicSearch}
          options={showSearch ? dynamicOptions : options}
        >
          {(showSearch ? dynamicOptions : options).map((opt) => (
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


