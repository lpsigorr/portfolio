import React, { useState } from "react";
import { Link } from "react-router-dom";

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
          <h1>
            Igor Lopes Oliveira
          </h1>
          <p>Creative Technologist</p>
          <Link to="/works" className="hero-cta">View Work →</Link>
        </div>
      </div>

      {/* Black Section - outside of hero */}
      <div className="black-section">
        <div className="black-content">
          <div className="left-image">
            <img
              src={`${import.meta.env.BASE_URL}images/main_igor.png`}
              alt="Portfolio showcase"
              loading="lazy"
            />

          </div>
          <div className="right-text">
            <h2>About Me</h2>
            <p>
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
