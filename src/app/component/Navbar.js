"use client";
import Link from "next/link";
import React from "react";

import "./Navbar.css";
import Image from 'next/image';
import icons8Ambulance501 from '../assets/icons8-ambulance-501.png';
import icons8User501 from "../assets/icons8-user-501.png";
import icons8Logout501 from "../assets/icons8-logout-501.png";








export default function navbar() {
  const navigationItems = [
    { label: "About us", left: "44.58%", width: "3.91%", link: "User/#" },
    {
      label: "Channeling",
      left: "53.39%",
      width: "5.10%",
      link: "User/BookADoctor",
    },
    { label: "Reports", left: "63.39%", width: "3.33%", link: "User/#" },
    { label: "Contact Us", left: "71.61%", width: "4.74%", link: "User/#" },
  ];

  // Log-out function
  async function logout() {
    await fetch("../api/auth/logout", { method: "POST" });
    window.location.href = "/auth/Login";
  }

  // Sidebar show function
  function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
    const hamBurgerButton = document.querySelector('.hamBurger');
    hamBurgerButton.style.display = 'none';
  }

  //Sidebar hide function
  function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
    const hamBurgerButton = document.querySelector('.hamBurger');
    hamBurgerButton.style.display = 'block';
  }


  return (
    <header className="header">
      
        <span className="logo">MEDICARE</span>
        <nav className="nav-container">
        <ul>
            <li  className="hideOnMobile"><a href="#aboutus">About us</a></li>
            <li  className="hideOnMobile"><a href="#channeling">Channeling</a></li>
            <li  className="hideOnMobile"><a href="#reports">Reports</a></li>
            <li  className="hideOnMobile"><a href="#contact">Contact Us</a></li>
            <li ><a href="ambulance">
                <Image src={icons8Ambulance501} width={48} height={48} alt="ambulanceIcon" className="ambulance-Icon"/>
                </a></li>
            <li><a href="account">
                <Image src={icons8User501} width={48} height={48} alt="userIcon" className="user-Icon"/>
                </a></li>
            <li>
              <a href="logout" onClick={logout}>
                <Image src={icons8Logout501} width={48} height={48} alt="logoutIcon" className="logout-Icon"/>
              </a></li>
            <li className="hamBurger">
              <a href="#" onClick={showSidebar}><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg>
              </a></li>
          </ul>


          
          <ul className="sidebar" >
            <li><a href="#" onClick={hideSidebar}><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></a></li>
            <li><a href="#aboutus">About us</a></li>
            <li><a href="#channeling">Channeling</a></li>
            <li><a href="#reports">Reports</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>

      </nav>
    </header>
  );
}
