import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // Nothing to show until the mouse has moved at least once
  if (!position) return null;

  return (
    <div
      className="custom-cursor"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default CustomCursor;
