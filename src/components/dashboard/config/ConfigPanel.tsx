import React, { useRef, useState } from "react";
import { FaFile, FaFilter, FaMapPin } from "react-icons/fa6";
import useAnalyzeMutation from "../../../hooks/useAnalyzeMutation";
import useDashboardContext from "../../../hooks/useDashboardContext";
import useDateRange from "../../../hooks/useDateRange";
import useFilterContext from "../../../hooks/useFilterContext";
import ConfigLoader from "./ConfigLoader";
import ConfigSectionHeader from "./ConfigSectionHeader";
import PlatformFilter from "./filter/PlatformFilter";
import PriceFilter from "./filter/PriceFilter";
import ProductFilter from "./filter/ProductFilter";
import QuantityFilter from "./filter/QuantityFilter";
import SKUFilter from "./filter/SKUFilter";
import FileUploadButton from "./upload/FileUploadButton";

const ConfigPanel: React.FC = () => {
  const { mutate, isLoading } = useAnalyzeMutation();
  const { metaData, setOrderData, setIsAnalyzing } = useDashboardContext();
  const {
    selectedPlatforms,
    selectedProducts,
    selectedSku,
    lowPrice,
    highPrice,
    lowQty,
    highQty,
  } = useFilterContext();
  const { startDate, endDate } = useDateRange(true);
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onAnalyze = async () => {
    if (!file) {
      return;
    }

    const reader = new FileReader();

    const data = await new Promise<string>((resolve, reject) => {
      reader.onload = () => {
        const base64String = (reader.result as string).split(",")[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const fileType = file.type;

    const filters = {
      selectedPlatforms,
      selectedProducts,
      selectedSku,
      lowPrice,
      highPrice,
      lowQty,
      highQty,
    };

    try {
      setOrderData([]);
      setIsAnalyzing(true);
      await mutate({ data, fileType, filters });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      key={JSON.stringify(metaData)}
      className="absolute z-20 w-[550px] flex flex-col justify-center items-center p-8"
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
            subTitle={
              file
                ? `Staged: ${file.name}`
                : "Upload files in .csv, .xlsx format only"
            }
          />
          <FileUploadButton file={file} setFile={setFile} ref={fileRef} />
        </div>
        {/* FILTERS */}
        <div className="flex flex-col gap-2">
          <ConfigSectionHeader icon={FaFilter} title="Filters" />
          <div
            className={`flex flex-col gap-6 pb-8 ${
              selectedPlatforms.length && "border-b"
            }`}
          >
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
        {/* SUBMIT */}
        {selectedPlatforms.length > 0 && (
          <div className="flex justify-center w-full p-8">
            <button
              className="flex justify-center items-center bg-tertiary w-3/4 px-8 py-4 rounded-full transition duration-500 hover:bg-tertiary/25"
              onClick={onAnalyze}
            >
              {isLoading ? (
                <ConfigLoader />
              ) : (
                <span className="font-semibold text-white">Analyze</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigPanel;
