// components/TimeCard.tsx
import Image from "next/image";
import {
  Pencil,
  ClipboardList,
  Clock,
  MapPin,
  Briefcase,
  User,
  Edit,
  MoreHorizontal,
} from "lucide-react";
import { Avatar, Checkbox } from "antd";

export default function TimeCard({
  name,
  timeIn,
  timeOut,
  location,
  serviceProvider,
  color,
}) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl mx-auto shadow-sm"
      style={{
        borderLeft: `4px solid ${color || "#17B26A"}`,
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        className="flex items-center justify-between mb-8"
        style={{ paddingBottom: "10px" }}
      >
        <div className="flex items-center gap-4">
          <Avatar size="large" icon={<User />} />
          <h1 className="text-2xl font-semibold text-gray-900">Ammar Test</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Edit className="w-5 h-5 text-gray-600" />
          </button>
          <Checkbox />
        </div>
      </div>

      <div className="space-y-4 mb-8" style={{ paddingTop: "5px" }}>
        <div className="flex items-center gap-4">
          <Clock className="w-5 h-5 text-gray-400" />
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-medium">Time in:</span>
            <span className="text-gray-400">2:00 AM</span>
          </div>
        </div>

        <div className="flex items-center gap-4" style={{ paddingTop: "5px" }}>
          <Clock className="w-5 h-5 text-gray-400" />
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-medium">Time out:</span>
            <span className="text-gray-400">1:30 AM</span>
          </div>
        </div>

        <div
          className="flex items-center gap-4"
          style={{ paddingTop: "5px", paddingBottom: "5px" }}
        >
          <MapPin className="w-5 h-5 text-gray-400" />
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-medium">Location:</span>
            <span className="text-gray-400">Test</span>
          </div>
        </div>
      </div>

      <div
        className="border-t border-gray-200 pt-6"
        style={{ paddingTop: "15px", paddingBottom: "5px" }}
      >
        <div className="flex items-center gap-4">
          <Briefcase className="w-5 h-5 text-gray-400" />
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-medium">Service Provider:</span>
            <span className="text-gray-400">test</span>
          </div>
        </div>
      </div>
    </div>
  );
}
