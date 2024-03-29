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
  date: string;
  time: string;
  name: string;
  platform: string;
  sku: string;
  price: number;
  qty: number;
  lat: number;
  lng: number;
};

export type HeatMapData = {
  lat: number;
  lng: number;
  weight: number;
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
