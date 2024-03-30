import React from "react";
import useFilterContext from "../../../../hooks/useFilterContext";
import FilterLayout from "./FilterLayout";

type PlatformFilterProps = {
  platformOptions: string[];
};

const PlatformFilter: React.FC<PlatformFilterProps> = ({ platformOptions }) => {
  const { selectedPlatforms, setSelectedPlatforms } = useFilterContext();

  const onSelect = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget.textContent as string;
    const platform = platformOptions.find((p) => p.includes(target)) as string;

    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  return (
    <FilterLayout title="Platform">
      <ul className="flex flex-row justify-between">
        {platformOptions.map((platform, index) => (
          <li
            key={index}
            className={`w-32 py-2 transition cursor-pointer font-medium rounded-full text-center ${
              selectedPlatforms.includes(platform)
                ? "bg-secondary text-white"
                : "text-gray-800/75"
            }`}
            onClick={(p) => onSelect(p)}
          >
            {platform.split(" ")[0]}
          </li>
        ))}
      </ul>
    </FilterLayout>
  );
};

export default PlatformFilter;
