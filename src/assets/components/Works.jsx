import React from "react";
import { useNavigate } from "react-router-dom";

const Works = ({ project }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/work/${project.id}`);
  };

  return (
    <div className="works-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      {project.image1 && (
        <div className="works-images">
          <img
            src={`${import.meta.env.BASE_URL}${project.image1}`}
            alt={`${project.name} screenshot`}
            className="works-img"
            loading="lazy"
          />
        </div>
      )}

      <div className="works-info">
        <h2 className="works-title">{project.name}</h2>
        {project.area && <span className="works-area">{project.area}</span>}
      </div>
    </div>
  );
};

export default Works;
