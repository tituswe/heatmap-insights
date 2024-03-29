import LZString from "lz-string";
import { useMutation } from "react-query";
import { queryClient } from "../App";
import { postAnalyze } from "../api/api";
import { MetaData, OrderData } from "./useDashboardContext";

export type AnalyzeResponse = {
  statusCode: number;
  message: string;
  data: {
    metaData: MetaData;
    orderData: OrderData[];
  };
};

type AnalyzeMutationArg = {
  data: string;
  fileType: string;
};

const useAnalyzeMutation = (
  setMetaData: (data: MetaData) => void,
  setOrderData: (data: OrderData[]) => void
) => {
  const mutation = useMutation<AnalyzeResponse, unknown, AnalyzeMutationArg>({
    mutationFn: ({ data, fileType }) => postAnalyze(data, fileType),
    onSuccess: (response: AnalyzeResponse) => {
      setMetaData(response.data.metaData);
      setOrderData(response.data.orderData);
      sessionStorage.setItem(
        "metaData",
        JSON.stringify(response.data.metaData)
      );
      sessionStorage.setItem(
        "orderData",
        LZString.compressToUTF16(JSON.stringify(response.data.orderData))
      );
      queryClient.invalidateQueries({ queryKey: ["analyze"] });
    },
  });

  return mutation;
};

export default useAnalyzeMutation;
