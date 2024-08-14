import React from "react";
import styles from "./Tasks.module.css";
import { Radio } from "antd";
import EmptyCircle from "../../../../../public/icons/empty-circle.png";
import DoneCircle from "../../../../../public/icons/done-circle.png";
import Image from "next/image";

const TaskCard = ({ text, isDone, borderColor }) => (
  <div
    className={styles.taskCard}
    style={{
      border: `1px solid ${borderColor}`,
    }}
  >
    <Image src={isDone ? DoneCircle : EmptyCircle} alt="in-progress" />
    <p>{text}</p>
  </div>
);

function Tasks() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h2>To Do</h2>
        <TaskCard
          borderColor={"#E0E0E0"}
          text={"Define primary and secondary color for this proejcet"}
        />
        <TaskCard
          borderColor={"#E0E0E0"}
          text={"Define primary and secondary color for this proejcet"}
        />
      </div>
      <div className={styles.innerContainer}>
        <h2>In Progress</h2>
        <TaskCard
          borderColor={"#92E3A9"}
          text={"Define primary and secondary color for this proejcet"}
        />
        <TaskCard
          borderColor={"#92E3A9"}
          text={"Define primary and secondary color for this proejcet"}
        />
        <TaskCard
          borderColor={"#92E3A9"}
          text={"Define primary and secondary color for this proejcet"}
        />
      </div>
      <div className={styles.innerContainer}>
        <h2>Done</h2>
        <TaskCard
          isDone={true}
          borderColor={"#7F3DFF"}
          text={"Define primary and secondary color for this proejcet"}
        />
        <TaskCard
          isDone={true}
          borderColor={"#7F3DFF"}
          text={"Define primary and secondary color for this proejcet"}
        />
      </div>
    </div>
  );
}

export default Tasks;
