import React, { useState } from "react";

const Landing = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 50;
    const y = (window.innerHeight / 2 - e.clientY) / 50;
    setOffset({ x, y });
  };

  return (
    <>
      {/* Hero Section */}
      <div className="landing-container" onMouseMove={handleMouseMove}>
        {/* Parallax Background */}
        <div
          className="background-image"
          style={{
            transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`,
          }}
        />

        {/* Glass rectangle */}
        <div className="glass-box"></div>

        {/* Text content */}
        <div className="landing-content">
          <h1 style={{ fontFamily: "'Nata Sans', sans-serif" }}>
            Welcome to My Portfolio
          </h1>
          <p>Product designer</p>
        </div>
      </div>

      {/* Black Section - outside of hero */}
      <div className="black-section">
        <div className="black-content">
          <div className="left-image">
            <img
              src={`${import.meta.env.BASE_URL}images/main_igor.png`}
              alt="Portfolio showcase"
            />

          </div>
          <div className="right-text">
            <h2 style={{ fontFamily: "'Nata Sans', sans-serif" }}>About Me</h2>
            <p style={{ fontFamily: "'Nata Sans', sans-serif" }}>
              I'm a creative developer passionate about interactive experiences,
              design, and storytelling. This portfolio showcases my projects,
              ideas, and experiments.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
