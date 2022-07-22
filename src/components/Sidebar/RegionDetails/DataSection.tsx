import React from 'react';

import Collapsible from '@components/Collapsible';

import MetricDetails from '@components/MetricDetails';

import { useSelectedDistrict } from '@store/district/selectedContext';
import { useComparison } from '@store/comparisonContext';

import { MapPropsContentType, MapPropsSectionType } from '@customTypes/mapProps';

import { Tooltip } from '@mui/material';

import * as Styles from './styles';

const DataSection: React.FC<MapPropsSectionType> = ({ title, content }) => {
  const { selected } = useSelectedDistrict();
  const { comparison } = useComparison();

  const isSelectedOnComparison = comparison.some((region) => region.properties.CD_MUN === selected?.properties.CD_MUN);

  const hasSelectedDistrict = Boolean(selected);

  return (
    <Collapsible className="nesttt" isTitle={true} title={title}>
      {content.map((props: MapPropsContentType, id) => (
        <Styles.PropsWrapper key={id}>
          
          {!props.nestedData ? 
            (
              <>
                <Tooltip title={props.description} arrow>
                  <Styles.PropsTitle>{props.title}</Styles.PropsTitle>
                </Tooltip>
                {comparison.map((district) => (
                  <Styles.ValueContent key={district.properties.CD_MUN}>
                    <p>{district.properties.NM_MUN}</p>
                    <MetricDetails district={district} metric={props} />
                  </Styles.ValueContent>
                ))}

                {!isSelectedOnComparison && hasSelectedDistrict && (
                  <Styles.ValueContent>
                    <p>{selected?.properties.NM_MUN}</p>
                    <MetricDetails district={selected} metric={props} />
                  </Styles.ValueContent>
                )}
              </>
            ) : 
            (
              <>
                <Collapsible isTitle={false} title={props.title}>
                  {comparison && (
                    <>
                      {props.nestedData?.map((data, index) => (
                        <div key={index}>
                          <Tooltip title={data.description} arrow>
                            <Styles.PropsTitle>{data.title}</Styles.PropsTitle>
                          </Tooltip>
                          {comparison.map((district) => (
                            <div key={district.properties.CD_MUN}>
                              <Styles.ValueContent>
                                <p>{district.properties.NM_MUN}</p>
                                <MetricDetails district={district} metric={data} />
                              </Styles.ValueContent>
                            </div>
                          ))}
                          {!isSelectedOnComparison && hasSelectedDistrict && (
                            <div key={index}>
                              <Styles.ValueContent>
                                <p>{selected?.properties.NM_MUN}</p>
                                <MetricDetails district={selected} metric={data} />
                              </Styles.ValueContent>
                          </div>
                          )}
                        </div>
                      ))}
                    </>
                  )}

                  {!isSelectedOnComparison && !comparison.length && hasSelectedDistrict && (
                    <>
                      {props.nestedData.map((data, index) => (
                        <div key={index}>
                          <Tooltip title={data.description} arrow>
                            <Styles.PropsTitle>{data.title}</Styles.PropsTitle>
                          </Tooltip>
                          <Styles.ValueContent>
                            <p>{selected?.properties.NM_MUN}</p>
                            <MetricDetails district={selected} metric={data} />
                          </Styles.ValueContent>
                        </div>
                      ))}
                    </>
                  )}
                </Collapsible>
              </>
            )
          }

        </Styles.PropsWrapper>
      ))}
    </Collapsible>
  );
};

export default DataSection;
