import LZString from "lz-string";
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
  const [metaData, setMetaData] = useState<MetaData>(() => {
    const saved = sessionStorage.getItem("metaData");
    return saved ? JSON.parse(saved) : defaultMetaData;
  });
  const [orderData, setOrderData] = useState<OrderData[]>(() => {
    const compressedOrderData = sessionStorage.getItem("orderData");
    const saved =
      compressedOrderData && LZString.decompressFromUTF16(compressedOrderData);
    return saved ? JSON.parse(saved) : defaultOrderData;
  });

  return (
    <DashboardContext.Provider
      value={{
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
