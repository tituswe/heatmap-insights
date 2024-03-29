import React from "react";
import { FaFile, FaFilter, FaMapPin } from "react-icons/fa6";
import useDashboardContext from "../../../hooks/useDashboardContext";
import useDateRange from "../../../hooks/useDateRange";
import ConfigSectionHeader from "./ConfigSectionHeader";
import PlatformFilter from "./filter/PlatformFilter";
import PriceFilter from "./filter/PriceFilter";
import ProductFilter from "./filter/ProductFilter";
import QuantityFilter from "./filter/QuantityFilter";
import SKUFilter from "./filter/SKUFilter";
import UploadButton from "./upload/UploadButton";

const ConfigPanel: React.FC = () => {
  const { metaData } = useDashboardContext();
  const { startDate, endDate } = useDateRange(true);

  return (
    <div
      key={JSON.stringify(metaData)}
      className="absolute z-10 w-[550px] flex flex-col justify-center items-center p-8"
    >
      <div className="h-[96px]" />
      <div className="flex flex-col h-full w-full bg-white rounded-2xl shadow-md">
        {/* HEADER */}
        <div className="border-b">
          <ConfigSectionHeader
            icon={FaMapPin}
            title="Order Density for Singapore"
            subTitle={`Showing orders from ${startDate} to ${endDate}`}
          />
        </div>
        {/* UPLOAD */}
        <div className="flex flex-row w-full justify-between border-b">
          <ConfigSectionHeader
            icon={FaFile}
            title="Data Upload"
            subTitle="Upload files in .csv, .xlsx format only"
          />
          <UploadButton />
        </div>
        {/* FILTERS */}
        <div className="flex flex-col gap-2">
          <ConfigSectionHeader icon={FaFilter} title="Filters" />
          <div className="flex flex-col gap-6 pb-8">
            <PlatformFilter platformOptions={metaData.platformOptions} />
            <ProductFilter productOptions={metaData.productOptions} />
            <SKUFilter skuOptions={metaData.skuOptions} />
            <PriceFilter
              minPrice={metaData.minPrice}
              maxPrice={metaData.maxPrice}
            />
            <QuantityFilter minQty={metaData.minQty} maxQty={metaData.maxQty} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;
