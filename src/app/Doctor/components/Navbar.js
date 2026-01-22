'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
  } from '@radix-ui/react-dropdown-menu';

export default function Navbar() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  // Logout Function
  async function logout() {
    await fetch("../api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  useEffect(() => {

    const getUser = async () => {
      setLoading(true);
      const res = await fetch(`../../api/token/checkToken`);
      const result = await res.json();

      console.log("CHECKING...",result.datas.ImageURL);
      setImage(result.datas.ImageURL || '');
      setName(result.datas.FirstName + " " + result.datas.LastName);
      setLoading(false);
    }  
    
    getUser();
    console.log(Image)
  },[])
  return (
    <div className='w-full flex'>

      {/*-------------------------------------- DESKTOP --------------------------------------- */}
      <div className='hidden md:flex flex-row w-full h-[7.41vh] bg-[#F6F4EB] text-[#4682A9] items-center pl-[2.08vw] pr-[2.08vw]'>

        <Link href="/Doctor">
          <div className='font-bold text-[1.5rem]'>Medicare</div>
        </Link>

        <div className='w-full flex flex-row justify-end items-center h-[7.41vh]'>
          <Link href="/Doctor" className='font-bold text-[16px]'>
            Appointments
          </Link>

          {loading ? (<p className='ml-[7.97vw]'>Loading...</p>): (
            <div className='ml-[7.97vw] flex flex-row gap-[2.29vw]'>
              <Link href="/Doctor/Profile">
                <Image src={image || "/no-profile.png"} alt="user-Profile" width={30} height={30} className='rounded-[50px] w-[30px] h-[30px]'/>
              </Link>

              <button onClick={logout} className='cursor-pointer'>
                <Image src="/logout.png" alt='logout' width={30} height={30}/>
              </button>
            </div>

          )}

        </div>

      </div>

      {/*------------------------------ MOBILE ----------------------------------------------- */}
      <div className='flex md:hidden flex-row w-full h-[6.54vh] bg-[#F6F4EB] text-[#4682A9] items-center pl-[5.1vw] pr-[5.1vw]'>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image src="/menuburger.png" alt='menu-burger' width={30} height={30}/>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='bg-[#F6F4EB] w-[72.82vw] h-screen mt-[1.635vh] flex flex-col items-center pl-[3.4vw] pr-[3.4vw] pt-[3.82vh] gap-[2.94vh] data-[state=open]:animate-[slide-in_0.3s_ease-out_forwards] data-[state=closed]:animate-[slide-in_0.3s_ease-out_forwards]'>

              <DropdownMenuItem className='flex flex-row gap-[4.13vw] items-end'>
                <Link href="/Doctor/Profile">
                  <Image src={image || "/no-profile.png"} alt='profile-image' width={50} height={50} className='rounded-full w-[50px] h-[50px]'/>
                  <p className='text-[4.85vw]'>{name}</p>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-[#4682A9] h-px w-full"/>

              <DropdownMenuItem>
                <Link href="/Doctor" className='font-bold text-[4.85vw]'>
                  Appointments
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-[#4682A9] h-px w-full"/>

              <DropdownMenuItem className='mt-[8.07vh]'>
                <button className='flex flex-row gap-[4.13vw] items-end' onClick={logout}>
                  <Image src="/logout.png" alt='logout-btn' width={30} height={30}/>
                  <p className='text-[4.85vw]'>Logout</p>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

          <Link href="/Doctor" className='text-[24px] h-[6.54vh] font-bold w-full flex justify-center items-center'>
            Medicare
          </Link>
      </div>

    </div>
  )
}
