import React from "react";
import { IconType } from "react-icons";

type ConfigSectionHeaderProps = {
  icon: IconType;
  title: string;
  subTitle?: string;
};

const ConfigSectionHeader: React.FC<ConfigSectionHeaderProps> = ({
  icon: Icon,
  title,
  subTitle,
}) => {
  return (
    <div className="flex flex-row gap-4">
      <div className="pl-8 pt-[30px] h-full">
        <Icon className="text-lg text-gray-800/25" />
      </div>
      <div className="flex flex-col py-6 gap-1">
        <span className="text-xl text-secondary">{title}</span>
        {subTitle && (
          <span className="text-xs text-gray-800/50">{subTitle}</span>
        )}
      </div>
    </div>
  );
};

export default ConfigSectionHeader;
