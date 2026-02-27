import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left side */}
        <div className="footer-left">
          <h2>My Portfolio</h2>
          <p>© {new Date().getFullYear()} All Rights Reserved</p>
        </div>

        {/* Right side */}
        <div className="footer-right">
          <a href="https://github.com/IgorLopesOliveira" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/igor-lopes-oliveira-60169a212?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B5aOm1DC%2FTiaopcu8ZZseVw%3D%3D" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="mailto:lopesigor101@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
