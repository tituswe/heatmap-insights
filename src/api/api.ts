import axios from "axios";
import { AnalyzeResponse } from "../hooks/useAnalyzeMutation";

export const postAnalyze = (data: string, fileType: string) => {
  // Construct the payload as an object including the base64 encoded data and the fileType
  const payload = {
    data: data, // This is the base64 encoded file data
    fileType: fileType,
  };

  return axios
    .post<AnalyzeResponse>("http://localhost:18000/dev/analyze", payload, {
      headers: {
        "Content-Type": "application/json", // Update to application/json since we're sending JSON payload
      },
    })
    .then((response) => response.data);
};
