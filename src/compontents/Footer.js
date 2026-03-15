import './Footer.css';
import React from 'react'

export default function footer({id}) {
const contactInfoItems = [
    {
      icon: "https://c.animaapp.com/hs0kYMVc/img/icons8-location-20-1@2x.png",
      text: "No.225, Nawala Road, Nugegoda",
      alt: "Location",
    },
    {
      icon: "https://c.animaapp.com/hs0kYMVc/img/icons8-phone-30-1@2x.png",
      text: "0115-444-444",
      alt: "Phone",
    },
    {
      icon: "https://c.animaapp.com/hs0kYMVc/img/icons8-mail-20-1@2x.png",
      text: "info@medicare.lk",
      alt: "Mail",
    },
  ];

  return (
    <footer className="footer" id={id}>
      <div className="footer-container">
        <div className="desctption">
          <h2>MEDI CARE</h2>
          <p>
            Provides secure, efficient management solutions for hospitals and clinics, empowering better healthcare delivery. 
            Feel free to reach our clinic at anytime.
          </p>

        </div>
        <div className="contact-info">
            <p>📍 No.225, Nawala Road, Nugegoda</p>
            <p>📞 0115-444-444</p>
            <p>📧 info@medicare.lk</p>
          </div>
        </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MEDI CARE. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
