import React from "react";

const HeatMapError: React.FC = () => {
  return (
    <div className="flex justify-end items-end loader">
      <span className="text-rose-800 font-semibold p-4">
        Error loading heatmap
      </span>
    </div>
  );
};

export default HeatMapError;
