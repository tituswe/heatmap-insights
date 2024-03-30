import axios from "axios";
import { AnalyzeResponse } from "../hooks/useAnalyzeMutation";
import { Filters } from "../hooks/useFilterContext";

export const postMeta = (data: string, fileType: string) => {
  const payload = {
    data,
    fileType,
  };

  return axios
    .post("http://localhost:18000/dev/meta", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
};

export const postAnalyze = (
  data: string,
  fileType: string,
  filters: Filters
) => {
  const payload = {
    data,
    fileType,
    filters,
  };

  return axios
    .post<AnalyzeResponse>("http://localhost:18000/dev/analyze", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
};
