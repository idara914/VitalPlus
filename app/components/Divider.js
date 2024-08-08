import styles from "./Divider.module.css";

const Divider = ({ text }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: "20px 0",
      }}
    >
      <div
        style={{
          flex: 1,
          height: 1,
          backgroundColor: "rgba(113, 128, 150, 0.2)",
        }}
      ></div>
      <div
        style={{
          margin: "0 10px",
          fontSize: 16,
          fontWeight: 300,
          color: "#718096",
        }}
      >
        {text}
      </div>
      <div
        style={{
          flex: 1,
          height: 1,
          backgroundColor: "rgba(113, 128, 150, 0.2)",
        }}
      ></div>
    </div>
  );
};

export default Divider;
