import React, { useEffect, useState } from "react";

const HeatMapLoader: React.FC = () => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots + 1) % 4);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-end items-end loader animate-pulse">
      <span className="text-secondary/50 p-4">
        Loading heatmap{Array(dots).fill(".").join("")}
      </span>
    </div>
  );
};

export default HeatMapLoader;
