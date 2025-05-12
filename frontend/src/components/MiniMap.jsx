import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import worldGeoJson from "../assets/countries.geo.json";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import JSConfetti from 'js-confetti'

import { useConfig } from '../util/ConfigContext';

export default function MiniMap({ subject, currentIdx, setCurrentIdx, level }) {
  const {serverUrl} = useConfig();
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const geoJsonLayer = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const zoomControlRef = useRef(null);
  const guessBtnAnimCtrl = useAnimation();
  const navigate = useNavigate();

  const [ countryCount, setCountryCount ] = useState(0);
  const [ selectedCountries, setSelectedCountries ] = useState([]);
  const selectedCountriesRef = useRef([]);
  const [ guessBtnTxt, setGuessBtnTxt] = useState("");
  const [ guessResult, setGuessResult ] = useState({})
  const [ isScoringMode, setIsScoringMode ] = useState(false);
  const [ mapLines, setMapLines ]= useState([])
  
  const jsConfettiRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const defaultStyle = {
    fillColor: "lightblue",
    weight: 1,
    color: "white",
    fillOpacity: 0.7
  }

  useEffect(() => {
    if (!jsConfettiRef.current) {
      jsConfettiRef.current = new JSConfetti();
    }
  }, []);
  useEffect(() => {
    // guess-result-container
    console.log("showConfetti", showConfetti)
    console.log("jsConfettiRef.current", jsConfettiRef.current)
    if (showConfetti && jsConfettiRef.current) {
      jsConfettiRef.current.addConfetti();
    }
  }, [showConfetti])

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

    // handle click
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

    // initialize guess button text
    setGuessBtnTxt(guessBtnTextUnanswered())

    return () => {
      mapInstance.current.remove();
    };
  }, [countryCount]);

  useEffect(() => {
    selectedCountriesRef.current = selectedCountries;    
    setGuessBtnTxt(guessBtnTextUnanswered())
  }, [selectedCountries])

  // for dealing with expansion (vore moment) of minimap
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

    
  }, [expanded, isScoringMode]);

  // fetching the number of correct answers
  useEffect(() => {
    if (!serverUrl || !subject || !subject.id) return;

    fetch(`${serverUrl}/subjects/country-count?id=${subject.id}`, {
      method: 'GET', 
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      setCountryCount(data)
    })
    .catch(err => {
        console.error('Error fetching country count: ', err)
    });
    console.log("subject", subject)
  }, [serverUrl, subject]);

  // guess results update
  useEffect(() => {
    if (!guessResult || !Array.isArray(guessResult.correct_countries)) return;
    setIsScoringMode(true)
    setExpanded(true)
    console.log("correct", guessResult.isCorrect)
    // bullshit fix - true yung previous, tapos correct yung current
    // i-switch muna sa false then balik sa true
    if (guessResult.isCorrect) {
      setShowConfetti(false);
      requestAnimationFrame(() => {
        setShowConfetti(true);
      });
    } else {
      setShowConfetti(false);
    }

  
    const selectedIds = selectedCountries.map(c => c.id);
    const correctCountriesIds = guessResult.correct_countries.map(c => c.id);

    // fill correct countries GREEN if correct YELLOW if not
    for (const countryId of correctCountriesIds) {
      const isCorrect = selectedIds.includes(countryId);
      const fillColor = isCorrect ? 'green' : 'yellow';
  
      geoJsonLayer.current.eachLayer(layer => {
        const props = layer.feature?.properties;
        if (props?.id === countryId) {
          layer.setStyle({
            fillColor,
            fillOpacity: 0.5,
            weight: 3,
            color: 'green',
            lineJoin: 'round',
            zIndex: 99
          });
        }
      });
    }
  
    // Draw lines from incorrect selected countries to correct countries
    for (const selected of selectedCountries) {
      if (!correctCountriesIds.includes(selected.id)) {
        const selectedLayer = getLayerById(selected.id);
        for (const correctId of correctCountriesIds) {
          const correctLayer = getLayerById(correctId);
          if (selectedLayer && correctLayer) {
            const selectedCenter = selectedLayer.getBounds().getCenter();
            const correctCenter = correctLayer.getBounds().getCenter();
            const line = L.polyline([selectedCenter, correctCenter], {
              color: 'red',
              weight: 2,
            });
    
            // Add line to the map
            line.addTo(geoJsonLayer.current);
    
            // Update the mapLines state with the new line
            setMapLines(prevLines => [...prevLines, line]);
          }
        }
      }
    }
  
    function getLayerById(id) {
      let found = null;
      geoJsonLayer.current.eachLayer(layer => {
        if (layer.feature?.properties?.id === id) {
          found = layer;
        }
      });
      return found;
    }
  }, [guessResult]);
  // Function to remove all added lines using state
  const removeLines = () => {
    mapLines.forEach(line => {
      geoJsonLayer.current.removeLayer(line);
    });
    setMapLines([]); // Clear the mapLines state
  };

  // ALL THESE SHIT HAPPENS WHEN YOU PRESS THE GUESS BUTTON
  const guessClick = () => {
    if (!serverUrl || !subject) return;
    const errorAnimGuessBtn = () => {    
      guessBtnAnimCtrl.start({
        rotate: [0, 25, -25, 15, -15, 0],
        boxShadow: [
          "0 0 0px red",
          "0 0 5px red",
          "0 0 5px red",
          "0 0 0px red"
        ],
        scale: [1, 1.1, 1],
        transition: { duration: 0.5 },
      });
    }

    // GUESS VALIDATION missing or incomplete guess
    if ( selectedCountries.length !== countryCount ) {
      errorAnimGuessBtn()
      return;
    }

    const payload = {
      country_ids: selectedCountries.map(c => c.id),
      subject_id: subject.id
    }
    fetch(`${serverUrl}/guess`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      setGuessResult(data)
    })
    .catch(err => {
        console.error('Error fetching guess result: ', err)
    });    
    // setCurrentIdx(currentIdx+1)if (!geoJsonLayer.current) return;    
  }

  
  // Handle dynamic text in Guess button
  const guessBtnTextUnanswered = () => {
    // set dynamic spelling for country based on plurality
    const countrySpell = (count) => count > 1 ? "countries" : "country";
    let btnText = "Guess";
    if (selectedCountries.length > 0) {
      if (selectedCountries.length !== countryCount) {
        const remaining = countryCount - selectedCountries.length; 
        btnText += ` ${remaining} more ${countrySpell(remaining)}`
      }
      btnText += `: ${selectedCountries.map(c => c.name).join(", ")}`;
    } else {
      btnText += ` ${countryCount} ${countrySpell(countryCount)}`
    }
    return btnText;
  }

  // NEXT BUTTON
  const nextBtnClick = () => {
    if (!isScoringMode) return;
    const nextIdx = currentIdx + 1;
    setIsScoringMode(false);
    setExpanded(false);
    setSelectedCountries([]);
    geoJsonLayer.current.eachLayer(layer => {
      layer.setStyle(defaultStyle);
    });
    removeLines();
    setCurrentIdx(nextIdx);
    setGuessBtnTxt(guessBtnTextUnanswered());
  
    if (nextIdx === level?.length) {
      navigate('/levels');
    }
  }
  


  return (
    <div className="absolute w-full h-full p-4 bottom-0 overflow-hidden
      flex flex-col items-end justify-end
      rounded-lg">
        <div className={`${isScoringMode ? 'w-full h-full pt-16' : ''} flex flex-col justify-end`}>
          
          <div id="map-choice-container" className="relative h-full mb-2">
              <div
                onMouseEnter={() => !isScoringMode && !expanded && setExpanded(true)}
                onMouseLeave={() => !isScoringMode && expanded && setExpanded(false)}
                style={{
                  width: isScoringMode ? "100%" : expanded ? "50vw" : "150px",
                  height: isScoringMode ? "100%" : expanded ? "50vh" : "150px",
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
          <div id="the-buttons" className="flex flex-col gap-2">
            {!isScoringMode && (
              <motion.button onClick={guessClick} animate={guessBtnAnimCtrl} className="btn btn-gradient btn-primary btn-lg min-w-[300px]
                transition-all duration-300 ease-in-out transform hover:scale-105">
                {guessBtnTxt}
              </motion.button>
            )}
            {isScoringMode && (
              <div className="absolute bottom-0 left-0 w-full px-12 mb-28 flex gap-2">
                <div className="alert alert-primary flex items-start gap-4 bg-violet-700" id='guess-result-container'>
                  <span className="text-7xl">{
                    guessResult?.isCorrect ? ['🥳', '😻', '🤩', '😎', '🤓'][Math.floor(Math.random() * 5)] 
                      : ['😿', '🤡', '💩', '🥀', '😞'][Math.floor(Math.random() * 5)]
                  }</span>
                  <div className="w-full flex flex-col justify-between gap-1">
                    <h5 className="font-semibold font-guessr text-yellow-300 text-3xl">Score: {guessResult?.score}</h5>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold">Your answer: {selectedCountries?.map(sc => sc.name).join(', ')}</span>
                      <span className="text-lg font-bold">Correct answer: {guessResult?.correct_countries.map(sc => sc.name).join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <AnimatePresence>
            {isScoringMode && (
                <motion.button onClick={nextBtnClick} className="mt-2 btn btn-lg min-w-[300px]
              transition-all duration-300 ease-in-out transform hover:scale-105"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  { currentIdx + 1 !== level.length ? "Next" : "Back to Main Menu" }
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
    </div>
  );
}
