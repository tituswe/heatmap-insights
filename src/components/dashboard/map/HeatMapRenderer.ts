import {
  Cluster,
  ClusterStats,
  Marker,
  Renderer,
} from "@googlemaps/markerclusterer";
import { scaleLinear } from "d3-scale";

class HeatMapRenderer implements Renderer {
  private map: google.maps.Map;

  constructor({ map }: { map: google.maps.Map }) {
    this.map = map;
  }

  public render(
    { count, position }: Cluster,
    stats: ClusterStats,
    map: google.maps.Map
  ): Marker {
    const amp = parseFloat(`${map.getZoom()}`) / 14;
    const ratio = (count * 0.75) / stats.clusters.markers.max;

    const circleDiv = document.createElement("div");
    circleDiv.className = "circle-div";
    circleDiv.style.width = sizeScale(ratio, amp);
    circleDiv.style.height = sizeScale(ratio, amp);
    circleDiv.style.backgroundColor = colorScale(ratio);
    // circleDiv.style.opacity = "0.75";
    circleDiv.style.opacity = opacityScale(ratio);
    circleDiv.style.borderRadius = "50%";
    circleDiv.style.display = "flex";
    circleDiv.style.justifyContent = "center";
    circleDiv.style.alignItems = "center";

    // const span = document.createElement("span");
    // span.textContent = `${count}`;
    // span.style.fontSize = textSizeScale(ratio, amp);
    // span.style.color = "white";

    // circleDiv.appendChild(span);

    return new google.maps.marker.AdvancedMarkerElement({
      map: this.map,
      position,
      content: circleDiv,
      zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
    });
  }
}

export default HeatMapRenderer;

const colorScale = scaleLinear<string>()
  .domain([0.05, 0.5])
  .range(["#3232fe", "#F6230C"]);

const opacityScale = scaleLinear<string>()
  .domain([0.05, 0.5])
  .range(["0.65", "0.8"]);

const sizeScale = (ratio: number, amp: number) => {
  const value = scaleLinear<string>()
    .domain([0.05, 0.5])
    .range(["24px", "96px"])(ratio);

  return parseFloat(value) * amp + "px";
};

// const textSizeScale = (ratio: number, amp: number) => {
//   const value = scaleLinear<string>()
//     .domain([0.05, 0.5])
//     .range(["6px", "24px"])(ratio);

//   return parseFloat(value) * amp + "px";
// };
