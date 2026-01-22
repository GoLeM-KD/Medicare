"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function page() {
  const [doctors, setDoctors] = useState([]); // Holding Doctors Data
  const [searchDoctor, setSearchDoctor] = useState(""); // Getting Search Input Value

  // Handeling Loading
  const [loadingDoctor, setLoadingDoctor] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingDoctor(true);
      const allDoctorsResults = await fetch(
        searchDoctor
          ? `/api/user/getDoctor?search=${encodeURIComponent(searchDoctor)}`
          : "/api/user/getDoctor"
      );

      const data = await allDoctorsResults.json();
      setDoctors(data);
      setLoadingDoctor(false);
    };

    const delayDebounce = setTimeout(fetchData, 100);
    return () => clearTimeout(delayDebounce);
  }, [searchDoctor]);
  return (
    <div className="pt-20 bg-[#91C8E4] pb-[55px]">
      {/*---Temporty Search Bar---*/}
      <div className="w-full flex justify-center items-center">
        <input
          type="text"
          placeholder="Search Doctor by Name"
          value={searchDoctor}
          onChange={(e) => setSearchDoctor(e.target.value)}
          className="w-[400px] md:w-[582px] h-[51px] border-1 border-black mb-[15px] bg-[#F6F4EB] rounded-[15px] pl-[20px] pr-[20px]"
        />
      </div>

      <div className="w-full flex flex-wrap gap-[39px] justify-center items-center">
        {loadingDoctor ? (
          <div className="w-full h-[100vh]">
            <p>Loading Doctors...</p>
          </div>
        ) : doctors.length > 0 ? (
          doctors.map((doctor) => (
            <Link
              href={`/User/BookADoctor/${doctor.DoctorID}`}
              key={doctor.DoctorID}
              className="w-[300px] h-[380px] bg-[#4682A9] rounded-[15px] text-[#FFFFFF] flex flex-col justify-center items-center"
            >
              <Image src={doctor.ImageURL || "/No-person-Doctor.png"} width={271} height={271} alt="Doctoer-Image" className="w-[271px] h-[271px] bg-[#FFFFFF] rounded-t-[15px]"/>
              <div className="w-full flex justify-center items-center flex-col">
                <h2 className="text-[24px] font-bold mb-2">
                  {doctor.FirstName} {doctor.LastName}
                </h2>
                <p>{doctor.Spcl || "Specialization not available"}</p>
              </div>
            </Link>
          ))

        ) : (
          <div className="w-full h-screen">
            <p>No doctors found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
