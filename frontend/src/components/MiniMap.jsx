import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import worldGeoJson from "../assets/countries.geo.json";

export default function MiniMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const geoJsonLayer = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const zoomControlRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    mapInstance.current = L.map(mapRef.current, {
      center: [0, 0],
      zoom: 1,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      worldCopyJump: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    }).addTo(mapInstance.current);

    geoJsonLayer.current = L.geoJSON(worldGeoJson, {
      style: () => ({
        fillColor: "lightblue",
        weight: 1,
        color: "white",
        fillOpacity: 0.7,
      }),
      onEachFeature: (feature, layer) => {
        layer.on("click", e => {
          if (geoJsonLayer.current) {
            geoJsonLayer.current.resetStyle();
          }
          e.target.setStyle({
            fillColor: "red",
            fillOpacity: 0.5,
          });
          console.log("e.target.feature.properties: ", e.target.feature.properties);
          setSelectedCountry(e.target.feature.properties);
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
  
      if (zoomControlRef.current) {
        mapInstance.current.removeControl(zoomControlRef.current);
      }
  
      zoomControlRef.current = L.control.zoom({ position: "topright" });
      zoomControlRef.current.addTo(mapInstance.current);
    } else {
      mapInstance.current.dragging.disable();
      mapInstance.current.scrollWheelZoom.disable();
  
      if (zoomControlRef.current) {
        mapInstance.current.removeControl(zoomControlRef.current);
        zoomControlRef.current = null;
      }
    }

    setTimeout(() => {
      mapInstance.current.invalidateSize(true);
    }, 300);

    mapInstance.current.setZoom(expanded ? 2 : 1);

    
  }, [expanded]);

  return (
    <div className="absolute bottom-4 right-4 
      flex flex-col items-end
      rounded-lg cursor-pointer">
      <div id="map-choice-container" className="relative w-full mb-2">
          <div
            onMouseEnter={() => !expanded && setExpanded(true)}
            onMouseLeave={() => expanded && setExpanded(false)}
            style={{
              width: expanded ? "50vw" : "150px",
              height: expanded ? "50vh" : "150px",
              zIndex: 1000,
              cursor: expanded ? "default" : "pointer",
              opacity: expanded ? 1 : 0.8,
              transition: "width 0.3s ease, height 0.3s ease, opacity 0.3s ease",
            }}
          >
          <div style={{width: "100%", height: "100%"}}>
            <div id="inactive-cover" className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
              style={{
              backgroundColor: expanded ? "transparent" : "rgba(255, 255, 255, 0.1)",
              pointerEvents: expanded ? "none" : "auto",
              transition: "background-color 0.3s ease",
              zIndex: 1
            }}>
              <span className="text-black"
                    style={{
                      opacity: expanded ? 0 : 1,
                      transition: "opacity 0.3s ease",
                    }}></span>
            </div>
            <div ref={mapRef} className="absolute w-full h-full z-0 rounded-lg" />
          </div>
        </div>  
      </div>
      <button className="btn btn-gradient btn-primary btn-lg min-w-[300px]
         transition-all duration-300 ease-in-out transform hover:scale-105">
        Guess {selectedCountry != null ? `: ${selectedCountry. name}` : ''}</button>
    </div>
  );
}
