import styles from "./Stepper.module.css";
import { Steps as AntdStepper } from "antd";
import StepIcon from "../../../../public/icons/step.svg";
import UnselectedIcon from "../../../../public/icons/step-unselected.svg";
import StepCompletedIcon from "../../../../public/icons/step-completed.svg";
import Image from "next/image";

function Stepper({ steps, currentStep }) {
  return (
    <AntdStepper
      labelPlacement="vertical"
      items={steps.map((step, index) => ({
        title: (
          <p
            style={{
              color: index <= currentStep ? "#7F3DFF" : "#4E5157",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "20px",
              marginTop: "-10px",
            }}
          >
            {step.title}
          </p>
        ),
        icon: (
          <Image
            src={
              index < currentStep
                ? StepCompletedIcon
                : index === currentStep
                ? StepIcon
                : UnselectedIcon
            }
            alt="step"
            width={24}
            height={24}
          />
        ),
      }))}
      current={currentStep}
      className={styles.stepper}
      style={{
        "--ant-steps-line-color": "#e0e0e0",
        "--ant-steps-finish-line-color": "#1890ff",
      }}
    />
  );
}

export default Stepper;
