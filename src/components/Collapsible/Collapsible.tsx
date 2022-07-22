import React, { useState } from 'react';

import Collapsible from 'react-collapsible';

import { CollapsibleType, CollapsibleNames } from './type';

import './styles.css';
import * as Styles from './styles';

const CollapsibleDefaultValue = {
  'Locations to Compare': true,
  'Demographic Summary': true,
  'Economic Summary': false,
  'Growth Summary': false,
  'Residential Housing Summary': false,
  'Financial Transactions': false,
  'Business Counts': false,
  'Turnover vs. Cost of Sales': false,
  'Business Rental Costs': false,
};

const CollapsibleSection = ({ children, title, isTitle}: any) => {
  const [collapsible, setCollapsible] = useState<CollapsibleType>(CollapsibleDefaultValue);

  const onOpen = (key: any) => updateIsOpen(key, true);
  const onClose = (key: any) => updateIsOpen(key, false);

  const isOpen = (key: CollapsibleNames) => {
    const value = collapsible && collapsible[key];
    return value ?? true;
  };

  const updateIsOpen = (key: any, value: any) => {
    const newValue = { ...collapsible, [key]: value };
    setCollapsible(newValue);
  };

  return (
    <Styles.CollapsibleContainer isTitle={isTitle}>
      <Collapsible
        trigger={title}
        open={isOpen(title)}
        onOpening={() => onOpen(title)}
        onClosing={() => onClose(title)}
        lazyRender={true}
        className={`${isTitle}`}
      >
        {children}
      </Collapsible>
    </Styles.CollapsibleContainer>
  );
};

export default CollapsibleSection;
