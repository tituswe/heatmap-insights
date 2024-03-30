import { useState } from "react";

import {
  DashboardContext,
  MetaData,
  OrderData,
  defaultMetaData,
  defaultOrderData,
} from "../../hooks/useDashboardContext";

type DashboardProviderProps = {
  children: React.ReactNode;
};

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [metaData, setMetaData] = useState<MetaData>(defaultMetaData);
  const [orderData, setOrderData] = useState<OrderData[]>(defaultOrderData);

  return (
    <DashboardContext.Provider
      value={{
        isAnalyzing,
        setIsAnalyzing,
        metaData,
        setMetaData,
        orderData,
        setOrderData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
