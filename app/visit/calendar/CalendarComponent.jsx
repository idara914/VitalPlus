import React from "react";
import { Calendar, Grid3X3, Plus } from "lucide-react";
import Button from "../../components/common/Button/Button";

const CalendarComponent = () => {
  const appointments = {
    2: [
      {
        name: "Ali Khan",
        doctor: "Dr. Smith",
        time: "10:00 AM",
        type: "purple",
      },
      { name: "2 more...", isMore: true },
    ],
    6: [
      {
        name: "Fatima Noor",
        doctor: "Dr. Adams",
        time: "9:00 AM",
        type: "white",
      },
      { name: "3 more...", isMore: true },
    ],
    11: [
      {
        name: "Sara Ahmed",
        doctor: "Nurse Brown",
        time: "11:00 AM",
        type: "yellow",
      },
      { name: "3 more...", isMore: true },
    ],
    15: [
      {
        name: "Hamza Ali",
        doctor: "Dr. Walker",
        time: "9:30 AM",
        type: "white",
      },
      { name: "4 more...", isMore: true },
    ],
    21: [
      {
        name: "John Doe",
        doctor: "Dr. Smith",
        time: "11:30 AM",
        type: "yellow",
      },
      { name: "8 more...", isMore: true },
    ],
    23: [
      {
        name: "Zainab Bukhari",
        doctor: "Nurse Wilson",
        time: "10:00 AM",
        type: "purple",
      },
      { name: "2 more...", isMore: true },
    ],
    29: [
      {
        name: "Muhammad Bilal",
        doctor: "Dr. Khan",
        time: "9:30 AM",
        type: "white",
      },
      { name: "4 more...", isMore: true },
    ],
    31: [
      {
        name: "Sarah Khan",
        doctor: "Dr. Taylor",
        time: "9:00 AM",
        type: "white",
      },
      { name: "5 more...", isMore: true },
    ],
    1: [
      {
        name: "Ahmed Raza",
        doctor: "Dr. Lee",
        time: "6:00 AM",
        type: "yellow",
      },
      { name: "3 more...", isMore: true },
    ],
  };

  const getDaysInMonth = () => {
    const days = [];
    // Previous month end (30, 31)
    days.push({ day: 30, isCurrentMonth: false });
    days.push({ day: 31, isCurrentMonth: false });

    // Current month days (1-31)
    for (let i = 1; i <= 31; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }

    // Next month start (1, 2)
    days.push({ day: 1, isCurrentMonth: false });
    days.push({ day: 2, isCurrentMonth: false });

    return days;
  };

  const getAppointmentStyle = (type) => {
    switch (type) {
      case "purple":
        return "bg-purple-100 border-l-4 border-purple-500";
      case "yellow":
        return "bg-orange-100 border-l-4 border-orange-400";
      case "white":
      default:
        return "bg-gray-50 border-l-4 border-gray-300";
    }
  };

  const days = getDaysInMonth();

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#F3F4F6",
        padding: "20px",
        paddingBottom: "20px",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div
            className="flex flex-col items-center mr-8"
            style={{
              border: "1px solid #9E9E9E",
              borderRadius: "12px",
              margin: "0 16px",
            }}
          >
            <span
              className="text-xs text-gray-500 uppercase tracking-wide"
              style={{
                background: "rgb(158, 158, 158, 0.2)",
                padding: "4px 20px",
                borderRadius: "12px 12px 0 0",
                backgroundOpacity: 0.8,
              }}
            >
              Jan
            </span>
            <span
              className="text-xl font-bold"
              style={{ color: "#3C3897", paddingBottom: "4px" }}
            >
              10
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">January 2025</h1>
            <p className="text-gray-500 text-sm">Jan 1, 2025 – Jan 31, 2025</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            text={
              <div className="flex items-center text-sm space-x-2">
                <Plus className="w-4 h-4 mr-4" />
                <span style={{ marginLeft: "5px" }}>Create New</span>
              </div>
            }
            customStyle={{ padding: "6px 12px" }}
          />
        </div>
      </div>

      {/* Calendar Grid */}
      <div
        className="border border-gray-200 rounded-lg overflow-hidden"
        style={{ margin: "20px" }}
      >
        {/* Days of week header */}
        <div className="grid grid-cols-7 bg-gray-50">
          {["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div
              key={day}
              className="p-4 text-center text-sm font-medium text-gray-600 border-r border-gray-200 last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar body */}
        <div className="grid grid-cols-7">
          {days.map((dayObj, index) => {
            const dayAppointments = appointments[dayObj.day] || [];
            const isToday = dayObj.day === 10 && dayObj.isCurrentMonth;

            return (
              <div
                key={index}
                style={{
                  padding: "10px",
                }}
                className={`min-h-32 p-3 border-r border-b border-gray-200 last:border-r-0 ${
                  !dayObj.isCurrentMonth ? "bg-gray-50" : "bg-white"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span
                    className={`text-sm font-medium ${
                      !dayObj.isCurrentMonth
                        ? "text-gray-400"
                        : isToday
                        ? "bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs"
                        : "text-gray-900"
                    }`}
                  >
                    {dayObj.day}
                  </span>
                </div>

                {/* Appointments */}
                <div className="space-y-1">
                  {dayAppointments.map((appointment, idx) => (
                    <div key={idx}>
                      {appointment.isMore ? (
                        <div className="text-xs text-gray-500 mt-1">
                          {appointment.name}
                        </div>
                      ) : (
                        <div
                          className={`p-2 rounded text-xs ${getAppointmentStyle(
                            appointment.type
                          )}`}
                        >
                          <div className="font-medium text-gray-900 mb-1">
                            {appointment.name}
                          </div>
                          <div className="text-gray-600 mb-1">
                            {appointment.doctor}
                          </div>
                          {appointment.time && (
                            <div className="text-gray-500 text-right">
                              {appointment.time}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
