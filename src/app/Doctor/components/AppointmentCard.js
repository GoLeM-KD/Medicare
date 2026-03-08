"use client";
import React from "react";
import { Clock, User, FileText, CheckCircle } from "lucide-react";

export function AppointmentCard({ appointment, onClick }) {
  let formattedTime = "";

  if (appointment?.AptDateTime) {
    // Example: "2026-01-30T07:00:00.000Z"
    const rawTime = appointment.AptDateTime.split("T")[1]?.slice(0, 8); // "07:00:00" // 05:00:00.000
    console.log("WORKS...1", rawTime);
    if (rawTime) {
      const [hour, minute] = rawTime.split(":");

      const hourNum = parseInt(hour);
      const ampm = hourNum >= 12 ? "PM" : "AM";
      const displayHour = hourNum % 12 || 12;

      formattedTime = `${displayHour}:${minute} ${ampm}`;
    }
  }

  return (
    <div
      onClick={onClick}
      className="bg-white border-2 border-blue-100 rounded-lg p-4 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{appointment.Name}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{formattedTime}</span>
            </div>
          </div>
        </div>
        {appointment.Status === 1 && (
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Checked</span>
          </div>
        )}
      </div>

      <div className="flex items-start gap-2 bg-blue-50 rounded-lg p-3">
        <FileText className="w-4 h-4 text-blue-600 mt-0.5" />
        <div>
          <p className="text-sm text-gray-600">Reason for visit</p>
          <p className="text-sm font-medium text-gray-900">
            {appointment.Reason}
          </p>
        </div>
      </div>
    </div>
  );
}
