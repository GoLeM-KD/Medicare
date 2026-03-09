"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { DateFilter } from "./components/DateFilter";
import { AppointmentCard } from "./components/AppointmentCard";
import { AppointmentDetailDialog } from "./components/AppointmentDetailDialog";

export default function page() {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filterDate, setFilterDate] = useState(
    new Date().toLocaleDateString("en-CA"),
  ); // Today's date
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      const respond = await fetch(`../api/doctor/appointment?dt=${filterDate}`);
      const result = await respond.json();
      console.log("ADOOOOO", result.datas);
      setAppointments(result.datas);
    };

    getAppointments();
  }, [filterDate]);

  const handleCheckDB = async (id) => {
    const formData = new FormData();
    formData.append("aptID", id);

    const respond = await fetch(`../api/doctor/appointment`, {
      method: "PUT",
      body: formData,
    });

    const result = await respond.json();

    if (!result.success) {
      alert(result.ERROR);
      return;
    }
  };

  const handleCheck = async (id) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.AptID === id ? { ...apt, Status: 1 } : apt)),
    );
    await handleCheckDB(id);
    setSelectedAppointment(null);
  };

  const checkedAppointments = appointments.filter((a) => a.Status === 1);

  return appointments ? (
    <div className="max-w-5xl min-h-screen mx-auto pl-[15px] md:pl-0 pr-[15px] md:pr-0 pt-[30px] mb-[30px]">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-[24px] md:text-3xl  font-bold text-gray-900 mb-2">
          Appointments Dashboard
        </h1>
        <p className="text-gray-600">
          Manage and review your patient appointments
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-blue-100">Today's Appointments</p>
            {/* <Calendar className="w-5 h-5 text-blue-200" /> */}
          </div>
          <p className="text-3xl font-bold">{appointments.length}</p>
        </div>
        <div className="bg-white border-2 border-blue-100 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Checked</p>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm font-semibold">✓</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{checkedAppointments.length}</p>
        </div>
        <div className="bg-white border-2 border-blue-100 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Remaining</p>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-semibold">•••</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{appointments.length - checkedAppointments.length}</p>
        </div>
      </div>

      {/* Date Filter */}
      <div className="mb-6">
        <DateFilter selectedDate={filterDate} onDateChange={setFilterDate} />
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {filterDate === "2026-03-07"
            ? "Today's Schedule"
            : "Upcoming Schedule"}
          <span className="text-gray-500 font-normal ml-2">
            ({appointments.length} appointments)
          </span>
        </h2>
        {appointments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.AptID}
                appointment={appointment}
                onClick={() => setSelectedAppointment(appointment)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-blue-50 border-2 border-blue-100 rounded-xl p-8 text-center">
            <Calendar className="w-12 h-12 text-blue-300 mx-auto mb-3" />
            <p className="text-gray-600">
              No appointments scheduled for this date
            </p>
          </div>
        )}
      </div>

      {/* Appointment Detail Dialog */}
      {selectedAppointment && (
        <AppointmentDetailDialog
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onCheck={handleCheck}
        />
      )}
    </div>
  ) : (
    <div className="w-full h-screen flex justify-center items-center">
      Loading ...
    </div>
  );
}
