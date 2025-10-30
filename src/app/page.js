"use client";
import React from "react";
import "./page.css";
import CoverPage from "./component/CoverPage";
import AboutUsSection from "./component/About";
import HealthEducationSection from "./component/HealthEducation";


import FooterSection from "../compontents/Footer";

import NavigationBarSection from "./component/Navbar";
import ServicesSection from "./component/Service";


export default function page() {
  return (
    <div>
      <CoverPage className="cover_page" />
      <div className="page_contents">
        <AboutUsSection />
        <HealthEducationSection />

      </div>
    </div>
  );
}
