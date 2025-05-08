import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import worldGeoJson from "../assets/countries.geo.json";

import { useConfig } from '../util/ConfigContext';

export default function MiniMap({ subject, currentIdx, setCurrentIdx }) {
  const {serverUrl} = useConfig();
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const geoJsonLayer = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const zoomControlRef = useRef(null);

  const [ countryCount, setCountryCount ] = useState(0);
  const [ selectedCountries, setSelectedCountries ] = useState([]);
  const selectedCountriesRef = useRef([]);

  const defaultStyle = {
    fillColor: "lightblue",
    weight: 1,
    color: "white",
    fillOpacity: 0.7
  }

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
      style: () => (defaultStyle),
      onEachFeature: (feature, layer) => {
        layer.on("click", e => {
          const country = e.target.feature.properties;
          const alreadySelected = selectedCountriesRef.current.some(c => c.id === country.id);
          if (alreadySelected) {
            const newSelection = selectedCountriesRef.current.filter(c => c.id !== country.id);
            setSelectedCountries(newSelection);
            e.target.setStyle(defaultStyle);
          } else {
            if (selectedCountriesRef.current.length >= countryCount) return;
            setSelectedCountries([...selectedCountriesRef.current, country]);
            e.target.setStyle({
              fillColor: "red",
              fillOpacity: 0.5,
            });
          }
        });
      }
      
    }).addTo(mapInstance.current);

    return () => {
      mapInstance.current.remove();
    };
  }, [countryCount]);

  useEffect(() => {
    selectedCountriesRef.current = selectedCountries;
    console.log("selectedCountries", selectedCountries)
  }, [selectedCountries])

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

  // fetching the number of correct answers
  useEffect(() => {
    if (!serverUrl || !subject) return;

    fetch(`${serverUrl}/subjects/country-count?id=${subject.id}`, {
      method: 'GET', 
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      setCountryCount(data)
    })
    .catch(err => {
        console.error('Error fetching levels: ', err)
    });
    
  }, [serverUrl, subject]);

  const guessClick = () => {
    setCurrentIdx(currentIdx+1)
  }

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
      <button onClick={guessClick} className="btn btn-gradient btn-primary btn-lg min-w-[300px]
         transition-all duration-300 ease-in-out transform hover:scale-105">
        Guess{selectedCountries.length > 0
          ? `: ${selectedCountries.map(c => c.name).join(", ")}`
          : countryCount > 0
            ? ` ${countryCount} ${countryCount === 1 ? 'country' : 'countries'}`
            : ''}
      </button>
    </div>
  );
}
