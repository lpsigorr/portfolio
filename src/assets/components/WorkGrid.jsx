import React, { useEffect, useState } from "react";
import Works from "./Works";
import data from "../data/prData.json";

const WorkGrid = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(data);
  }, []);

  return (
    <div className="workgrid-container">
      <h1>My Works</h1>
      <div className="workgrid-grid">
        {projects.map((project) => (
          <Works key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default WorkGrid;
