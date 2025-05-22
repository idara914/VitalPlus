import { Select, Dropdown, Menu } from "antd";
import styles from "./SelectField.module.css";

const { Option } = Select;
const [memberOptions, setMemberOptions] = useState([]);

const handleSearch = async (value) => {
  const res = await fetch(`/api/clinic-patients?search=${encodeURIComponent(value)}`);
  const data = await res.json();
  setMemberOptions(data);
const SelectField = ({
  options,
  label,
  placeholder,
  value,
  onChange,
  customStyle,
  containerStyle,
}) => {
  const isGrouped = options.some((opt) => opt.children);

  const getLabelForValue = (val) => {
    for (const group of options) {
      const match = group.children?.find((item) => item.value === val);
      if (match) return match.label;
    }
    return null;
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

  return (
    <div className={styles.container} style={containerStyle}>
      {label && <label className={styles.label}>{label}</label>}
      {isGrouped ? (
        <Dropdown overlay={buildMenu()} trigger={['click']} placement="bottomLeft">
          <div className={styles.input} style={{ cursor: 'pointer', ...customStyle }}>
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

