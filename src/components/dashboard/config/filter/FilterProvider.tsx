import React, { useEffect, useState } from "react";
import useDashboardContext from "../../../../hooks/useDashboardContext";
import { FilterContext } from "../../../../hooks/useFilterContext";

type FilterProviderProps = {
  children: React.ReactNode;
};

const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const { metaData } = useDashboardContext();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedSku, setSelectedSku] = useState<string[]>([]);
  const [lowPrice, setLowPrice] = useState("0.00");
  const [highPrice, setHighPrice] = useState("0.00");
  const [lowQty, setLowQty] = useState("0");
  const [highQty, setHighQty] = useState("0");

  useEffect(() => {
    if (metaData) {
      setSelectedPlatforms(metaData.platformOptions);
      setSelectedProducts(metaData.productOptions);
      setSelectedSku(metaData.skuOptions);
      setLowPrice(metaData.minPrice.toFixed(2));
      setHighPrice(metaData.maxPrice.toFixed(2));
      setLowQty(metaData.minQty.toFixed(0));
      setHighQty(metaData.maxQty.toFixed(0));
    }
  }, [metaData]);

  return (
    <FilterContext.Provider
      value={{
        selectedPlatforms,
        setSelectedPlatforms,
        selectedProducts,
        setSelectedProducts,
        lowPrice,
        setLowPrice,
        highPrice,
        setHighPrice,
        lowQty,
        setLowQty,
        highQty,
        setHighQty,
        selectedSku,
        setSelectedSku,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
