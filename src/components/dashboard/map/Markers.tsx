import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import React, { useEffect, useRef } from "react";
import useDashboardContext from "../../../hooks/useDashboardContext";
import HeatMapRenderer from "./HeatMapRenderer";

type Point = google.maps.LatLngLiteral & { key: string };

type MarkersProps = {
  points: Point[];
};

const Markers: React.FC<MarkersProps> = ({ points }) => {
  const { setIsAnalyzing } = useDashboardContext();
  console.log(points);
  const map = useMap();
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({
        map,
        renderer: new HeatMapRenderer({ map }),
      });
    }
  }, [map]);

  useEffect(() => {
    if (!map || !clusterer.current || !google.maps.marker) return;

    clusterer.current.clearMarkers();

    const pointDiv = document.createElement("div");

    const newMarkers = points.reduce((acc, point) => {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: point,
        content: pointDiv,
        map,
      });
      acc[point.key] = marker;
      return acc;
    }, {} as { [key: string]: Marker });

    clusterer.current.addMarkers(Object.values(newMarkers));

    if (points.length > 0) {
      setIsAnalyzing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, map, google.maps.marker]);

  return (
    <>
      {points.map((point) => (
        <AdvancedMarker position={point} key={point.key}>
          <div className="h-[12px] w-[12px] bg-blue-800/60 rounded-full" />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default Markers;
