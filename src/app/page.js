"use client";
import React from "react";
import "./page.css";
import CoverPage from "./User/component/CoverPage";
import AboutUsSection from "./User/component/About";
import HealthEducationSection from "./User/component/HealthEducation";
import NavBar from '../compontents/Navbar';


export default function page() {

  return (
    <div>
      <div className="fixed top-0 z-90 w-full">
        <NavBar/>
      </div>
      <CoverPage className="cover_page" />
      <div className="page_contents">
        <AboutUsSection id="about-us"/>
        <HealthEducationSection />

      </div>
    </div>
  );
}
