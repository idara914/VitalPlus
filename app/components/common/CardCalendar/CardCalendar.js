import React from "react";
import { Calendar, ConfigProvider } from "antd";

const CardCalendar = () => {
  const wrapperStyle = {
    width: 400,
    borderRadius: "2px",
  };
  return (
    <div style={wrapperStyle}>
      <ConfigProvider
        theme={{
          components: {
            Calendar: {
              itemActiveBg: "#7f3dff",
            },
          },
        }}
      >
        <Calendar fullscreen={false} mode="month" />
      </ConfigProvider>
    </div>
  );
};
export default CardCalendar;
