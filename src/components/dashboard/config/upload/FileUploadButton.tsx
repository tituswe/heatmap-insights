import React, { useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import useMetaMutation from "../../../../hooks/useMetaMutation";
import ConfigLoader from "../ConfigLoader";

type FileUploadButtonProps = {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

const FileUploadButton = React.forwardRef<
  HTMLInputElement,
  FileUploadButtonProps
>(({ file, setFile }, ref) => {
  const { mutate, isLoading, isError } = useMetaMutation();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files) {
      return;
    }

    setFile(files[0]);

    const reader = new FileReader();

    const data = await new Promise<string>((resolve, reject) => {
      reader.onload = () => {
        const base64String = (reader.result as string).split(",")[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(files[0]);
    });

    const fileType = files[0].type;

    try {
      await mutate({ data, fileType });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isError) {
      setFile(null);

      const fileRef = ref as React.MutableRefObject<HTMLInputElement>;
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  }, [isError, setFile, ref]);

  return (
    <div className="relative px-8 pt-8 h-full text-lg  z-30">
      <label
        htmlFor="file-upload"
        className={`cursor-pointer transition hover:text-secondary ${
          file ? "text-primary" : "text-secondary/50"
        }`}
      >
        {isLoading ? <ConfigLoader /> : <FaUpload />}
      </label>
      <input
        ref={ref}
        className="text-gray-800/25 transition duration-500 hover:text-secondary"
        id="file-upload"
        type="file"
        accept=".csv, .xlsx"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
});

export default FileUploadButton;
