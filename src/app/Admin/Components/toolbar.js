"use client";
import React from "react";
import Link from "next/link";

export default function toolbar() {
  return (
    <div className="flex-col p-4 flex items-center justify-center w-full gap-5 auto md:flex-row">

      {/* Search Bar */}
      <div id="search-bar" className="flex items-center gap-2 w-auto md:w-auto " >
        <input type="text" placeholder="Search..." className="w-auto p-2 border border-gray-300 rounded-full "/>
      </div>
      

      {/* Filter Options */}
      <div className="flex flex-row p-4 items-center justify-center w-full gap-4 md:justify-start md:w-auto" id="filter-options" >
        <input type="checkbox" id="patients" value="Patients" defaultChecked ></input>
        <label for="patients">Patients</label>

        <input type="checkbox" id="doctors" value="Doctors"></input>
        <label for="doctors">Doctors</label>

        <input type="checkbox" id="admins" value="Admins"></input>
        <label for="admins">Admins</label>
      </div>

      
      
      



    </div>
  );
}
