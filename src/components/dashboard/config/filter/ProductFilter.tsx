import React, { useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import useClickOutside from "../../../../hooks/useClickOutside";
import useFilterContext from "../../../../hooks/useFilterContext";
import FilterLayout from "./FilterLayout";

type ProductFilterProps = {
  productOptions: string[];
};

const PlatformFilter: React.FC<ProductFilterProps> = ({ productOptions }) => {
  const { selectedProducts, setSelectedProducts } = useFilterContext();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSelect = (product: string) => {
    if (selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== product));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <FilterLayout title="Product">
      <div className="relative" ref={ref}>
        <div
          className="flex items-center border border-secondary rounded-lg cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <input
            ref={inputRef}
            type="text"
            value={selectedProducts.join(", ")}
            placeholder={"Select Products"}
            className={`font-light p-4 bg-transparent w-full ${
              !isOpen && "cursor-pointer"
            } placeholder-gray-500 text-secondary `}
            onClick={(e) => isOpen && e.stopPropagation()}
            onChange={() => {}}
          />
          {isOpen && <FaChevronUp className="h-3 w-3 m-4 text-gray-500" />}
          {!isOpen && <FaChevronDown className="h-3 w-3 m-4 text-gray-500" />}
        </div>
        {isOpen && (
          <div className="absolute z-20 flex flex-col w-full mt-2 bg-primary/75 rounded-lg shadow-lg overflow-auto gap-1 max-h-[356px]">
            {productOptions.map((option) => (
              <div
                key={option}
                onClick={() => {
                  onSelect(option);
                  if (inputRef.current) {
                    inputRef.current.blur();
                  }
                }}
                className={`p-4 hover:bg-gray-200 cursor-pointer transition  ${
                  selectedProducts.includes(option) && "bg-primary"
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </FilterLayout>
  );
};

export default PlatformFilter;
