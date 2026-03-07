'use client'
import React from "react";
import { X, User, FileText, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";

export function AppointmentDetailDialog({
  appointment,
  onClose,
  onCheck,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 rounded-t-xl flex items-center justify-between">
          <h2 className="text-xl font-semibold">Appointment Details</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 rounded-full p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Patient Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Patient Name</p>
                <p className="font-semibold text-lg text-gray-900">
                  {appointment.patientName}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Reason for Visit</p>
                  <p className="font-medium text-gray-900">{appointment.reason}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 text-sm">
              <div className="flex-1 bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 mb-1">Date</p>
                <p className="font-medium text-gray-900">
                  {new Date(appointment.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500 mb-1">Time</p>
                <p className="font-medium text-gray-900">{appointment.time}</p>
              </div>
            </div>
          </div>

          {/* Status */}
          {appointment.checked && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Patient Checked</p>
                <p className="text-sm text-green-700">
                  This appointment has been reviewed
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Close
            </Button>
            {!appointment.checked && (
              <Button
                onClick={() => onCheck(appointment.id)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Check Patient
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
