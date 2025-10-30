"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
    <div className="mt-20">
      {/*---Temporty Search Bar---*/}
      <div>
        <input
          type="text"
          placeholder="Search Doctor by Name"
          value={searchDoctor}
          onChange={(e) => setSearchDoctor(e.target.value)}
          className="w-[300px] border-1 border-black mb-[15px]"
        />
      </div>

      {loadingDoctor ? (
        <p>Loading Doctors...</p>
      ) : doctors.length > 0 ? (
        doctors.map((doctor) => (
          <Link
            href={`/User/BookADoctor/${doctor.DoctorID}`}
            key={doctor.DoctorID}
          >
            <div className="border p-4 mb-4">
              <h2 className="text-xl font-bold mb-2">
                {doctor.FirstName} {doctor.LastName}
              </h2>
            </div>
          </Link>
        ))
        
      ) : (
        <p>No doctors found.</p>
      )}
      
    </div>
  );
}
