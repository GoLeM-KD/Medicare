"use client";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [search, setSearch] = useState("");
  const [searchedRole, setSearchedRole] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const userRequests = await fetch(
        !search && searchedRole
          ? `../api/admin/userManagment?role=${searchedRole}`
          : search && !searchedRole
            ? `../api/admin/userManagment?search=${search}`
            : search && searchedRole
              ? `../api/admin/userManagment?role=${searchedRole}&search=${search}`
              : "../api/admin/userManagment"
      );

      const usersResult = await userRequests.json();
      console.log("ADMIN USERS...",usersResult.users);
      setUsers(usersResult.users);

      
    };

    getUsers();

  }, [search, searchedRole]);

  const handleClearFilter = () => {
    setSearchedRole("");
  }

  return (
    <div className="w-full min-h-screen">
      <div className="flex-col p-4 flex items-center justify-center w-full gap-5 auto md:flex-row">
        {/* Search Bar */}
        <div className="flex items-center gap-2 w-auto md:w-auto ">
          <input
            type="text"
            placeholder="Search..."
            className="w-auto p-2 border border-gray-300 rounded-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Options */}
        <div
          className="flex flex-row p-4 items-center justify-center w-full gap-4 md:justify-start md:w-auto"
          id="filter-options"
        >
          <input
            type="radio"
            name="role"
            id="patients"
            value="P"
            checked={searchedRole === "P"}
            onChange={(e) => setSearchedRole(e.target.value)}
          />
          <label for="patients">Patients</label>

          <input
            type="radio"
            name="role"
            id="doctors"
            value="D"
            checked={searchedRole === "D"}
            onChange={(e) => setSearchedRole(e.target.value)}
          />
          <label for="doctors">Doctors</label>

          <input
            type="radio"
            name="role"
            id="admins"
            value="A"
            checked={searchedRole === "A"}
            onChange={(e) => setSearchedRole(e.target.value)}
          />
          <label for="admins">Admins</label>

          <button className="w-[150px] bg-[#4c76b5] text-[#FFFFFF] rounded-[5px] cursor-pointer" onClick={handleClearFilter}>Clear Filters</button>
        </div>
      </div>

      <div className="p-4 grid grid-cols-1  lg:grid-cols-3 gap-4 md:grid-cols-2">
        {/* users */}
        {users.length > 0 ? (
          users.map((user) => (
            <div className="py-8 px-8 min-w-sm mx-auto bg-white rounded-xl shadow-2xl space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
              <img
                className="block mx-auto w-[80px] h-[80px] rounded-[50%] sm:mx-0 sm:shrink-0"
                src={user.ImageURL || "/no-profile.png"}
                alt="Profile Pic"
              />
              <div className="text-center space-y-2 sm:text-left">
                <div className="space-y-0.5">
                  <p className="text-lg text-black font-semibold">
                    {user.FirstName} {user.LastName}
                  </p>
                  <p className="text-slate-500 font-medium">{user.Role === "P" ? "Patient" : user.Role === "D" ? "Doctor" : "Admin"}</p>
                </div>
              </div>
            </div>
          ))

        ) : (<p>Loading...</p>)}

      </div>
    </div>
  );
}
