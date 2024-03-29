import { HeatmapLayerF } from "@react-google-maps/api";
import useHeatMapData from "../../../hooks/useHeatMapData";

const heatMapOptions = {
  gradient: [
    "rgba(0, 255, 255, 0)",
    "rgba(0, 255, 255, 1)",
    "rgba(0, 191, 255, 1)",
    "rgba(0, 127, 255, 1)",
    "rgba(0, 63, 255, 1)",
    "rgba(0, 0, 255, 1)",
    "rgba(0, 0, 223, 1)",
    "rgba(0, 0, 191, 1)",
    "rgba(0, 0, 159, 1)",
    "rgba(0, 0, 127, 1)",
    "rgba(63, 0, 91, 1)",
    "rgba(127, 0, 63, 1)",
    "rgba(191, 0, 31, 1)",
    "rgba(255, 0, 0, 1)",
  ],
  radius: 20,
  opacity: 0.6,
};

const HeatLayer = () => {
  const heatMapData = useHeatMapData();

  return (
    <div>
      <HeatmapLayerF
        key={JSON.stringify(heatMapData)}
        data={heatMapData.map(({ lat, lng, weight }) => ({
          location: new google.maps.LatLng(lat, lng),
          weight,
        }))}
        options={heatMapOptions}
      />
    </div>
  );
};

export default HeatLayer;
