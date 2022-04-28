import { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import useMap from "@hook/useMap";

import geojsonURL from "@data/BR_UF_2020.json";

import { useHighlightedDistrict } from "@store/district/highlightedContext";
import { useSelectedDistrict } from "@store/district/selectedContext";
import { useHighlightedState } from "@store/state/highlightedContext";
import { useSelectedState } from "@store/state/selectedContext";
import { useSidebar } from "@store/sidebarContext";

import { fitBounds, fitCenter } from "./actions";
import { highlightMun, clickMun } from "./munActions";
import { highlightState, clickState } from "./stateActions";
import { lineOpacity, lineWidth, fillOpacity, accessToken } from "../const";

import "../styles.css";

const Map = () => {
  mapboxgl.accessToken = accessToken;

  const { resetMapValues } = useMap();
  const mapContainer = useRef<any>();

  const [map, setMap] = useState<mapboxgl.Map>();
  const { setIsSidebarOpen } = useSidebar();

  const {
    setHighlighted: setHighlightedDistrict,
    highlighted: highlightedDistrict,
  } = useHighlightedDistrict();
  const { setSelected: setSelectedDistrict, selected: selectedDistrict } =
    useSelectedDistrict();

  const { setHighlighted: setHighlightedState, highlighted: highlightedState } =
    useHighlightedState();
  const { setSelected: setSelectedState, selected: selectedState } =
    useSelectedState();

  useEffect(() => {
    const initializeMap = ({ mapContainer }: any) => {
      let center: mapboxgl.LngLatLike = [-58, -15];

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v10",
        center: center,
        zoom: 3.4,
      });

      map.on("load", () => {
        map.dragRotate.disable();
        map.touchZoomRotate.disableRotation();

        map.addSource("state", {
          type: "geojson",
          //@ts-ignore
          data: geojsonURL,
          //@ts-ignore
          promoteId: "CD_UF",
        });

        map.addLayer({
          id: "fill-state",
          type: "fill",
          source: "state",
          layout: {
            visibility: "visible",
          },
          paint: {
            "fill-color": "#6CC24A",
            //@ts-ignore
            "fill-opacity": fillOpacity,
          },
        });

        map.addLayer({
          id: "state-borders",
          type: "line",
          source: "state",
          layout: {
            visibility: "visible",
          },
          paint: {
            "line-color": "#ffffff",
            //@ts-ignore
            "line-width": lineWidth,
            //@ts-ignore
            "line-opacity": lineOpacity,
          },
        });
      });

      // State level

      map.on("click", "fill-state", (e: any) => {
        if (e.features.length > 0) {
          setSelectedState(e.features[0]);
        }
      });

      map.on("mousemove", "fill-state", (e: any) => {
        if (e.features.length > 0) {
          setHighlightedState(e.features[0]);
        }
      });

      map.on("mouseleave", "fill-state", () => {
        setHighlightedState(null);
      });

      // City level

      map.on("click", "fill-mun", (e: any) => {
        if (e.features.length > 0) {
          setSelectedDistrict(e.features[0]);
          setIsSidebarOpen(true);
        }
      });

      map.on("click", (e) => {
        const bbox = [
          [e.point.x - 5, e.point.y - 5],
          [e.point.x + 5, e.point.y + 5],
        ];

        if (map.getLayer("fill-mun")) {
          //@ts-ignore
          const clickedMun = map.queryRenderedFeatures(bbox, {
            layers: ["fill-mun"],
          });

          if (clickedMun.length === 0) {
            resetMapValues();
          }
        }
      });

      map.on("mousemove", "fill-mun", (e: any) => {
        if (e.features.length > 0) {
          setHighlightedDistrict(e.features[0]);
        }
      });

      map.on("mouseleave", "fill-mun", () => {
        setHighlightedDistrict(null);
      });

      setMap(map);
    };

    if (!map) initializeMap({ mapContainer });
  }, [map]);

  // State level

  useEffect(() => {
    if (map) {
      highlightState(highlightedState, map);
    }
  }, [highlightedState, map]);

  useEffect(() => {
    if (map) {
      if (selectedState !== null) {
        clickState(selectedState, map);
        fitBounds(selectedState, map);
      } else if (selectedState === null) {
        clickState(selectedState, map);
        fitCenter(map);
      }
    }
  }, [selectedState, map]);

  // City level

  useEffect(() => {
    if (map && map.getSource("mun")) {
      if (highlightedDistrict !== null) {
        highlightMun(highlightedDistrict, map);
      } else if (highlightedDistrict === null) {
        highlightMun(null, map);
      }
    }
  }, [highlightedDistrict, map]);

  useEffect(() => {
    if (map) {
      if (selectedDistrict !== null) {
        if (selectedState === null) {
          setSelectedState({
            properties: { SIGLA_UF: selectedDistrict.properties.SIGLA_UF },
          });
        }
        clickMun(selectedDistrict, map);
        fitBounds(selectedDistrict, map);
      } else if (selectedDistrict === null && map.getSource("mun")) {
        clickMun(null, map);
        fitBounds(selectedState, map);
      }
    }
  }, [map, selectedState, selectedDistrict]);

  return (
    <div id="map" ref={(el) => (mapContainer.current = el)} className="map" />
  );
};

export default Map;
