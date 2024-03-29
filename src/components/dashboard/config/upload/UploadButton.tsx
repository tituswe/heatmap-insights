import React, { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import useAnalyzeMutation from "../../../../hooks/useAnalyzeMutation";
import useDashboardContext from "../../../../hooks/useDashboardContext";
import UploadLoader from "./UploadLoader";

const FileUploadButton: React.FC = () => {
  const { setMetaData, setOrderData } = useDashboardContext();
  const { mutate, isLoading } = useAnalyzeMutation(setMetaData, setOrderData);
  const [data, setData] = useState<string | null>(null); // Data is now a string
  const [fileType, setFileType] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(",")[1];
        setData(base64String);
      };
      reader.readAsDataURL(files[0]);

      const fileType = files[0].type;
      setFileType(fileType);
    }
  };

  const handleConfirm = async () => {
    if (!data || !fileType) {
      return;
    }

    try {
      await mutate({ data, fileType });
    } catch (error) {
      // Handle error
      console.error(error);
    } finally {
      setFileType(null);
      setData(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleCancel = () => {
    setFileType(null);
    setData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="relative px-8 pt-8 h-full text-lg  z-30">
      <label
        htmlFor="file-upload"
        className="cursor-pointer text-secondary/50 transition hover:text-secondary"
      >
        {isLoading ? <UploadLoader /> : <FaUpload />}
      </label>
      <input
        ref={fileInputRef}
        className="text-gray-800/25 transition duration-500 hover:text-secondary"
        id="file-upload"
        type="file"
        accept=".csv, .xlsx"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <div
        className={`absolute top-0 left-28 h-[100px]  bg-white flex flex-col justify-center items-center rounded-2xl gap-3 shadow-md transition duration-300 ease-in-out ${
          data ? "opacity-100 w-[240px]" : "opacity-0 w-[0px]"
        }`}
      >
        {data && (
          <>
            <p className="text-xs text-secondary/50">
              Do you want to upload this file?
            </p>
            <div className="flex gap-4">
              <button
                className="rounded-full py-2 px-4 font-semibold text-sm text-white bg-tertiary hover:bg-tertiary/25 transition duration-500"
                onClick={handleConfirm}
              >
                Confirm
              </button>
              <button
                className="rounded-full py-2 px-4 font-semibold text-sm text-tertiary bg-white hover:bg-tertiary/75 hover:text-white transition duration-500"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUploadButton;
