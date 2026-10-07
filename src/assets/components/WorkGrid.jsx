import React, { useEffect, useState } from "react";
import Works from "./Works";
import data from "../data/prData.json";

// Same breakpoints as before: 3 columns, 2 up to 1024px, 1 up to 640px
const getColumnCount = () => {
  if (window.matchMedia("(max-width: 640px)").matches) return 1;
  if (window.matchMedia("(max-width: 1024px)").matches) return 2;
  return 3;
};

const WorkGrid = () => {
  const [projects, setProjects] = useState([]);
  const [columnCount, setColumnCount] = useState(getColumnCount);

  useEffect(() => {
    setProjects(data);
  }, []);

  useEffect(() => {
    const handleResize = () => setColumnCount(getColumnCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Deal the projects out row by row, so the order in prData.json is the
  // reading order (left to right, top to bottom) and the first ones are on top
  const columns = Array.from({ length: columnCount }, () => []);
  projects.forEach((project, index) => {
    columns[index % columnCount].push(project);
  });

  return (
    <div className="workgrid-container">
      <h1>My Works</h1>
      <div className="workgrid-grid">
        {columns.map((column, columnIndex) => (
          <div className="workgrid-column" key={columnIndex}>
            {column.map((project) => (
              <Works key={project.id} project={project} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkGrid;
