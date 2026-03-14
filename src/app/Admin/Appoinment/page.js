"use client";

import Image from "next/image";

export default function SearchAppointments() {

    return (

        <div className="mt-10 flex flex-col items-center min-h-screen">

            <h2 className="text-2xl font-bold mb-4">
                Search Patient Appointment
            </h2>

            <input
                type="text"
                placeholder="Search patient name..."
                className="border p-2 w-[300px] md:w-w-[400px] rounded-[15px] text-[#000000] mb-4"
            />
            {/* -------- Rendering the appointments here ---- */}
            
            <div className="w-full flex flex-col md:flex-wrap md:flex-row gap-[15px] md:gap-[30px] items-center md:items-start justify-start md:justify-center">

                {/* -- User card -- */}
                <div className="w-[350px] bg-[#d7f2f5] flex flex-row items-center p-[10px] gap-[20px] rounded-[15px] shadow-2xl">
                    {/* Image here */}                                                  
                    <div className="w-[50px] h-[50px]">
                        <Image src="/no-profile.png" alt="profileImage" width={50} height={50} className="min-w-[50px] min-h-[50px]"/>
                    </div>
                    {/* Details here */}
                    <div className="w-full flex flex-col justify-center items-start text-[16px]">
                        <p className="font-bold">Apt ID</p>
                        <p>Patient Name</p>
                        <p>Doctor name</p>
                        <p>APT date</p>
                    </div>

                </div>

                
                
            </div>

        </div>

    );
}