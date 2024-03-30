import { useMutation } from "react-query";
import { queryClient } from "../App";
import { postAnalyze } from "../api/api";
import useDashboardContext, { OrderData } from "./useDashboardContext";
import { Filters } from "./useFilterContext";

export type AnalyzeResponse = {
  statusCode: number;
  message: string;
  data: OrderData[];
};

export type AnalyzeMutationArg = {
  data: string;
  fileType: string;
  filters: Filters;
};

const useAnalyzeMutation = () => {
  const { setOrderData } = useDashboardContext();

  const mutation = useMutation<AnalyzeResponse, unknown, AnalyzeMutationArg>({
    mutationFn: ({ data, fileType, filters }) =>
      postAnalyze(data, fileType, filters),
    onSuccess: (response: AnalyzeResponse) => {
      setOrderData(response.data);
      queryClient.invalidateQueries({ queryKey: ["analyze"] });
    },
  });

  return mutation;
};

export default useAnalyzeMutation;
