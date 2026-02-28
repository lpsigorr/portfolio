import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../data/prData.json";

const ProjectFull = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the project by id
  const project = data.find((p) => p.id.toString() === id);

  if (!project) {
    return (
      <div className="project-full">
        <h2>Project not found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  // Collect all images dynamically
  const images = Object.keys(project)
    .filter((key) => key.startsWith("image") && project[key])
    .map((key) => project[key]);

  // Collect descriptions
  const descriptions = ["description1", "description2", "description3"]
    .filter((descKey) => project[descKey])
    .map((descKey) => project[descKey]);

  // 🔥 Convert YouTube watch links to embed format
  const getEmbedUrl = (url) => {
    if (!url) return null;

    try {
      const u = new URL(url);

      // youtu.be/<id>
      if (u.hostname.includes("youtu.be")) {
        const id = u.pathname.split("/").filter(Boolean)[0];
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }

      // youtube.com/watch?v=<id>
      if (u.pathname === "/watch") {
        const id = u.searchParams.get("v");
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }

      // youtube.com/shorts/<id>
      if (u.pathname.startsWith("/shorts/")) {
        const id = u.pathname.split("/shorts/")[1]?.split("/")[0];
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }

      // youtube.com/embed/<id> already
      if (u.pathname.startsWith("/embed/")) {
        return url;
      }

      return url; // fallback
    } catch {
      // If URL() fails, fallback to old behavior
      return url;
    }
  };


  // Determine grid class based on total image count
  const imageGridClass = images.length >= 4 ? "project-images-many" : "project-images-few";

  // Split images into groups based on number of descriptions
  const imagesPerSection = Math.ceil(images.length / descriptions.length);
  
  return (
    <div className="project-full">
      {/* Header Section */}
      <div className="project-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1 className="project-title">{project.name}</h1>

        <div className="project-meta">
          {project.area && (
            <span className="project-area">{project.area}</span>
          )}

          {project.link && (
            <a
              className="project-link"
              href={project.link}
              target="_blank"
              rel="noreferrer"
            >
              Visit website ↗
            </a>
          )}
        </div>
      </div>
      

      {/* Content Section */}
      <div className="project-content">
        {/* Interleave descriptions and images */}
        {descriptions.map((desc, index) => {
          const startIdx = index * imagesPerSection;
          const endIdx = startIdx + imagesPerSection;
          const sectionImages = images.slice(startIdx, endIdx);

          return (
            <React.Fragment key={index}>
              {/* Description */}
              <p className="project-description">{desc}</p>

              {/* Images for this section */}
              {sectionImages.length > 0 && (
                <div className={`project-images ${imageGridClass}`}>
                  {sectionImages.map((img, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={`${import.meta.env.BASE_URL}${img}`}
                      alt={`${project.name} screenshot ${startIdx + imgIndex + 1}`}
                    />
                  ))}
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* Video */}
        {project.video && (
          <div className="project-video">
            <iframe
              src={getEmbedUrl(project.video)}
              title={`${project.name} video`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectFull;