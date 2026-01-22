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


  const scrollToAbout = () => {
    if (typeof window === "undefined") return; // SSR safety

    const el = document.getElementById("about-us");
    if (!el) {
      console.warn("AboutUs section not found yet!");
      return;
    }

    el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className='w-full flex'>

      {/*-------------------------------------- DESKTOP --------------------------------------- */}
      <div className='hidden md:flex flex-row w-full h-[7.41vh] bg-[#F6F4EB] text-[#4682A9] items-center pl-[2.08vw] pr-[2.08vw]'>

        <Link href="/">
          <div className='font-bold text-[1.5rem]'>Medicare</div>
        </Link>

        <div className='w-full flex flex-row justify-end items-center h-[7.41vh] gap-[4.9vw]'>
          <button className='font-bold text-[16px] cursor-pointer' onClick={scrollToAbout}>
            About us
          </button>

          <Link href="/User/BookADoctor" className='font-bold text-[16px]'>
            Channeling
          </Link>

          <Link href="/User" className='font-bold text-[16px]'>
            Contact Us
          </Link>

            <Link href="/auth/Login" className='font-bold text-[#FFFFFF] pl-[10px] pr-[10px] bg-[#4682A9] rounded-[5px] hover:bg-[#8cbede] transition duration-300 hover:text-[#4682A9] transform-'>
                Login
            </Link>

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

              <DropdownMenuItem>
                <button className='font-bold text-[4.85vw]' onClick={scrollToAbout}>
                  About Us
                </button>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-[#4682A9] h-px w-full"/>
              
              <DropdownMenuItem>
                <Link href="/User" className='font-bold text-[4.85vw]'>
                  Channeling
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-[#4682A9] h-px w-full"/>

              <DropdownMenuItem>
                <Link href="/User" className='font-bold text-[4.85vw]'>
                  Contact us
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-[#4682A9] h-px w-full"/>

              <DropdownMenuItem className='mt-[8.07vh]'>
                <Link href="/auth/Login" className='font-bold text-[#FFFFFF] pl-[10px] pr-[10px] bg-[#4682A9] rounded-[5px] hover:bg-[#8cbede] transition duration-300 hover:text-[#4682A9] text-[4.85vw]'>
                    Login
                </Link>
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
