import { useEffect, useState } from "react";
import { Dropdown, Menu } from "antd";
import styles from "./SelectField.module.css";

const SelectField = ({
  options = [],
  label,
  placeholder = "Select",
  value,
  onChange,
  customStyle,
  containerStyle,
  optionLabelProp = "label",
}) => {
  const [visibleLabel, setVisibleLabel] = useState("");

  // Set label on mount and when value/options change
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
      }
    }
  }, [value, options, optionLabelProp]);

  const buildMenu = () => (
    <Menu className={styles.dropdownMenu}>
      {options.map((group) =>
        group.children ? (
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
        ) : null
      )}
    </Menu>
  );

  return (
    <div className={styles.container} style={containerStyle}>
      {label && <label className={styles.label}>{label}</label>}
      <Dropdown overlay={buildMenu()} trigger={["click"]} placement="bottomLeft">
        <div
          className={styles.input}
          style={{
            cursor: "pointer",
            ...customStyle,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {visibleLabel || placeholder}
        </div>
      </Dropdown>
    </div>
  );
};

export default SelectField;
