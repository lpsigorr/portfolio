import React, { useState } from "react";


const About = () => {
  const [activeSection, setActiveSection] = useState(null);

  const openSection = (section) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeSection = () => {
    setActiveSection(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About</h1>
      </div>

      {/* Software Expanded Section */}
      {activeSection === "software" && (
        <div className="expanded-section active">
          <button className="close-btn" onClick={closeSection}>
            ← Back
          </button>
          <h2>Software</h2>
          <p>
            I work at the intersection of design and technology, using software as a creative tool to build interactive, meaningful experiences. My focus is not just on making things work, but on how they feel, look, and respond to users.
            </p>
            <p>
            I'm comfortable moving from concept to execution: designing interfaces, building front-ends, connecting logic, and iterating fast through prototypes. Whether it's a web experience, a motion-driven interface, or a creative system, I enjoy translating ideas into functional digital products.
          </p>
          <div className="skills-grid">
            <div className="skill-item">
              <h3>JavaScript</h3>
              <p>React, Vite, Node.js</p>
              <p>Building modern web interfaces, interactive experiences, and responsive front-ends with a strong focus on UX and performance.</p>
            </div>
            <div className="skill-item">
              <h3>Creative Coding</h3>
              <p>TouchDesigner</p>
              <p>Exploring real-time visuals, interaction, and physical-digital experiences through generative and reactive systems.</p>
            </div>
            <div className="skill-item">
              <h3>Design Tools</h3>
              <p>Figma, Illustrator, Photoshop</p>
              <p>Designing UI systems, visual identities, motion graphics, and storytelling assets.</p>
            </div>
            <div className="skill-item">
              <h3>Video & Motion</h3>
              <p>After Effects, Premiere Pro</p>
              <p>Creating motion graphics, short-form videos, transitions, and visual storytelling for digital platforms.</p>
            </div>
          </div>
        </div>
      )}

      {/* Hardware Expanded Section */}
      {activeSection === "hardware" && (
        <div className="expanded-section active">
          <button className="close-btn" onClick={closeSection}>
            ← Back
          </button>
          <h2>Hardware</h2>
          <p>
            I work hands-on with physical computing and prototyping, using hardware as a way to bring digital ideas into the real world. I enjoy building, testing, and iterating on physical systems where interaction, materials, and technology meet.
            </p>
            <p>
            Through projects like SPARX, where the majority of the work focused on hardware development, I gained strong experience in designing, assembling, and refining functional prototypes — from sensor integration to physical form.
          </p>
          <div className="skills-grid">
            <div className="skill-item">
              <h3>Microcontrollers</h3>
              <p>Arduino, ESP32</p>
              <p>Developing interactive systems using sensors, inputs, and real-time feedback, with a focus on reliability and responsiveness.</p>
            </div>
            <div className="skill-item">
              <h3>Prototyping & Electronics</h3>
              <p>Sensors, wiring, soldering, testing</p>
              <p>Building and debugging physical systems, experimenting with sensor placement, and refining hardware through hands-on testing.</p>
            </div>
            <div className="skill-item">
              <h3>Fabrication</h3>
              <p>3D printing, materials, assembly</p>
              <p>Creating custom parts and enclosures, testing materials, and iterating on physical designs to support functional and ergonomic products.</p>
            </div>
          </div>
        </div>
      )}

      {/* About Me Expanded Section */}
      {activeSection === "aboutme" && (
        <div className="expanded-section active">
          <button className="close-btn" onClick={closeSection}>
            ← Back
          </button>
          <h2>About Me</h2>
          <p>
            I'm a creative technologist and product designer with a strong interest in building experiences that connect the digital and physical world. I enjoy working hands-on, exploring ideas through making, testing, and iteration rather than staying purely theoretical.
          </p>
          <p>
            My background combines design, technology, and storytelling, allowing me to move easily between concept, execution, and refinement. I'm curious by nature, adaptable, and motivated by projects that challenge me to learn new skills and push ideas further.
          </p>

          <div className="education-section">
            <h3 className="education-title">Education</h3>
            <div className="education-item">
              <h3>Erasmushogeschool Brussel</h3>
              <div className="year">2022 - 2026</div>
              <p>Multimedia and Creative Technologies</p>
            </div>
            <div className="education-item">
              <h3>Koninklijke Atheneum Tervuren</h3>
              <div className="year">2016 - 2022</div>
              <p>Secondary Diploma in Economics and Modern Languages</p>
            </div>
          </div>
        </div>
      )}

      {/* Products Expanded Section */}
      {activeSection === "products" && (
        <div className="expanded-section active">
          <button className="close-btn" onClick={closeSection}>
            ← Back
          </button>
          <h2>Products</h2>
          <p>
            I design and build products that combine concept, interaction, and execution. My work ranges from physical-digital systems to branded collections and interactive web experiences, always focusing on clarity, usability, and meaningful interaction.
          </p>
          <p>Each project is approached as a complete product — from idea and research to prototyping, testing, and refinement.</p>
          <div className="products-grid">
            <div className="product-item">
              <h3>EHB Arcade</h3>
              <p>An interactive arcade installation developed as part of a collaborative school project. The focus was on playful interaction, physical input, and creating engaging experiences through hardware and software working together.</p>
            </div>
            <div className="product-item">
              <h3>SPARX</h3>
              <p>A smart boxing training system that transforms a regular punching bag into an interactive training tool. The project focused heavily on hardware prototyping, sensor integration, and real-time feedback, combined with a custom interface for solo training.</p>
            </div>
            <div className="product-item">
              <h3>Eregum</h3>
              <p>A conceptual product project exploring materiality, form, and interaction. The focus was on experimentation and translating abstract ideas into tangible prototypes.</p>
            </div>
            <div className="product-item">
              <h3>STAR Collection</h3>
              <p>A personal clothing brand and creative platform exploring identity, design, and storytelling through apparel. The project goes beyond clothing, treating each collection as a designed system with visual language, narrative, and physical products.</p>
            </div>
            <div className="product-item">
              <h3>Web Tools</h3>
              <p>A collection of interactive web projects ranging from portfolio experiences to data-driven and UI-focused applications, built with an emphasis on user experience, performance, and visual consistency.</p>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Cards (only show when no section is active) */}
      {!activeSection && (
        <div className="about-grid">
          <div className="about-card software" onClick={() => openSection("software")}>
            <div className="about-card-content">
              <h2>Software</h2>
            </div>
          </div>

          <div className="about-card hardware" onClick={() => openSection("hardware")}>
            <div className="about-card-content">
              <h2>Hardware</h2>
            </div>
          </div>

          <div className="about-card aboutme" onClick={() => openSection("aboutme")}>
            <div className="about-card-content">
              <h2>About Me</h2>
            </div>
          </div>

          <div className="about-card products" onClick={() => openSection("products")}>
            <div className="about-card-content">
              <h2>Products</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;