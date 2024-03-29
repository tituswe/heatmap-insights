import React from "react";
import useFilterContext from "../../../../hooks/useFilterContext";
import FilterLayout from "./FilterLayout";

type QuantityFilterProps = {
  minQty: number;
  maxQty: number;
};

const PriceFilter: React.FC<QuantityFilterProps> = ({ minQty, maxQty }) => {
  const { lowQty, setLowQty, highQty, setHighQty } = useFilterContext();

  const handleLowPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLowQty(e.target.value);
  };

  const handleHighPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHighQty(e.target.value);
  };

  const validateLowPrice = () => {
    let value = parseFloat(lowQty);
    if (isNaN(value)) value = minQty;
    if (value < minQty) value = minQty;
    if (value > parseFloat(highQty)) value = parseFloat(highQty);
    setLowQty(value.toFixed(0));
  };

  const validateHighPrice = () => {
    let value = parseFloat(highQty);
    if (isNaN(value)) value = maxQty;
    if (value > maxQty) value = maxQty;
    if (value < parseFloat(lowQty)) value = parseFloat(lowQty);
    setHighQty(value.toFixed(0));
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
    <FilterLayout title="Quantity">
      <div className="flex flex-row items-center gap-6">
        <input
          className="font-light text-sm text-center p-2 bg-transparent border-b border-secondary w-full placeholder-primary text-secondary"
          type="number"
          value={lowQty}
          onChange={handleLowPriceChange}
          onBlur={validateLowPrice}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          min={minQty}
          max={maxQty}
          step="1"
        />
        <span className="text-sm text-gray-800">to</span>
        <input
          className="font-light text-sm text-center p-2 bg-transparent border-b border-secondary w-full placeholder-primary text-secondary"
          type="number"
          value={highQty}
          onChange={handleHighPriceChange}
          onBlur={validateHighPrice}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          min={minQty}
          max={maxQty}
          step="1"
        />
      </div>
    </FilterLayout>
  );
};

export default PriceFilter;
