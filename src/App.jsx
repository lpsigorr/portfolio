import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./assets/components/Header.jsx";
import Footer from "./assets/components/Footer.jsx";
import Landing from "./assets/components/Landing.jsx";
import WorkGrid from "./assets/components/WorkGrid.jsx";
import ProjectFull from "./assets/components/ProjectFull.jsx";
import CustomCursor from "./assets/components/CustomCursor.jsx";
import About from "./assets/components/About.jsx";
import Contact from "./assets/components/Contact.jsx";
import "./App.css";

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/works" element={<WorkGrid />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/work/:id" element={<ProjectFull />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
      <CustomCursor />
    </div>
  );
}

export default App;
