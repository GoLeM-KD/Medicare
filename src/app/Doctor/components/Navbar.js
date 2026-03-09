"use client";
import React, { useEffect, useState } from "react";
import { Calendar, User } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Image from "next/image";

export default function Navbar() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const res = await fetch(`../../api/token/checkToken`);
      const result = await res.json();

      console.log("CHECKING...", result.datas.ImageURL);
      setImage(result.datas.ImageURL || "");
      setName(result.datas.FirstName + " " + result.datas.LastName);
      setLoading(false);
    };

    getUser();
    console.log(Image);
  }, []);

  // Logout Function
  async function logout() {
    await fetch("../api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <div className="w-full bg-white z-90">
      {/* Header */}
      <div className="bg-blue-600 text-white shadow-md hidden md:flex">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">MEDICARE</h1>
                <p className="text-sm text-blue-100">Appointment Management</p>
              </div>
            </div>
            <nav className="flex gap-2">
              <Link
                href="/Doctor"
                className={`px-4 py-2 rounded-lg transition-colors ${"text-white hover:bg-blue-700"}`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Appointments</span>
                </div>
              </Link>
              <Link
                href="/Doctor/Profile"
                className={`px-4 py-2 rounded-lg transition-colors ${"text-white hover:bg-blue-700"}`}
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {loading ? (<span>Loading...</span>) : (<span>{name}</span>)}
                  
                </div>
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="flex md:hidden flex-row w-full h-[6.54vh] flex-row bg-blue-600 text-white items-center pl-[5.1vw] pr-[5.1vw]">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src="/menuD.png"
                alt="menu-burger"
                width={30}
                height={30}
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-blue-600 w-[72.82vw] min-h-screen mt-[1.635vh] z-90 flex flex-col items-center pl-[3.4vw] pr-[3.4vw] pt-[3.82vh] gap-[2.94vh] data-[state=open]:animate-[slide-in_0.3s_ease-out_forwards] data-[state=closed]:animate-[slide-in_0.3s_ease-out_forwards]">
              <DropdownMenuItem>
                <Link
                  href="/Doctor/Profile"
                  className="flex flex-row gap-[4.13vw] items-end"
                >
                  <Image
                    src={image || "/no-profile.png"}
                    alt="profile-image"
                    width={50}
                    height={50}
                    className="rounded-full w-[50px] h-[50px]"
                  />
                  <p className="text-[4.85vw]">{name}</p>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-[#4682A9] h-px w-full" />

              <DropdownMenuItem>Appointment</DropdownMenuItem>

              <DropdownMenuItem className="mt-[60vh]">
                <button
                  className="flex flex-row gap-[4.13vw] items-end"
                  onClick={logout}
                >
                  <Image
                    src="/logout.png"
                    alt="logout-btn"
                    width={30}
                    height={30}
                  />
                  <p className="text-[4.85vw]">Logout</p>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Link
          href="/Doctor"
          className="text-[24px] h-[6.54vh] font-bold w-full flex justify-center items-center"
        >
          Medicare
        </Link>
      </div>
    </div>
  );
}
