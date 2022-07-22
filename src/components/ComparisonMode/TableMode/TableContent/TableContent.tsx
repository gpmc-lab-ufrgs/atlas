import React from 'react';

import Collapsible from '@components/Collapsible';

import MetricDetails from '@components/MetricDetails';

import { MapPropsContentType, MapPropsSectionType } from '@customTypes/mapProps';

import { Feature } from '@customTypes/feature';

import * as Styles from './styles';

interface Props {
  section: MapPropsSectionType;
  comparison: Array<Feature>;
}

const TableContent: React.FC<Props> = ({ section, comparison }) => {
  return (
    <Collapsible isTitle={true} title={section.title}>
      {section.content.map((content: MapPropsContentType, id) => (
        <>
          {!content.nestedData ? 
            (
              <Styles.Table lineTableNumber={id} key={id}>
                <Styles.ColumnTitle>{content.description}</Styles.ColumnTitle>
                {comparison.map((region, idx) => (
                  <Styles.Column gridColumnNumber={idx + 2} key={idx}>
                    <MetricDetails district={region} metric={content} />
                  </Styles.Column>
                ))}
              </Styles.Table>
            ) : 
            (
              <Collapsible isTitle={false} title={content.title}>
                {content.nestedData?.map((data, index) => (
                  <div key={index}>
                    <Styles.Table lineTableNumber={index} key={index}>
                      <Styles.ColumnTitle>{data.description}</Styles.ColumnTitle>
                      {comparison.map((region, idx) => (
                        <Styles.Column gridColumnNumber={idx + 2} key={idx}>
                          <MetricDetails district={region} metric={data} />
                        </Styles.Column>
                      ))}
                    </Styles.Table>
                  </div>
                ))}
              </Collapsible>
            )
          }
        </>
      ))}
    </Collapsible>
  );
};

export default TableContent;
