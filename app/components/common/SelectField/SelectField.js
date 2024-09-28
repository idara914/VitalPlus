import styles from "./SelectField.module.css";

const SelectField = ({
  options,
  label,
  type,
  placeholder,
  value,
  onChange,
  customStyle,
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <select
        className={styles.input}
        value={value}
        onChange={onChange}
        style={customStyle}
      >
        {options.map(e => <option value="{e.Id}" key={e.Id}>{e.Name}</option>)}
        </select>
    </div>
  );
};

export default SelectField;
