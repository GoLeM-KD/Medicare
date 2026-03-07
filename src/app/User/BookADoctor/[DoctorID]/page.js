"use client";
import Image from "next/image";
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
        `/api/user/getDoctor/getDoctorDetails?DoctorID=${doctorID}`,
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
        `Appointment Submitted Successfully. Your Appointment ID is ${data.apt}`,
      );
    } else {
      alert("Failed to submit appointment");
    }
    setAppointmentLoading(false);
  };

  return (
    <div className="bg-[#749BC2] pt-[6.54vh] md:pt-[7.41vh] pl-0 md:pl-[81px] pr-0 md:pr-[81px] flex flex-col">
      <div className="w-full flex flex-col justify-center items-center mt-[15px] md:mt-[52px] mb-[49px] md:mb-[88px]">
        <p className="font-bold text-[#FFFFFF] text-[24px]">Appointment Form</p>
        {choosedDoctor.length > 0 ? (
          choosedDoctor.map((doctor) => (
            <div
              key={doctor.DoctorID}
              className="w-full flex flex-col md:flex-row justify-center md:justify-start items-center md:items-start text-[#FFFFFF] mt-[15px] md:mt-[52px]"
            >
              <div className="min-w-[250px] h-[250px] bg-[#4682A9] flex justify-center items-center rounded-[15px]">
                <Image
                  src={doctor.ImageURL || "/No-person-Doctor.png"}
                  alt="DoctorImage"
                  width={200}
                  height={200}
                  className="w-[200px] h-[200px] rounded-[15px]"
                />
              </div>

              <div className="w-full flex flex-col items-center md:items-start ml-0 md:ml-[2.92vw]">
                <p className="font-bold text-[20px]">
                  {doctor.name || "No Name"}
                </p>
                <p className="text-[16px]">
                  {doctor.Progeram || "Not Updated"}
                </p>
                <p className="text-[20px] mt-[4.25vh]">
                  {doctor.Spcl || "Not Updated"}
                </p>
                <p className="text-[20px] mt-[2vh]">
                  {doctor.DcrDesc || "No Description"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading doctor details...</p>
        )}
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col justify-center md:justify-start items-center md:items-start">
        <div className="flex flex-col md:flex-row md:flex-wrap w-full justify-center md:justify-between items-center gap-[28px] md:gap-[0]">
          <input
            type="text"
            placeholder="Name"
            name="Pname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-[350px] md:w-[790px] h-[50px] bg-[#F6F4EB] text-[#000000] rounded-[15px] pl-[24px] md:pl-[31px] text-[15px]"
          />

          <input
            type="datetime-local"
            className="w-[350px] md:w-[790px] h-[50px] bg-[#F6F4EB] text-[#000000] rounded-[15px] pl-[24px] md:pl-[31px] pr-[24px] md:pr-[28px]"
            name="dateAndTime"
            value={dateAndTime}
            onChange={(e) => setDateAndTime(e.target.value)}
          />
        </div>

        <textarea
          placeholder="Your reason short and sweet"
          name="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-[350px] md:w-full bg-[#F6F4EB] text-[#000000] rounded-[15px] min-h-[302px] pl-[24px] md:pl-[31px] pt-[10px] mt-[28px] md:mt-[6.57vh]"
        />

        <div className="w-full flex justify-center items-center mt-[28px] md:mt-[71px]">
          {isAppointmentLoading ? (
            <button className="w-[350px] md:w-[790px] h-[50px] bg-[#44DB55] text-[#FFFFFF] font-bold text-[16px] md:text-[20px] rounded-[15px] cursor-pointer drop-shadow-[-2px_8px_8px_rgba(0,0,0,0.5)] hover:drop-shadow-[-2px_5px_8px_rgba(0,0,0,0.5)] mb-[28px] md:mb-[71px]">
              Placing...
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitAppointment}
              className="w-[350px] md:w-[790px] h-[50px] bg-[#44DB55] text-[#FFFFFF] font-bold text-[16px] md:text-[20px] rounded-[15px] cursor-pointer drop-shadow-[-2px_8px_8px_rgba(0,0,0,0.5)] hover:drop-shadow-[-2px_5px_8px_rgba(0,0,0,0.5)] mb-[28px] md:mb-[71px]"
            >
              Place the Appointment
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
