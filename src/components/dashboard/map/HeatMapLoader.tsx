const HeatMapLoader: React.FC = () => {
  return (
    <div
      className="absolute top-0 left-0 z-10 w-full h-full animate-pulse backdrop-blur-md"
      style={{
        background:
          "linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), transparent)",
      }}
    />
  );
};

export default HeatMapLoader;
