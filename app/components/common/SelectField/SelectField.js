import { useState, useEffect } from "react";
import { Dropdown, Menu } from "antd";
import styles from "./SelectField.module.css";

const SelectField = ({
  options = [],
  label,
  placeholder,
  value,
  onChange,
  customStyle,
  containerStyle,
  optionLabelProp = "label",
}) => {
  const isGrouped = options.some((opt) => opt.children);

  const [visibleLabel, setVisibleLabel] = useState("");

  useEffect(() => {
    if (!value) {
      setVisibleLabel("");
      return;
    }

    for (const group of options) {
      if (group.children) {
        const found = group.children.find((item) => item.value === value);
        if (found) {
          setVisibleLabel(optionLabelProp === "value" ? found.value : found.label);
          return;
        }
      } else if (group.value === value) {
        setVisibleLabel(optionLabelProp === "value" ? group.value : group.label);
        return;
      }
    }
  }, [value, options, optionLabelProp]);

  const buildMenu = () => (
    <Menu>
      {options.map((group) => (
        <Menu.SubMenu key={group.label} title={group.label}>
          {group.children.map((item) => (
            <Menu.Item
              key={item.value}
              onClick={() => onChange(item.value)}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  );

  return (
    <div className={styles.container} style={containerStyle}>
      {label && <label className={styles.label}>{label}</label>}
      <Dropdown overlay={buildMenu()} trigger={["click"]} placement="bottomLeft">
        <div className={styles.input} style={{ cursor: "pointer", ...customStyle }}>
          {visibleLabel || placeholder || "Select"}
        </div>
      </Dropdown>
    </div>
  );
};

export default SelectField;

