import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import worldGeoJson from "./assets/countries.geo.json";

export default function MiniMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const geoJsonLayer = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (!mapRef.current) return;

    mapInstance.current = L.map(mapRef.current, {
      center: [20, 0],
      zoom: 1,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      worldCopyJump: true,
    });

    L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      {
        noWrap: true,
      }
    ).addTo(mapInstance.current);

    geoJsonLayer.current = L.geoJSON(worldGeoJson, {
      style: feature => ({
        fillColor: selectedCountry === feature.properties.ADMIN ? "red" : "lightblue",
        weight: 1,
        color: "white",
        fillOpacity: 0.7,
      }),
      onEachFeature: (feature, layer) => {
        layer.on("click", () => {
          setSelectedCountry(feature.properties.ADMIN);
          console.log(feature.properties.ADMIN);
        });
      },
    }).addTo(mapInstance.current);

    return () => {
      mapInstance.current.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;

    if (expanded) {
      mapInstance.current.dragging.enable();
      mapInstance.current.scrollWheelZoom.enable();
    } else {
      mapInstance.current.dragging.disable();
      mapInstance.current.scrollWheelZoom.disable();
    }

    setTimeout(() => {
      mapInstance.current.invalidateSize();
    }, 100);

    mapInstance.current.setZoom(expanded ? 2 : 1);
  }, [expanded]);

  useEffect(() => {
    if (!geoJsonLayer.current) return;

    geoJsonLayer.current.setStyle(feature => ({
      fillColor: selectedCountry === feature.properties.ADMIN ? "red" : "lightblue",
      weight: 1,
      color: "white",
      fillOpacity: 0.7,
    }));
  }, [selectedCountry]);

  return (
    <div
      onClick={() => !expanded && setExpanded(true)}
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        width: expanded ? "50vw" : "150px",
        height: expanded ? "50vh" : "150px",
        zIndex: 1000,
        border: expanded ? "2px solid orange" : "1px solid black",
        cursor: expanded ? "default" : "pointer",
      }}
    >
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
