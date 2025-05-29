import { Badge, Checkbox, DatePicker, Input, Select, Tag } from "antd";
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
  Search,
} from "lucide-react";
import Button from "../../components/common/Button/Button";
import TimeCard from "./TimeCard.jsx";

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
              <h1 className="text-2xl font-semibold text-gray-900">
                Visit Details for January 11, 2025
              </h1>
              <div className="flex items-center space-x-4 flex-nowrap">
                <Input placeholder="Search" style={{ marginRight: "10px" }} />
                <Button
                  customStyle={{
                    padding: "8px 12px",
                    marginRight: "10px",
                    color: "#7f3dff",
                    background: "transparent",
                    border: "1px solid #7f3dff",
                  }}
                  text={<Search className="w-4 h-4" />}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      text={
                        <div
                          className="flex items-center text-sm space-x-2 flex-nowrap"
                          style={{ width: "110px" }}
                        >
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
          <div
            className="px-6"
            style={{ marginTop: "20px", paddingLeft: "20px" }}
          >
            <div
              className="space-y-0"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
                gap: "20px",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              {visits.map((visit) => (
  <TimeCard key={visit.id} />
))}

              ))}
            </div>
          </div>
          <Button
            text={
              <div className="flex items-center text-sm space-x-2">
                <CircleCheck className="w-4 h-4" />
                <span style={{ marginLeft: "5px" }}>Verify Selected</span>
              </div>
            }
            customStyle={{
              padding: "6px 12px",
              background: "#17B26A",
              border: "1px solid #D1D5DB",
              color: "#FFF",
              marginTop: "20px",
            }}
          />
        </div>
      </MainLayout>
    </main>
  );
}
