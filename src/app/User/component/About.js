import React from 'react';
import Image from 'next/image';
import "./About.css";
import HospitalImage01 from "../assets/HospitalImage01.png";
import HospitalImage02 from "../assets/HospitalImage02.png";


export default function About({id}) {
  const sectionData = {
    title: "MEDI CARE LANKA",
    subtitle: "Your trusted healthcare partner",
    content:
      "Our main goal of the system in to make the healthcare management more efficient, accessible and affordable. On our platform we have streamlined patient care, reduce waiting times, and enable better communication between healthcare providers and patients. Ultimately, our vision is to create a more patient-centered approach that prioritizes health equity and empowers individuals to take control of their health journey.",
    linkText: "see more...",
  };

  return (
    <div className="card_background" id={id}>

            <div className="card_container">
                <div className="about_section">
                    <h2>{sectionData.title}</h2>
                    <h3>{sectionData.subtitle}</h3>
                
                    <p>
                        {sectionData.content}
                        <br/>
                        {sectionData.linkText}
                    </p>
                </div>
                <div className="photo_section">
                    <Image src={HospitalImage01} width={480} height={270} alt="hospitalImage01" className="hospitalImage01"/>
                    <Image src={HospitalImage02} width={480} height={270} alt="hospitalImage02" className="hospitalImage01"/>
                </div>
            </div>
        </div>
  );
}
