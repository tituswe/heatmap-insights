import { createContext, useContext } from "react";

export type MetaData = {
  platformOptions: string[];
  productOptions: string[];
  minPrice: number;
  maxPrice: number;
  minQty: number;
  maxQty: number;
  skuOptions: string[];
};

export type OrderData = {
  lat: number;
  lng: number;
  weight: number;
  key: string;
};

export const defaultMetaData: MetaData = {
  platformOptions: [],
  productOptions: [],
  minPrice: 0,
  maxPrice: 0,
  minQty: 0,
  maxQty: 0,
  skuOptions: [],
};

export const defaultOrderData: OrderData[] = [];

type DashboardContextType = {
  isAnalyzing: boolean;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  metaData: MetaData;
  setMetaData: (metaData: MetaData) => void;
  orderData: OrderData[];
  setOrderData: (orderData: OrderData[]) => void;
};

export const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardContextProvider"
    );
  }
  return context;
};

export default useDashboardContext;
