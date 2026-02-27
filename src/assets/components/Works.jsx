import React from "react";
import { useNavigate } from "react-router-dom";

const Works = ({ project }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/prData/${project.id}`);
  };

  return (
    <div className="works-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      {/* Project Title */}
      <h2 className="works-title">{project.name}</h2>

      {/* Only the first image */}
      {project.image1 && (
        <div className="works-images">
          <img
            src={project.image1}
            alt={`${project.name} screenshot`}
            className="works-img"
          />
        </div>
      )}

      {/* Area Tag */}
      {project.area && <span className="works-area">{project.area}</span>}
    </div>
  );
};

export default Works;
