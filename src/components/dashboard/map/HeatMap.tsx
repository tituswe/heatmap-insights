import { APIProvider, Map } from "@vis.gl/react-google-maps";
import useDashboardContext from "../../../hooks/useDashboardContext";
import HeatMapLoader from "./HeatMapLoader";
import Markers from "./Markers";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

const center = {
  lat: 1.3701 - 0.01,
  lng: 103.8248 - 0.08,
};

const HeatMap = () => {
  const { isAnalyzing, orderData } = useDashboardContext();
  console.log(isAnalyzing);

  return (
    <div className="relative w-full h-full">
      <APIProvider apiKey={API_KEY}>
        <Map
          mapId={"739af084373f96fe"}
          mapTypeId={"roadmap"}
          defaultCenter={center}
          defaultZoom={12}
          gestureHandling={"greedy"}
          disableDefaultUI
        >
          <Markers points={orderData} />
        </Map>
      </APIProvider>
      {isAnalyzing && <HeatMapLoader />}
    </div>
  );
};

export default HeatMap;
