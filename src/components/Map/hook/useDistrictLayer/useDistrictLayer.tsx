import React, { useEffect, useState } from 'react';

import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';

import { useHighlightedDistrict } from '@store/district/highlightedContext';
import { useSelectedDistrict } from '@store/district/selectedContext';
import { useSelectedState } from '@store/state/selectedContext';
import { useSidebar } from '@store/sidebarContext';

import { highlightDistrict, clickDistrict, cleanDistrictActions, fitDistrictBounds, addPopup } from './districtActions';

import { RSColors } from './const';
import { lineOpacity, lineWidth, fillOpacity } from '../../const';

import geojsonGO from '@data/states/RS_Municipios_2020.json';
import { fitStateBounds, handleCleanStateLayer } from '../useStateLayer/stateActions';
import { findState } from '@components/Map/actions';
import { CommentsDisabledOutlined } from '@mui/icons-material';

const useDistrictLayer = () => {
  const [districtReference, setDistrictReference] = useState<mapboxgl.Map>();
  const [latLng, setLatLng] = useState<mapboxgl.LngLat>();

  const { setHighlighted: setHighlightedDistrict, highlighted: highlightedDistrict } = useHighlightedDistrict();
  const { setSelected: setSelectedDistrict, selected: selectedDistrict } = useSelectedDistrict();

  const { selected: selectedState, setSelected: setSelectedState, all: allState } = useSelectedState();

  const { setIsSidebarOpen } = useSidebar();

  function initLayers(reference: mapboxgl.Map) {
    reference.on('load', () => {
      reference.dragRotate.disable();
      reference.touchZoomRotate.disableRotation();

      reference.addSource('district', {
        type: 'geojson',
        //@ts-ignore
        data: geojsonGO,
        //@ts-ignore
        promoteId: 'CD_MUN',
      });

      reference.addLayer({
        id: 'fill-district',
        type: 'fill',
        source: 'district',
        layout: {
          visibility: 'none',
        },
        paint: {
          'fill-color': {
            property: 'POPULATION',
            stops: RSColors,
          },
          //@ts-ignore
          'fill-opacity': fillOpacity,
        },
      });

      reference.addLayer({
        id: 'district-borders',
        type: 'line',
        source: 'district',
        layout: {
          visibility: 'none',
        },
        paint: {
          'line-color': '#ffffff',
          //@ts-ignore
          'line-width': lineWidth,
          //@ts-ignore
          'line-opacity': lineOpacity,
        },
      });
    });
  }

  function initActions(reference: mapboxgl.Map) {
    reference.on('click', 'fill-district', (e: mapboxgl.EventData) => {
      if (e.features.length > 0) {
        setSelectedDistrict(e.features[0]);
        setLatLng(e.lngLat);
      }
    });

    reference.on('mousemove', 'fill-district', (e: mapboxgl.EventData) => {
      if (e.features.length > 0) {
        setHighlightedDistrict(e.features[0]);
        setLatLng(e.lngLat);
      }
    });

    reference.on('mouseleave', 'fill-district', () => {
      setHighlightedDistrict(null);
    });
  }

  useEffect(() => {
    if (districtReference) {
      initLayers(districtReference);
      initActions(districtReference);
    }
  }, [districtReference]);

  useEffect(() => {
    if (districtReference) {
      highlightDistrict(highlightedDistrict, districtReference);
      if (highlightedDistrict) {
        if (latLng) {
          addPopup(highlightedDistrict, districtReference, latLng, 'Hover');
        } else {
          const coordinates = turf.centerOfMass(highlightedDistrict).geometry.coordinates;
          addPopup(highlightedDistrict, districtReference, [coordinates[0], coordinates[1]], 'Hover');
        }
        setLatLng(undefined);
      }
    }
  }, [highlightedDistrict]);

  useEffect(() => {
    if (districtReference) {
      clickDistrict(selectedDistrict, districtReference);

      if (selectedDistrict) {
        handleCleanStateLayer(districtReference);
        fitDistrictBounds(selectedDistrict, districtReference);
        setIsSidebarOpen(true);

        if (latLng) {
          addPopup(selectedDistrict, districtReference, latLng, 'Click');
        } else {
          const coordinates = turf.centerOfMass(selectedDistrict).geometry.coordinates;
          addPopup(selectedDistrict, districtReference, [coordinates[0], coordinates[1]], 'Click');
        }
        setLatLng(undefined);

        const state = findState(allState, selectedDistrict.properties.SIGLA_UF);
        if (!selectedState || selectedState !== state) {
          setSelectedState(state);
        }
      } else {
        cleanDistrictActions();
        fitStateBounds(selectedState, districtReference);
      }
    }
  }, [selectedDistrict]);

  return { districtReference, setDistrictReference };
};

export default useDistrictLayer;
