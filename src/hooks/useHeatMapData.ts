import { groupBy } from "lodash";
import useDashboardContext, { HeatMapData } from "./useDashboardContext";
import useFilterContext from "./useFilterContext";

const useHeatMapData = () => {
  const { orderData } = useDashboardContext();
  const {
    selectedPlatforms,
    selectedProducts,
    selectedSku,
    lowPrice,
    highPrice,
    lowQty,
    highQty,
  } = useFilterContext();

  const filteredData = orderData.filter(
    (order) =>
      selectedPlatforms.includes(order.platform) &&
      selectedProducts.includes(order.name) &&
      selectedSku.includes(order.sku) &&
      order.price >= parseFloat(lowPrice) &&
      order.price <= parseFloat(highPrice) &&
      order.qty >= parseInt(lowQty) &&
      order.qty <= parseInt(highQty)
  );

  return Object.entries(groupBy(filteredData, (d) => `${d.lat},${d.lng}`)).map(
    ([k, v]) =>
      v.reduce(
        (a) => ({
          ...a,
          weight: a.weight + 1,
        }),
        {
          lat: parseFloat(k.split(",")[0]),
          lng: parseFloat(k.split(",")[1]),
          weight: 0,
        }
      )
  ) as HeatMapData[];
};

export default useHeatMapData;
