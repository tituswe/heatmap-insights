import { useMutation } from "react-query";
import { queryClient } from "../App";
import { postMeta } from "../api/api";
import useDashboardContext, { MetaData } from "./useDashboardContext";

export type MetaResponse = {
  statusCode: number;
  message: string;
  data: MetaData;
};

type MetaMutationArg = {
  data: string;
  fileType: string;
};

const useMetaMutation = () => {
  const { setMetaData } = useDashboardContext();

  const mutation = useMutation<MetaResponse, unknown, MetaMutationArg>({
    mutationFn: ({ data, fileType }) => postMeta(data, fileType),
    onSuccess: (response: MetaResponse) => {
      setMetaData(response.data);
      queryClient.invalidateQueries({ queryKey: ["meta"] });
    },
  });

  return mutation;
};

export default useMetaMutation;
