import React from 'react';
import mapboxgl from 'mapbox-gl';

import { State } from '@customTypes/feature';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { formatPopulationNumber } from '@utils/formatValue';

import { fitStateBounds, handleCleanStateLayer } from '../../hook/useStateLayer/stateActions';
import * as Styles from './styles';
interface Props {
  regionName: string;
  reference: mapboxgl.Map;
  feature: State;
}

export default function ClickablePopup({ regionName, reference, feature }: Props) {
  return (
    <Styles.Popup>
      <Styles.ClickableSection
        onClick={() => {
          handleCleanStateLayer(reference);
          fitStateBounds(feature, reference);
        }}
      >
        <Styles.PopupText>{regionName}</Styles.PopupText>
        <Styles.IconWrapper className="iconAction">
          <ChevronRightIcon fontSize="small" />
        </Styles.IconWrapper>
      </Styles.ClickableSection>

      <Styles.PopupContent>
        <Styles.PopupText>População: {formatPopulationNumber(feature.properties?.POPULATION)}</Styles.PopupText>
      </Styles.PopupContent>
    </Styles.Popup>
  );
}
