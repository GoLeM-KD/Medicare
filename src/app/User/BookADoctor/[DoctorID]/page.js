"use client";
import React, { useEffect, useState, use } from "react";

export default function Page({ params }) {
  const resolvedParams = use(params);
  const doctorID = resolvedParams.DoctorID;

  const [choosedDoctor, setChoosedDoctor] = useState([]); // Holding all datas of the choosed Docotor
  const [name, setName] = useState(""); // Holding Name Input Value
  const [dateAndTime, setDateAndTime] = useState(""); // Holding Date and Time Input Value
  const [reason, setReason] = useState(""); // Holding Reason Textarea Value
  const [tokenR, setTocken] = useState(""); // Holding User Token Value

  // Handeling the Laoding screen
  const [isAppointmentLoading, setAppointmentLoading] = useState(false); // appointment loading state

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      const res = await fetch(
        `/api/user/getDoctor/getDoctorDetails?DoctorID=${doctorID}`
      );
      const tokenRes = await fetch("/api/token");

      const TokenData = await tokenRes.json();
      const data = await res.json();

      setChoosedDoctor(data);
      setTocken(TokenData.token);

      console.log(data);
    };

    fetchDoctorDetails();
  }, [doctorID]);

  const handleSubmitAppointment = async () => {
    /*
        We catch the cookie becuse 
        we have stored the userID in the token cookie
        then we can get the UserID from there
    */
    setAppointmentLoading(true);
    const formData = new FormData();
    formData.append("Pname", name);
    formData.append("dateAndTime", dateAndTime);
    formData.append("reason", reason);
    formData.append("DoctorID", doctorID);
    formData.append("UserID", tokenR);

    const res = await fetch("../../api/user/getDoctor/submitAppointment", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(dateAndTime);

    if (res.ok && data.message == "S") {
      alert(
        `Appointment Submitted Successfully. Your Appointment ID is ${data.apt}`
      );
    } else {
      alert("Failed to submit appointment");
    }
    setAppointmentLoading(false);
  };

  return (
    <div className="mt-20">
      {choosedDoctor.length > 0 ? (
        choosedDoctor.map((doctor) => (
          <div key={doctor.DoctorID} className="border p-4 mb-4">
            <h1 className="text-xl font-bold mb-2">{doctor.name}</h1>
          </div>
        ))
      ) : (
        <p>Loading doctor details...</p>
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Name"
          name="Pname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-1 border-black"
        />

        <input
          type="datetime-local"
          className="border-1 border-black"
          name="dateAndTime"
          value={dateAndTime}
          onChange={(e) => setDateAndTime(e.target.value)}
        />

        <textarea
          placeholder="Your reason short and sweet"
          name="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="border-1 border-black"
        />

        {isAppointmentLoading ? (
          <button className="border-1 border-black bg-[#88b5ba] hover:cursor-pointer pl-[10px] pr-[10px]">
            Placing...
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmitAppointment}
            className="border-1 border-black bg-[#88b5ba] hover:cursor-pointer pl-[10px] pr-[10px]"
          >
            Place the Appointment
          </button>
        )}
      </form>
    </div>
  );
}
