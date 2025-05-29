import { Badge, Checkbox, DatePicker, Select, Tag } from "antd";
import MainLayout from "../../components/layouts/MainLayout";
import {
  Calendar,
  RotateCcw,
  Plus,
  Grid3X3,
  CalendarDays,
  MapPin,
  Clock,
  User,
  CircleCheck,
} from "lucide-react";
import Button from "../../components/common/Button/Button";

export default function Features() {
  const visits = [
    {
      id: 1,
      day: "Mon",
      date: "06",
      month: "January 2025",
      time: "9:00 AM",
      timeRange: "9:00 AM - 9:30 AM",
      location: "Room 201",
      provider: "Dr. Smith",
      visitType: "Hospice",
      reoccurring: true,
    },
    {
      id: 2,
      day: "Tue",
      date: "07",
      month: "January 2025",
      time: "10:30 AM",
      timeRange: "10:30 AM - 11:00 AM",
      location: "Clinic A",
      provider: "Dr. Adams",
      visitType: "Hospice",
      reoccurring: false,
    },
    {
      id: 3,
      day: "Wed",
      date: "08",
      month: "January 2025",
      time: "11:00 AM",
      timeRange: "11:00 AM - 11:30 AM",
      location: "Room 105",
      provider: "Nurse Brown",
      visitType: "Hospice",
      reoccurring: true,
    },
    {
      id: 4,
      day: "Thu",
      date: "09",
      month: "January 2025",
      time: "2:00 PM",
      timeRange: "2:00 PM - 2:30 PM",
      location: "Room 210",
      provider: "Dr. Lee",
      visitType: "Hospice",
      reoccurring: false,
    },
    {
      id: 5,
      day: "Fri",
      date: "10",
      month: "January 2025",
      time: "3:30 PM",
      timeRange: "3:30 PM - 4:00 PM",
      location: "Clinic B",
      provider: "Dr. Walker",
      visitType: "Hospice",
      reoccurring: true,
    },
    {
      id: 6,
      day: "Sat",
      date: "11",
      month: "January 2025",
      time: "1:00 PM",
      timeRange: "1:00 PM - 1:30 PM",
      location: "Room 202",
      provider: "Dr. Taylor",
      visitType: "Hospice",
      reoccurring: false,
    },
  ];

  return (
    <main>
      <MainLayout isSignedIn={true}>
        <div
          className="min-h-screen"
          style={{
            background: "#F3F4F6",
            padding: "20px",
            paddingBottom: "20px",
          }}
        >
          {/* Header Section */}
          <div className="px-6 py-6">
            <div
              className="flex items-center justify-between mb-6 flex-nowrap"
              style={{ margin: "10px 20px" }}
            >
              <h1 className="text-2xl font-semibold text-gray-900">Visits</h1>
              <div className="flex items-center space-x-4 flex-nowrap">
                <div className="flex items-center space-x-3 flex-nowrap">
                  <Checkbox> Select All</Checkbox>

                  <Button
                    text={
                      <div className="flex items-center text-sm space-x-2">
                        <CircleCheck className="w-4 h-4" />
                        <span style={{ marginLeft: "5px" }}>
                          Verify Selected
                        </span>
                      </div>
                    }
                    customStyle={{
                      padding: "6px 12px",
                      background: "#17B26A",
                      border: "1px solid #D1D5DB",
                      color: "#FFF",
                      marginRight: "10px",
                      marginLeft: "10px",
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Select
                      defaultValue={"patients"}
                      style={{
                        width: 150,
                        border: "1px solid #D1D5DB",
                        marginRight: "10px",
                        marginLeft: "10px",
                      }}
                      options={[
                        { value: "patients", label: <span>Patients</span> },
                      ]}
                    />

                    <Select
                      defaultValue={"service-provider"}
                      style={{
                        width: 150,
                        border: "1px solid #D1D5DB",
                        marginRight: "10px",
                        marginLeft: "10px",
                      }}
                      options={[
                        {
                          value: "service-provider",
                          label: <span>Service Provider</span>,
                        },
                      ]}
                    />

                    <DatePicker
                      style={{ marginRight: "10px", marginLeft: "10PX" }}
                    />

                    <Button
                      text={
                        <div className="flex items-center text-sm space-x-2">
                          <RotateCcw className="w-4 h-4" />
                          <span style={{ marginLeft: "5px" }}>Refresh</span>
                        </div>
                      }
                      customStyle={{
                        padding: "6px 12px",
                        background: "#fff",
                        border: "1px solid #D1D5DB",
                        color: "#374151",
                        marginRight: "10px",
                      }}
                    />

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
              </div>
            </div>
          </div>

          {/* Visits List */}
          <div className="px-6">
            <div className="space-y-0">
              {visits.map((visit, index) => (
                <div
                  key={visit.id}
                  className={`flex items-center py-4 px-4 bg-white border-b border-gray-100 p-16`}
                  style={{
                    padding: "16px 26px",
                  }}
                >
                  {/* Checkbox */}
                  <Checkbox />

                  {/* Date Column */}
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
                      {visit.day}
                    </span>
                    <span
                      className="text-xl font-bold"
                      style={{ color: "#3C3897", paddingBottom: "4px" }}
                    >
                      {visit.date}
                    </span>
                  </div>

                  {/* Visit Details */}
                  <div className="flex-1 grid grid-cols-3 gap-8">
                    {/* Left Column - Time & Location */}
                    <div className="space-y-2">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div className="text-lg font-semibold text-gray-900">
                          {visit.month}
                        </div>
                        <div
                          className="text-sm text-gray-600 font-medium"
                          style={{
                            marginLeft: "8px",
                            border: "1px solid #D1D5DB",
                            padding: "2px 8px",
                            borderRadius: "8px",
                          }}
                        >
                          {visit.time}
                        </div>
                      </div>
                      <div
                        className="flex items-center space-x-2 text-sm text-gray-600"
                        style={{
                          margin: "5px 0",
                        }}
                      >
                        <Clock className="w-4 h-4 text-gray-400 mr-4" />
                        <span style={{ marginLeft: "8px" }}>
                          <bold style={{ color: "#000" }}>Time:</bold>{" "}
                          {visit.timeRange}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400 mr-8" />
                        <span style={{ marginLeft: "8px" }}>
                          {" "}
                          <bold style={{ color: "#000" }}>Location:</bold>{" "}
                          {visit.location}
                        </span>
                      </div>
                    </div>

                    {/* Middle Column - Provider & Recurring */}
                    <div className="space-y-2" style={{ marginTop: "30px" }}>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <User className="w-4 h-4 text-gray-400 mr-8" />
                        <span style={{ marginLeft: "8px" }}>
                          <bold style={{ color: "#000" }}>
                            Service Provider:
                          </bold>{" "}
                          <span>{visit.provider}</span>
                        </span>
                      </div>
                      <div
                        className="flex items-center space-x-2 text-sm text-gray-600"
                        style={{
                          margin: "5px 0",
                        }}
                      >
                        <RotateCcw className="w-4 h-4 text-gray-400 mr-8" />
                        <span style={{ marginLeft: "8px" }}>
                          <bold style={{ color: "#000" }}> Reoccurring:</bold>
                          <Tag
                            style={{
                              backgroundColor: visit.reoccurring
                                ? "#D1FAE5"
                                : "#FEE2E2",
                              color: visit.reoccurring ? "#065F46" : "#B91C1C",
                              marginLeft: "8px",
                            }}
                          >
                            {" "}
                            {visit.reoccurring ? "Yes" : "No"}
                          </Tag>
                        </span>
                      </div>
                    </div>

                    {/* Right Column - Visit Type */}
                    <div className="space-y-2" style={{ marginTop: "30px" }}>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <User className="w-4 h-4 text-gray-400 mr-8" />
                        <span style={{ marginLeft: "5px" }}>
                          <bold style={{ color: "#000" }}> Visit Type:</bold>{" "}
                          <span>{visit.visitType}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    </main>
  );
}
