import React from "react";

type DashboardWrapperProps = {
  children: React.ReactNode;
};

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ children }) => {
  return <div className="relative h-full">{children}</div>;
};

export default DashboardWrapper;
