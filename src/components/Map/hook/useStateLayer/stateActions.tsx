import React from 'react';
import * as turf from '@turf/turf';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';

import { State } from '@customTypes/feature';

import { ClickablePopup } from '@components/Map/components';

import { clickedPopup, hoveredPopup } from '../../const';
import { isDistrictLayerVisible } from '../useDistrictLayer/districtActions';
import { MapActionType } from '@customTypes/mapProps';

let hoveredId: number | undefined;
let clickedId: number | undefined;

type Feature = State | null;

export function addPopup(feature: Feature, map: mapboxgl.Map, lngLat: mapboxgl.LngLat, type: MapActionType) {
  const regionName = feature?.properties?.NM_UF;
  const placeholder = document.createElement('div');

  if (regionName) {
    if (type === 'Click') {
      ReactDOM.render(<ClickablePopup regionName={regionName} reference={map} feature={feature} />, placeholder);
      clickedPopup.setLngLat(lngLat).setDOMContent(placeholder).addTo(map);
    } else if (type === 'Hover') {
      hoveredPopup.trackPointer().setHTML(`<h5>${regionName}</h5>`).addTo(map);
    }
  }
}

function setFeatureHover(featureID: number, map: mapboxgl.Map, state: boolean) {
  map.setFeatureState({ source: 'state', id: featureID }, { hover: state });
}

function setFeatureClick(featureID: number, map: mapboxgl.Map, state: boolean) {
  map.setFeatureState({ source: 'state', id: featureID }, { hover: state });
}

export function clickState(feature: Feature, map: mapboxgl.Map) {
  const stateID = feature?.properties?.CD_UF;

  if (feature && feature.geometry) {
    if (stateID === clickedId) {
      return;
    }

    if (clickedId) {
      setFeatureClick(clickedId, map, false);
    }

    if (stateID) {
      setFeatureClick(stateID, map, true);
      clickedId = stateID;
    }
  } else if (clickedId) {
    if (map.getSource('state')) {
      setFeatureClick(clickedId, map, false);
    }
    clickedId = undefined;
  }
}

export function highlightState(feature: Feature, map: mapboxgl.Map) {
  const stateID = feature?.properties?.CD_UF;

  if (feature && feature.geometry) {
    if (stateID === hoveredId) {
      return;
    }

    if (hoveredId) {
      setFeatureHover(hoveredId, map, false);
    }

    if (stateID) {
      setFeatureHover(stateID, map, true);
      hoveredId = stateID;
    }
  } else if (hoveredId) {
    hoveredPopup.remove();

    if (map.getSource('state')) {
      setFeatureHover(hoveredId, map, false);
    }
    hoveredId = undefined;
  }
}

export function isStateLayerVisible(map: mapboxgl.Map, visible: boolean) {
  const visibility = visible ? 'visible' : 'none';

  if (map.getLayer('fill-state')) {
    map.setLayoutProperty('fill-state', 'visibility', visibility);
  }

  if (map.getLayer('state-borders')) {
    map.setLayoutProperty('state-borders', 'visibility', visibility);
  }
}

export const handleCleanStateLayer = (map: mapboxgl.Map) => {
  isStateLayerVisible(map, false);
  isDistrictLayerVisible(map, true);
  cleanStateActions();
};

export function cleanStateActions() {
  hoveredPopup.remove();
  clickedPopup.remove();
  clickedId = 0;
  hoveredId = undefined;
}

export function fitStateBounds(feature: Feature, map: mapboxgl.Map) {
  if (feature && (feature.geometry || feature._geometry)) {
    const [minX, minY, maxX, maxY] = turf.bbox(feature);

    map.fitBounds(
      [
        [minX, minY],
        [maxX, maxY],
      ],
      {
        padding: { top: 100, bottom: 100, left: 200, right: 200 },
      },
    );
  }
}

export function fitStateCenter(feature: Feature, map: mapboxgl.Map) {
  if (feature && (feature.geometry || feature._geometry)) {
    const coordinates = turf.centerOfMass(feature).geometry.coordinates;

    map.flyTo({
      center: [coordinates[0], coordinates[1]],
    });
  }
}
