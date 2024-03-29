import React from "react";

type FilterLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const FilterLayout: React.FC<FilterLayoutProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col px-8 gap-2">
      <span className="text-sm text-secondary">{title}</span>
      {children}
    </div>
  );
};

export default FilterLayout;
