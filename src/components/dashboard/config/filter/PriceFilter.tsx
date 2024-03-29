import React from "react";
import useFilterContext from "../../../../hooks/useFilterContext";
import FilterLayout from "./FilterLayout";

type PriceFilterProps = {
  minPrice: number;
  maxPrice: number;
};

const PriceFilter: React.FC<PriceFilterProps> = ({ minPrice, maxPrice }) => {
  const { lowPrice, setLowPrice, highPrice, setHighPrice } = useFilterContext();

  const handleLowPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLowPrice(e.target.value);
  };

  const handleHighPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHighPrice(e.target.value);
  };

  const validateLowPrice = () => {
    let value = parseFloat(lowPrice);
    if (isNaN(value)) value = minPrice;
    if (value < minPrice) value = minPrice;
    if (value > parseFloat(highPrice)) value = parseFloat(highPrice);
    setLowPrice(value.toFixed(2));
  };

  const validateHighPrice = () => {
    let value = parseFloat(highPrice);
    if (isNaN(value)) value = maxPrice;
    if (value > maxPrice) value = maxPrice;
    if (value < parseFloat(lowPrice)) value = parseFloat(lowPrice);
    setHighPrice(value.toFixed(2));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <FilterLayout title="Price">
      <div className="flex flex-row items-center gap-6">
        <input
          className="font-light text-sm text-center p-2 bg-transparent border-b border-secondary w-full placeholder-primary text-secondary"
          type="number"
          value={lowPrice}
          onChange={handleLowPriceChange}
          onBlur={validateLowPrice}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          min={minPrice}
          max={maxPrice}
          step="0.1"
        />
        <span className="text-sm text-gray-800">to</span>
        <input
          className="font-light text-sm text-center p-2 bg-transparent border-b border-secondary w-full placeholder-primary text-secondary"
          type="number"
          value={highPrice}
          onChange={handleHighPriceChange}
          onBlur={validateHighPrice}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          min={minPrice}
          max={maxPrice}
          step="0.1"
        />
      </div>
    </FilterLayout>
  );
};

export default PriceFilter;
