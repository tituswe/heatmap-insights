import { createContext, useContext } from "react";

type FilterContextType = {
  selectedPlatforms: string[];
  setSelectedPlatforms: React.Dispatch<React.SetStateAction<string[]>>;
  selectedProducts: string[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<string[]>>;
  lowPrice: string;
  setLowPrice: React.Dispatch<React.SetStateAction<string>>;
  highPrice: string;
  setHighPrice: React.Dispatch<React.SetStateAction<string>>;
  lowQty: string;
  setLowQty: React.Dispatch<React.SetStateAction<string>>;
  highQty: string;
  setHighQty: React.Dispatch<React.SetStateAction<string>>;
  selectedSku: string[];
  setSelectedSku: React.Dispatch<React.SetStateAction<string[]>>;
};

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
);

const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error(
      "useFilterContext must be used within a FilterContextProvider"
    );
  }
  return context;
};

export default useFilterContext;
