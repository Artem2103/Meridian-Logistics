// components/Map.js
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN; // store your key in .env.local

export default function Map({ nodes, routes }) {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [0, 20], // starting coordinates
      zoom: 2
    });

    // Add markers for nodes
    nodes.forEach((node) => {
      new mapboxgl.Marker()
        .setLngLat([node.longitude, node.latitude])
        .setPopup(new mapboxgl.Popup().setText(node.name))
        .addTo(map);
    });

    // Add routes as lines
    map.on("load", () => {
      map.addSource("routes", {
        type: "geojson",
        data: routes
      });
      map.addLayer({
        id: "route-lines",
        type: "line",
        source: "routes",
        paint: {
          "line-color": "#FF0000",
          "line-width": 2
        }
      });
    });

    return () => map.remove(); // cleanup on unmount
  }, [nodes, routes]);

  return <div ref={mapContainer} style={{ width: "100%", height: "600px" }} />;
}